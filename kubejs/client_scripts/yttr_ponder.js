Ponder.tags((event) => {
    event.createTag("hint:yttr", "yttr:yttrium_ingot", "Yttr", "HiNT provided ponder scenes for Yttr.", [
        "yttr:glowing_gas",
    ]);
});
// trying to make ponders for some of the yttr stuff, cant figure out how to animate the piston though haha
Ponder.registry((event) => {
    event.create("yttr:glowing_gas").scene("glowdamp", "Creating glowdamp", (scene, util) => {
				scene.world.setBlock([2, 1, 2], "minecraft:shroomlight", true);
				scene.world.setBlock([3, 1, 2], "yttr:yttrium_block", false);
				scene.world.setBlock([1, 1, 2], "yttr:yttrium_block", false);
				scene.world.setBlock([4, 1, 2], Block.id("minecraft:sticky_piston").with("facing", "west"), false);
				scene.showBasePlate();

				scene.idle(10);
				scene.world.showSection([4, 1, 2], Facing.DOWN);
				scene.idle(3);
				scene.world.showSection([3,1,2], Facing.DOWN);
				scene.idle(6);
				scene.world.showSection([1,1,2], Facing.DOWN);
				
				scene.idle(10);
				
				scene.world.showSection([2,1,2], Facing.DOWN);
				scene.idle(5);
				scene.text(70, "Glowdamp gas can be created by crushing a Shroomlight between two blocks of Yttrium with a piston.", [2.5, 1.5, 2.5]).placeNearTarget().attachKeyFrame();
				
				scene.idle(30);
				scene.world.modifyBlock([4,1,2], () => Block.id("minecraft:sticky_piston").with( "facing", "west").with("extended", "true"), false);
				scene.world.makeSectionIndependent(util.select.fromTo(3,1,2,2,1,2));
				scene.world.setBlock([3,1,2], Block.id("minecraft:piston_head").with("facing", "west"), false);
				scene.world.setBlock([2,1,2], "yttr:yttrium_block", false);
        })
	event.create("yttr:glowing_gas").scene("glowdamp_uses", "Uses for glowdamp", (scene, util) => {
			scene.world.setBlock([2,1,2], "yttr:can_filler", false);
			scene.showBasePlate();
			scene.idle(10);
			scene.world.showSection([2,1,2], Facing.DOWN);
			scene.idle(5);
			scene.text(70, "Glowdamp is needed to fill ammo canisters for rifles.", [2.5,1.5,2.5]).placeNearTarget().attachKeyFrame();
			scene.idle(80);
			scene.world.hideSection([2,1,2], Facing.UP);
			scene.idle(30);
			scene.world.setBlock([2,1,2], "yttr:lamp", false);
			scene.world.showSection([2,1,2], Facing.DOWN);
			scene.idle(5);
			scene.text(70, "It can also be used to make lamps.", [2.5,1.5,2.5]).placeNearTarget().attachKeyFrame();
			scene.idle(80);
			scene.world.hideSection([2,1,2], Facing.UP);
			scene.idle(5);
			scene.text(70, "It also can be thrown like a splash potion to briefly inflict Glowing and Slowness.", [2.5,1.5,2.5]).placeNearTarget().attachKeyFrame();
		})
});