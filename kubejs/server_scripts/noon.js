ServerEvents.loaded(event => {
    // Set the time to noon the first time the game is loaded.
    if (!event.server.persistentData.contains('firstload')) {
        event.server.persistentData.putBoolean('firstload', true)
        event.server.runCommandSilent('time set noon')
    }
})