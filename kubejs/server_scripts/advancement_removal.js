/**
 * Removes advancement at given file-path and adds it to a hidden parent advancement
 * @param {String | Array} advancementFilePath - Where the advancement file is located. Can easily be found through /advancement command or GitHub
 */
function removeAdvancement(advancementFilePath) {
    let arr = []
    if (typeof (advancementFilePath) == 'string') arr = [advancementFilePath]
    else if (typeof (advancementFilePath) == 'object') arr = advancementFilePath
    else console.log(`Invalid type for removeAdvancement(${advancementFilePath})`)

    ServerEvents.highPriorityData(event => {
        event.addJson('yourmodpack:advancements/removed', {
            display: { hidden: true },
        })
        arr.forEach(advancement => {
            event.addJson(`${advancement}.json`, {
                parent: 'yourmodpack:advancements/removed',
                display: { hidden: true },
                criteria: {
                    impossible: {
                        trigger: 'minecraft:impossible'
                    }
                },
                requirements: [['impossible']]
            })
        })
    })
}

removeAdvancement([
    'haema:advancements/use_blood',
    'haema:advancements/drink_blood',
    'haema:advancements/drink_good_blood',
    'haema:advancements/drink_player_blood',
    'haema:advancements/fail_conversion',
    'haema:advancements/get_blood',
    'haema:advancements/kill_vampire_hunter',
    'haema:advancements/root',
    'haema:advancements/store_blood',
    'haema:advancements/trigger_vampire_hunters',
	'haema:advancements/use_invis',
	'haema:advancements/use_dash',
	'haema:advancements/use_mist',
	'haema:advancements/use_ritual_table',
	'haema:advancements/fulfil_contract',
	'haema:advancements/create_ritual_table',
	'haema:advancements/get_contract',
	'hexcasting:advancements/grant_patchi_book',
])