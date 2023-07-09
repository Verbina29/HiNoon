PlayerEvents.loggedIn(event => {
    // Give the player starter items on first join
    if (!event.player.persistentData.contains('firstjoin')) {
        event.player.persistentData.putBoolean('firstjoin', true)
        event.player.give(Item.of('akashictomeoftools:akashic_tome', '{AkashicItems:[{Count:1b,id:"haema:book_of_blood"},{Count:1b,id:"bewitchment:book_of_shadows"},{Count:1b,id:"malum:encyclopedia_arcana"},{Count:1b,id:"ftbquests:book"},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"hexcasting:thehexbook"}},{Count:1b,id:"botania:lexicon"}],SelectedPos:-1}'))
		event.player.give('minecraft:iron_pickaxe')
		event.player.give('minecraft:iron_shovel')
		event.player.give('minecraft:iron_axe')
		// event.server.runCommandSilent('haema convert @p')
    }
})
