// Make player spawn underground, probably.
const worldHeight = -30;

const worldDiameter = 25000;

const generateRandomNumber = () => {

	const maximum = Math.floor(worldDiameter/2)-1;

	let random = Math.floor(Math.random()*maximum)+1;

	if(Math.round(Math.random())) {

		random = random*-1;	

	}

	return random;

};

PlayerEvents.loggedIn(event => {
	
	const playerData = event.player.persistentData;

    if(playerData.oldPlayer) return undefined;
	
	if (playerData.oldPlayer === undefined) {
		event.player.paint({
			background_rect: {
				type: 'rectangle',
				x: 0,
				y: 0,
				w: '($screenW)',
				h: '($screenH)',
				color: '#1c1c1e',
				draw: 'ingame'
			},
			text: {
				type: 'text',
				text:'Please wait while we find a suitable spawn point.',
				scale: 1.0,
				x: 0,
				y: 0,
				alignX: 'center',
				alignY: 'center',
				draw: 'ingame'
			}
		})
	}

	const dimension = event.server.getLevel('minecraft:overworld');

	let x = 0;

	let y = 0;

	let z = 0;

	//Find random spawn location

	const locateRandom = () => {

		x = generateRandomNumber();

		y = worldHeight;

		z = generateRandomNumber();

		console.log([x,y,z]);

		const block = dimension.getBlock(x, y, z);

		if(block.getId() !== 'minecraft:air') {

			locateRandom();

		}

	};

	locateRandom();

	console.log(`Found random air location at ${x} ${y} ${z}`);


	let landing = false;

	const locateLanding = () => {

		y -= 1; //Decrease y-level by one block.

		const block = dimension.getBlock(x, y, z);

		if(block.getId() !== 'minecraft:air' && block.getId() !== 'minecraft:cave_air') {

			if(block.getId() === 'minecraft:water' || block.getId() === 'minecraft:lava') {

				//Lands on liquid, reroll.

				locateRandom();

			} else {

				//Lands on solid block, check if safe.

				let safe = [];

				// Check two blocks above landing location

				for(let i = 1; i < 3; i++) { 

					let aboveBlock = dimension.getBlock(x, y+i, z);

					if(aboveBlock.getId() === 'minecraft:air' || aboveBlock.getId() === 'minecraft:cave_air') {

						safe.push(1); //Random number to fill array

					}

				}

				if(safe.length > 1) landing = true;

			}

		}

		if(!landing) locateLanding();

	};

	locateLanding();

	console.log(`Found safe landing location at ${x} ${y} ${z}`);
	event.player.tell('Spawnpoint found!')

	playerData.oldPlayer = true;

	event.player.teleportTo('minecraft:overworld', x, y+1, z, 0, 0);
	event.player.paint({'*': {remove:true}})
	if ((!event.player.persistentData.contains('spawnset')) && (playerData.oldPlayer = true)) {
		// event.server.scheduleInTicks(1, (_) => {
			event.player.persistentData.putBoolean('spawnset', true)
			event.server.runCommand('execute at @p run spawnpoint @p')
			event.server.runCommandSilent('haema convert @p')
		//})
    }

});