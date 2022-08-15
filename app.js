import { options as n, h, render } from 'https://unpkg.com/preact@latest?module'
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'
import { html } from 'https://unpkg.com/htm/preact/index.module.js?module'

const clientId = '2d789520a6304a59ad74c43a0fa07e45'
const clientSecret = 'grupx1AhF3A8Xusk0W4Sd5VED1OBLlJt'
const authUrl = 'https://us.battle.net/oauth/token'

let token, API, characterName

const emSpec = {
    blood: '🧛🏽‍♂️',
    frost: {
        deathknight: '🥶',
        mage: '⛄'
    },
    unholy: '🧟‍♂️',
    havoc: '🔱',
    vengeance: '🦇',
    devastation: '🪨',
    preservation: '🪄',
    balance: '🦉',
    feral: '🐯',
    guardian: '🐻',
    restoration: {
        druid: '🌳',
        shaman: '💦'
    },
    beasts: '🐾',
    marksmanship: '🎯',
    survival: '🕸️',
    arcane: '🔮',
    fire: '🔥',
    brewmaster: '🍺',
    mistweaver: '☁️',
    windwalker: '💨',
    holy: {
        paladin: '🌟',
        priest: '🧚🏽‍♂️'
    },
    protection: {
        paladin: '🚨',
        warrior: '🛡️'
    },
    retribution: '⚜️',
    discipline: '🪩',
    shadow: '👤',
    assassination: '🥷🏽',
    outlaw: '🦹🏽‍♂️',
    subtlety: '🫥',
    enhancement: '🌋',
    elemental: '⚡',
    affliction: '🦠',
    demonology: '👹',
    destruction: '💥',
    arms: '🗡️',
    fury: '😡',
    undefined: '❌'
}

const emClass = {
    deathknight: '☠️',
    demonhunter: '😈',
    evoker: '🌈',
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
    gnome: '👶🏽',
    goblin: '👺',
    highmountaintauren: '🏔️',
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

const examplePlayer = {
    name: 'Lakexya',
    faction: {
        name: 'Neutral'
    },
    character_class: {
        name: 'Evoker'
    },
    race: {
        name: 'Dracthyr'
    },
    level: 70,
    active_spec: {
        name: 'Devastation'
    },
    average_item_level: 312
}

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
            token = res.data.access_token
            API = `https://us.api.blizzard.com/profile/wow/character/quelthalas/${characterName}?namespace=profile-us&locale=en_US&access_token=${token}`
        })
}

const characterUrl = 'https://us.api.blizzard.com/profile/wow/character/'
const characterRealm = 'quelthalas'
const urlParams = '?namespace=profile-us&locale=en_US&access_token='

initAuth()

function whoIs(str = 'lakhae') {
    str.includes('lak') ? '👨🏽‍💻' 
    : ''
    }

function rarity(lv) {
    if(lv<68) return 'poor'
    else if(lv<148) return 'common'
    else if(lv<158) return 'uncommon'
    else if(lv<187) return 'rare'
    else if(lv<265) return 'epic'
    else if(lv<305) return 'legendary'
    else if(lv<350) return 'artifact'
    else return 'heirloom'
}

const pageTheme = document.querySelector('html')

function addTheme() {
    if (pageTheme.getAttribute('data-theme') == 'light') return 'light'
    else return 'dark'
}


function App() {

    const [player, setPlayer] = useState([examplePlayer])
    const [search, setSearch] = useState('')

    const handleInput = (e) => {setSearch(e.target.value.toLowerCase())}
    const handleSubmit = () => {
        if (!player.some(e => e.name.toLowerCase() === search)) {
        fetch(characterUrl+characterRealm+'/'+search+urlParams+token)
        .then(res => res.json())
        .then(data => data.hasOwnProperty('code') ? alert(`${search.charAt(0).toUpperCase()+search.slice(1)} not found`) : setPlayer(current => [...current, data]))
        }
        else {
            alert('The name you provided is invalid or already exists in the table')
        }
    }

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
                        <li><a href='#'>Clear list</a></li>
                        <li><a href='#' role="button">Share</a></li>
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
                    <label for "realm">Realm
                    <select id="realmSlug" name="realm">
                        <option value="demon-soul">Demon Soul</option>
                        <option value="drakkari">Drakkari</option>
                        <option value="quelthalas">Quel'Thalas</option>
                        <option value="ragnaros">Ragnaros</option>
                    </select>
                    </label>
                </div>
            </form>
            <input placeholder="Search your character" onInput=${handleInput}></input>
            <button role='button' onClick=${handleSubmit}>🔍</button>
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

                <article class="container" style="white-space: pre-wrap; text-align: center; width: 50vw">
                    ${player.sort((a, b) => b.average_item_level-a.average_item_level).map(e => 
                        (typeof emRace[e.race.name.replace(/\s|\'/g, '').toLowerCase()] === 'object'
                        ? emRace[e.race.name.replace(/\s|\'/g, '').toLowerCase()][e.faction.name]
                        : emRace[e.race.name.replace(/\s|\'/g, '').toLowerCase()])+
                        emClass[e.character_class.name.replace(/\s/g, '').toLowerCase()]+
                        (typeof emSpec[e.active_spec?.name.toLowerCase()] === 'object'
                        ? emSpec[e.active_spec.name.toLowerCase()][e.character_class.name.replace(/\s/g, '').toLowerCase()]
                        : emSpec[e.active_spec?.name.toLowerCase()])+
                        (e.level >= 60 
                            ? Array.from(String(e.average_item_level).padStart(3, 0), Number).map(e => emNumbers[e]).join().replaceAll(',','')
                            : Array.from(String(e.level).padStart(3, 0), Number).map(e => emNumbers[e]).join().replaceAll(',',''))+'\n'
                        )}
                </article>
                </main>
                <br />
                <footer>
                Christopher Selva - 2022
                </footer>
            </Fragment>`;
}

render(html`<${App} />`, document.body);