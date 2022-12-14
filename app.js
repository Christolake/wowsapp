import { options as n, h, render } from 'https://unpkg.com/preact@latest?module'
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'
import { html } from 'https://unpkg.com/htm/preact/index.module.js?module'

const clientId = '2d789520a6304a59ad74c43a0fa07e45'
const clientSecret = 'grupx1AhF3A8Xusk0W4Sd5VED1OBLlJt'
const authUrl = 'https://us.battle.net/oauth/token'

let token, API, characterName

const emSpec = {
    blood: 'đ§đŊââī¸',
    frost: {
        deathknight: 'đĨļ',
        mage: 'â'
    },
    unholy: 'đ§ââī¸',
    havoc: 'đą',
    vengeance: 'đĻ',
    devastation: 'đĒ¨',
    preservation: 'đĒ',
    balance: 'đĻ',
    feral: 'đ¯',
    guardian: 'đģ',
    restoration: {
        druid: 'đŗ',
        shaman: 'đĻ'
    },
    beasts: 'đž',
    marksmanship: 'đ¯',
    survival: 'đ¸ī¸',
    arcane: 'đŽ',
    fire: 'đĨ',
    brewmaster: 'đē',
    mistweaver: 'âī¸',
    windwalker: 'đ¨',
    holy: {
        paladin: 'đ',
        priest: 'đ§đŊââī¸'
    },
    protection: {
        paladin: 'đ¨',
        warrior: 'đĄī¸'
    },
    retribution: 'âī¸',
    discipline: 'đĒŠ',
    shadow: 'đ¤',
    assassination: 'đĨˇđŊ',
    outlaw: 'đĻšđŊââī¸',
    subtlety: 'đĢĨ',
    enhancement: 'đ',
    elemental: 'âĄ',
    affliction: 'đĻ ',
    demonology: 'đš',
    destruction: 'đĨ',
    arms: 'đĄī¸',
    fury: 'đĄ',
    undefined: 'â'
}
const emClass = {
    deathknight: 'â ī¸',
    demonhunter: 'đ',
    evoker: 'đ',
    druid: 'đĻ',    
    hunter: 'đš',
    mage: 'đ§đŊââī¸',
    monk: 'âŠī¸',
    paladin: 'đ',
    priest: 'âĒ',
    rogue: 'đ´',
    shaman: 'đ¯ī¸',
    warlock: 'đĒŦ',
    warrior: 'âī¸'
}
const emRace = {
    bloodelf: 'đ§đŧââī¸',
    darkirondwarf: 'đ´đŋ',
    draenei: 'đ',
    dracthyr: {
        Alliance: 'đĻ',
        Horde: 'đ',
        Neutral: 'đ'
    },
    dwarf: 'đ¨đŊâđĻ°',
    gnome: 'đļđŊ',
    goblin: 'đē',
    highmountaintauren: 'đī¸',
    human: 'đ§đŊââī¸',
    kultiran: 'â',
    lightforgeddraenei: 'đ¸',
    magharorc: 'đĩ',
    mechagnome: 'đ¤',
    nightborne: 'đ',
    nightelf: 'đŊ',
    orc: 'đ§',
    pandaren: {
        Alliance: 'đģââī¸',
        Horde: 'đŧ',
        Neutral: 'đ¨'
    },
    tauren: 'đŽ',
    troll: 'đ­',
    undead: 'â°ī¸',
    voidelf: 'đŗī¸',
    vulpera: 'đĻ',
    worgen: 'đē',
    zandalaritroll: 'đĻ'
}
const emFaction = {
    Alliance: 'đĩ',
    Horde: 'đ´',
    Neutral: 'đĸ'
}
const examplePlayer = [{
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
    average_item_level: 65
}]
const emNumbers = {
    0: '0ī¸âŖ',
    1: '1ī¸âŖ',
    2: '2ī¸âŖ',
    3: '3ī¸âŖ',
    4: '4ī¸âŖ',
    5: '5ī¸âŖ',
    6: '6ī¸âŖ',
    7: '7ī¸âŖ',
    8: '8ī¸âŖ',
    9: '9ī¸âŖ'
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
            API = `https://us.api.blizzard.com/profile/wow/character/quelthalas/${characterName}?namespace=profile-us&locale=en_US&access_token=${token}`
        })
}

const characterUrl = 'https://us.api.blizzard.com/profile/wow/character/'
const characterRealm = 'quelthalas'
const urlParams = '?namespace=profile-us&locale=en_US&access_token='

initAuth()

function whoIs(str) {
    let s = str.toLowerCase()
    if (examplePlayer.some(e => e.name.toLowerCase() === s)) {
        return 'đŽ'
    }
    if (s.startsWith('lak')) {
        return 'đ¨đģâđģ'
    } else if (s.startsWith('elnil')||s.startsWith('nil')){
        return 'đ'
    } else if (s.startsWith('beta')||s.startsWith('bata')){
        return 'đŗđŊââī¸'
    } else if (s.includes('tat')||s.includes('kun')){
        return 'đŽđģââī¸'
    } else if (s.startsWith('ronin')||s.endsWith('ronin')){
        return 'đĻĻ'
    } else if (s.startsWith('axi')||s.includes('tara')){
        return 'đ'
    } else if (s.includes('yiz')||s.endsWith('mann')){
        return 'đđģ'
    } else if (s.includes('tacon')){
        return 'đđģ'
    } else { return '' }
}
function rarity(lv) {
    if(lv<68) return 'poor'
    else if(lv<148) return 'common'
    else if(lv<158) return 'uncommon'
    else if(lv<187) return 'rare'
    else if(lv<275) return 'epic'
    else if(lv<305) return 'legendary'
    else if(lv<350) return 'artifact'
    else return 'heirloom'
}

const addTheme = () => document.querySelector('html').getAttribute('data-theme') == 'light' ? 'light' : 'dark'

function App() {

    const [player, setPlayer] = useState([examplePlayer[Math.floor(Math.random() * 6)]])
    const [search, setSearch] = useState('')
    const [table, setTable] = useState('')
    const ARTESANOS = ['Lakhae', 'Elniloo', 'Kunfucion', 'Batacudruida', 'Ripyizuman', 'Tarahahun', 'Onironin', 'Taconhyhunte']

    const handleInput = (e) => {setSearch(e.target.value.toLowerCase())}
    const handleSubmit = () => {
        if (player[0]) { if (player[0].npc) player.shift()}
        if (!player.some(e => e.name.toLowerCase() === search)) {
        fetch(characterUrl+characterRealm+'/'+search+urlParams+token)
        .then(res => res.json())
        .then(data => data.hasOwnProperty('code') ? alert(`${search.charAt(0).toUpperCase()+search.slice(1)} not found`) : setPlayer(current => [...current, data]))
        }
        else {
            alert('The name you provided is invalid or already exists in the table')
        }
    }

    const generateArtesanos = () => ARTESANOS.map(e => {
        if (player[0]) { if (player[0].npc) player.shift()}
        if (!player.some(e => e.name.toLowerCase() === search)) {
        fetch(characterUrl+characterRealm+'/'+e.toLowerCase()+urlParams+token)
        .then(res => res.json())
        .then(data => data.hasOwnProperty('code') ? console.log(`${e.charAt(0).toUpperCase()+e.toLowerCase().slice(1)} not found`) : setPlayer(current => [...current, data]))
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
            <button type='submit' role='button' onClick=${handleSubmit}>đ</button>
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
                        (e.level >= 70 
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
