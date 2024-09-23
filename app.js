import { options as n, h, render } from 'https://unpkg.com/preact@latest?module'
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'
import { html } from 'https://unpkg.com/htm/preact/index.module.js?module'

const clientId = '2d789520a6304a59ad74c43a0fa07e45'
const clientSecret = 'grupx1AhF3A8Xusk0W4Sd5VED1OBLlJt'
const authUrl = 'https://us.battle.net/oauth/token'

let token, API, characterName

const adalid = {
    explorer: 558,
    adventurer: 571,
    veteran: 584,
    champion: 597,
    hero: 610,
    myth: 623,
    deity: 636
}

const emHeroTalent = {
    "San'layn": '🧛🏻‍♂️',
    'Deathbringer': '🧟‍♂️',
    'Rider of the Apocalypse': '🏇🏻',
    'Aldrachi Reaver': '👾',
    'Fel-Scarred': '🧬',
    'Druid of the Claw': '🐈‍⬛',
    "Elune's Chosen": '🌙',
    'Keeper of the Grove': '🪶',
    'Wildstalker': '🪸', 
    'Chronowarden': '⏳',
    'Flameshaper': '♨️',
    'Scalecommander': '🥏',
    'Pack Leader': '🦍',
    'Dark Ranger': '🐦‍⬛',
    'Sentinel': '🕊️',
    'Spellslinger': '🪡',
    'Frostfire': '☄️',
    'Sunfury': '🐦‍🔥',
    'Shado-Pan': '☯️',
    'Conduit of the Celestials': '🦩',
    'Master of Harmony': '🪷',
    'Herald of the Sun': '☀️',
    'Templar': '👨🏼‍⚖️',
    'Lightsmith': '⚜️',
    'Oracle': '👁️',
    'Voidweaver': '🌀',
    'Archon': '🪽',
    'Trickster': '🗡️',
    'Deathstalker': '🦹🏼‍♂️',
    'Fatebound': '🪙',
    'Totemic': '🪵',
    'Farseer': '🧞‍♂️',
    'Stormbringer': '🌩️',
    'Hellcaller': '🐐',
    'Diabolist': '🧿',
    'Soul Harvester': '🫀',
    'Colossus': '🗽',
    'Slayer': '🦸🏼‍♂️',
    'Mountain Thane': '🔋'
}

const emSpec = {
    augmentation: '🪖',
    blood: '🩸',
    frost: {
        deathknight: '❄️',
        mage: '🧊'
    },
    unholy: '🩻',
    havoc: '🦇',
    vengeance: '🔱',
    devastation: '❤️‍🔥',
    preservation: '🌻',
    balance: '🦉',
    feral: '🐈',
    guardian: '🧸',
    restoration: {
        druid: '🌳',
        shaman: '💧'
    },
    beasts: '🐾',
    marksmanship: '🎯',
    survival: '🕸️',
    arcane: '🔮',
    fire: '🔥',
    brewmaster: '🐂',
    mistweaver: '🐉',
    windwalker: '🐅',
    holy: {
        paladin: '🌟',
        priest: '🧚🏽‍♂️'
    },
    protection: {
        paladin: '🚨',
        warrior: '🛡️'
    },
    retribution: '⚖️',
    discipline: '📖',
    shadow: '👤',
    assassination: '🥷🏽',
    outlaw: '🏴‍☠️',
    subtlety: '🪤',
    enhancement: '🌋',
    elemental: '⚡',
    affliction: '🦠',
    demonology: '👹',
    destruction: '💥',
    arms: '🤺',
    fury: '💢',
    undefined: '❌'
}
const emClass = {
    deathknight: '☠️',
    demonhunter: '😈',
    evoker: '🪁',
    druid: '🦁',    
    hunter: '🏹',
    mage: '🧙🏽‍♂️',
    monk: '⛩️',
    paladin: '👑',
    priest: '⛪',
    rogue: '🍴',
    shaman: '🕯️',
    warlock: '🪬',
    warrior: '⚔️'
}
const emRace = {
    bloodelf: '🧝🏼‍♂️',
    darkirondwarf: '👴🏿',
    draenei: '🐙',
    dracthyr: {
        Alliance: '🦎',
        Horde: '🐊',
        Neutral: '🐛'
    },
    dwarf: '👨🏽‍🦰',
    earthen: {
        Alliance: '💎',
        Horde: '🗿',
        Neutral: '🪨'
    },
    gnome: '👶🏽',
    goblin: '👺',
    highmountaintauren: '🫎',
    human: '🧔🏽‍♂️',
    kultiran: '⚓',
    lightforgeddraenei: '🛸',
    magharorc: '🐵',
    mechagnome: '🤖',
    nightborne: '🌚',
    nightelf: '👽',
    orc: '🧌',
    pandaren: {
        Alliance: '🐻‍❄️',
        Horde: '🐼',
        Neutral: '🐨'
    },
    tauren: '🐮',
    troll: '🐭',
    undead: '⚰️',
    voidelf: '🕳️',
    vulpera: '🦊',
    worgen: '🐺',
    zandalaritroll: '🦖'
}
const emFaction = {
    Alliance: '🔵',
    Horde: '🔴',
    Neutral: '🟢'
}
const examplePlayer = [{
    npc: true,
    name: 'Urel Stoneheart',
    faction: {
        name: 'Neutral'
    },
    character__class: {
        name: 'Paladin'
    },
    title: 'the King of the Earthen',
    race: {
        name: 'Earthen'
    },
    level: 80,
    active_spec: {
        name: 'Holy'
    },
    active_hero_talent_tree: {
        name: 'Herald of the Sun'
    },
    average_item_level: 630
},{
    npc: true,
    name: 'Neltharion',
    faction: {
        name: 'Neutral'
    },
    character_class: {
        name: 'Evoker'
    },
    title: 'the Worldbreaker',
    race: {
        name: 'Dracthyr'
    },
    level: 70,
    active_spec: {
        name: 'Devastation'
    },
    active_hero_talent_tree: {
        name: 'Scalecommander'
    },
    average_item_level: 312
},{
    npc: true,
    name: 'Illidan',
    faction: {
        name: 'Alliance'
    },
    character_class: {
        name: 'Demon Hunter'
    },
    title: 'the Betrayer',
    race: {
        name: 'Night Elf'
    },
    level: 60,
    active_spec: {
        name: 'Havoc'
    },
    active_hero_talent_tree: {
        name: 'Fel-Scarred'
    },
    average_item_level: 289
},{
    npc: true,
    name: 'Arthas',
    faction: {
        name: 'Alliance'
    },
    character_class: {
        name: 'Death Knight'
    },
    title: 'the Lick King',
    race: {
        name: 'Human'
    },
    level: 50,
    active_spec: {
        name: 'Frost'
    },
    active_hero_talent_tree: {
        name: 'Deathbringer'
    },
    average_item_level: 185
},{
    npc: true,
    name: 'Tyrion',
    faction: {
        name: 'Alliance'
    },
    character_class: {
        name: 'Paladin'
    },
    title: 'the Ashbringer',
    race: {
        name: 'Human'
    },
    level: 40,
    active_spec: {
        name: 'Retribution'
    },
    active_hero_talent_tree: {
        name: 'Templar'
    },
    average_item_level: 150
},{
    npc: true,
    name: 'Thrall',
    faction: {
        name: 'Horde'
    },
    character_class: {
        name: 'Shaman'
    },
    title: 'the Earthbinder',
    race: {
        name: 'Orc'
    },
    level: 30,
    active_spec: {
        name: 'Enhancement'
    },
    active_hero_talent_tree: {
        name: 'Stormbringer'
    },
    average_item_level: 140
},{
    npc: true,
    name: 'Chen',
    faction: {
        name: 'Neutral'
    },
    character_class: {
        name: 'Monk'
    },
    title: 'the Wandering Brewmaster',
    race: {
        name: 'Pandaren'
    },
    level: 20,
    active_spec: {
        name: 'Brewmaster'
    },
    active_hero_talent_tree: {
        name: 'Master of Harmony'
    },
    average_item_level: 65
}]
const emNumbers = {
    0: '0️⃣',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣'
}

function initAuth() {
    axios.post(
        authUrl,
        new URLSearchParams({
            'grant_type': 'client_credentials'
        }),
        {
            auth: {
                username: clientId,
                password: clientSecret
            }
        })
        .then(res => {
            console.log(res)
            token = res.data.access_token
            API = `https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}?namespace=profile-us&locale=en_US&access_token=${token}`
        })
}

const characterUrl = 'https://us.api.blizzard.com/profile/wow/character/'
const characterRealm = 'quelthalas'
const characterSpecs = 'specializations'
const urlParams = '?namespace=profile-us&locale=en_US&access_token='

initAuth()

function whoIs(str) {
    let s = str.toLowerCase()
    if (examplePlayer.some(e => e.name.toLowerCase() === s)) {
        return '🎮'
    }
    if (s.startsWith('lak')) {
        return '👨🏻‍💻'
    } else if (s.startsWith('elnil')||s.startsWith('nil')){
        return '😏'
    } else if (s.startsWith('beta')||s.startsWith('bata')){
        return '👳🏽‍♂️'
    } else if (s.includes('tat')||s.includes('kun')){
        return '👮🏻‍♂️'
    } else if (s.startsWith('ronin')||s.endsWith('ronin')){
        return '🦦'
    } else if (s.startsWith('axi')||s.includes('tara')){
        return '🍋'
    } else if (s.includes('yiz')||s.endsWith('mann')){
        return '🙏🏻'
    } else if (s.includes('tacon')){
        return '🎅🏻'
    } else { return '' }
}
function rarity(lv) {
    if(lv<adalid.explorer) return 'poor'
    else if(lv<adalid.adventurer) return 'common'
    else if(lv<adalid.veteran) return 'uncommon'
    else if(lv<adalid.champion) return 'rare'
    else if(lv<adalid.hero) return 'epic'
    else if(lv<adalid.myth) return 'legendary'
    else if(lv<adalid.deity) return 'artifact'
    else return 'heirloom'
}

const addTheme = () => document.querySelector('html').getAttribute('data-theme') == 'light' ? 'light' : 'dark'

function App() {

    const [player, setPlayer] = useState([examplePlayer[Math.floor(Math.random() * 7)]])
    const [search, setSearch] = useState('')
    const [table, setTable] = useState('')
    const ARTESANOS = ['Lakhae', 'Kunfucion', 'Betacura', 'Ripyizuman, 'Onironin']

    async function fetchCharacter(name, realm) {
        fetch(characterUrl+realm+'/'+name+urlParams+token)
        .then(res => res.json())
        .then(data => {
            if (data.hasOwnProperty('code')) {
                alert(`${search.charAt(0).toUpperCase()+search.slice(1)} not found`);
                return
            }
                else if (data.level > 70) {
                    console.log('fetching Hero Talents')
                    fetchHeroTalent(name, realm)
                        .then(hero => {
                            console.log(hero)
                            if (hero.hasOwnProperty('active_hero_talent_tree')) {
                                const newData = {...data, active_hero_talent_tree: hero.active_hero_talent_tree.name};
                                setPlayer(current => [...current, newData])
                                console.log(player)
                            }
                        }
                              )
                }
                            else { setPlayer(current => [...current, data]) }
                        }
              )
                    }

    async function fetchHeroTalent(name, realm) {
        console.log(characterUrl+realm+'/'+name+'/'+characterSpecs+urlParams+token);
return fetch(characterUrl+realm+'/'+name+'/'+characterSpecs+urlParams+token)
        .then(res => res.json())
}

    const handleInput = (e) => {setSearch(e.target.value.toLowerCase());console.log(search)}
    const handleSubmit = () => {
        console.log('handleSubmit called');
        if (player[0]) { if (player[0].npc) player.shift()}
        if (!player.some(e => e.name.toLowerCase() === search)) {
            console.log('Fetching character:', search);
        fetchCharacter(search, characterRealm) }
    }

    const generateArtesanos = () => ARTESANOS.map(e => {
        if (player[0]) { if (player[0].npc) player.shift()}
        if (!player.some(e => e.name.toLowerCase() === search)) {
            fetchCharacter(e.toLowerCase(), characterRealm)
        // fetch(characterUrl+characterRealm+'/'+e.toLowerCase()+urlParams+token)
        // .then(res => res.json())
        // .then(data => data.hasOwnProperty('code') ? console.log(`${e.charAt(0).toUpperCase()+e.toLowerCase().slice(1)} not found`) : setPlayer(current => [...current, data]))
    }})

    return html`
        <Fragment >
            <header >
                <nav className='container'>
                    <ul>
                        <li>
                            <h2>WoWsapp</h2>
                        </li>
                    </ul>
                    <ul>
                        <li><a href='whatsapp://send?text=${window.encodeURIComponent(table)}' role="button">Share</a></li>
                    </ul>
                </nav>
            </header>
            <main className='container' >
            <form>
            <div className='grid'>
                <label for "region">Region
                    <select name="region">
                        <option value="us">US</option>
                    </select>
                </label>

                </div>
            </form>
            <input placeholder="Search your character" onInput=${handleInput}></input>
            <button type='submit' role='button' onClick=${handleSubmit}>🔍</button>
            <button class="secondary" role='button' onClick=${generateArtesanos}>Generate Artesanos</button>
                <table role="grid">
                    <thead >
                        <tr >
                            <th scope="col">Name</th>
                            <th scope="col">Race</th>
                            <th scope="col">Class</th>
                            <th scope="col">Level</th>
                        </tr>
                    </thead>
                    <tbody >
                        ${player.map(e => html`<tr scope="row" data-theme=${addTheme()} className=${e.character_class.name.replace(/\s/g, '').toLowerCase()}>
                            <td data-theme=${addTheme()} className=${e.character_class.name.replace(/\s/g, '').toLowerCase()}>${e.name}</td>
                            <td data-theme=${addTheme()} className=${e.character_class.name.replace(/\s/g, '').toLowerCase()}>${e.race.name}</td>
                            <td data-theme=${addTheme()} className=${e.character_class.name.replace(/\s/g, '').toLowerCase()}>${e.active_spec?.name ? e.active_spec?.name+' '+e.character_class.name : e.character_class.name}</td>
                            <td data-theme=${addTheme()} style="white-space: pre-wrap" className=${rarity(e.average_item_level)}><small>${e.level}\t</small><strong>${e.average_item_level}</strong></td>
                        </tr>`)}
                    </tbody>
                </table>

                <article id="theTable" class="container" style="white-space: pre-wrap; text-align: center; width: 50vw">
                        ${player.sort((a, b) => b.average_item_level-a.average_item_level).map((e, i) => 
                        (i < 1 ? '' : '\n')+
                        whoIs(e.name)+
                        (typeof emRace[e.race.name.replace(/\s|\'/g, '').toLowerCase()] === 'object'
                        ? emRace[e.race.name.replace(/\s|\'/g, '').toLowerCase()][e.faction.name]
                        : emRace[e.race.name.replace(/\s|\'/g, '').toLowerCase()])+
                        emClass[e.character_class.name.replace(/\s/g, '').toLowerCase()]+
                        (typeof emSpec[e.active_spec?.name.toLowerCase()] === 'object'
                        ? emSpec[e.active_spec.name.toLowerCase()][e.character_class.name.replace(/\s/g, '').toLowerCase()]
                        : emSpec[e.active_spec?.name.toLowerCase()])+
                            (e.active_hero_talent_tree && emHeroTalent[e.active_hero_talent_tree?.name])+
                        (e.level >= 80 
                            ? Array.from(String(e.average_item_level).padStart(3, 0), Number).map(e => emNumbers[e]).join().replaceAll(',','')
                            : Array.from(String(e.level).padStart(3, 0), Number).map(e => emNumbers[e]).join().replaceAll(',',''))
                        )}
                        ${useEffect(() => setTable(document.querySelector('#theTable').innerText), player)}
                </article>
                </main>
                <footer>
                Christopher Selva - 2022
                </footer>
            </Fragment>`;
}

render(html`<${App} />`, document.body);
