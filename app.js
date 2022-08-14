import { options as n, h, render } from 'https://unpkg.com/preact@latest?module'
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'
import { html } from 'https://unpkg.com/htm/preact/index.module.js?module'

const clientId = '2d789520a6304a59ad74c43a0fa07e45'
const clientSecret = 'grupx1AhF3A8Xusk0W4Sd5VED1OBLlJt'
const authUrl = 'https://us.battle.net/oauth/token'

let token, API, characterName, ilvlArray;

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
    bloodelf: '🧝🏽‍♂️',
    darkirondwarf: '👴🏿',
    draener: '🐙',
    dracthyr: '🐲',
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
    pandaren: '🐼',
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

    console.log(whoIs())


function App() {

    const [player, setPlayer] = useState([examplePlayer])
    const [search, setSearch] = useState('')

    const handleInput = (e) => {setSearch(e.target.value.toLowerCase())}
    const handleSubmit = () => {
        fetch(characterUrl+characterRealm+'/'+search+urlParams+token)
        .then(res => res.json())
        .then(data => data.hasOwnProperty('code') ? alert(`${search.charAt(0).toUpperCase()+search.slice(1)} not found`) : setPlayer(current => [...current, data]))
        
    }

    return html`
        <Fragment>
            <h1>WoWsapp</h1>
            <form>
                <label for "region">Region </label>
                <select name="region">
                    <option value="us">US</option>
                </select>
                <label for "realm">Realm </label>
                <select name="realm">
                    <option value="demon-soul">Demon Soul</option>
                    <option value="drakkari">Drakkari</option>
                    <option value="quelthalas">Quel'Thalas</option>
                    <option value="ragnaros">Ragnaros</option>
                </select>
            </form>
            <input placeholder="Search your character" onInput=${handleInput}></input>
            <button onClick=${handleSubmit}>🔍</button>
            <p>${search}</p>
                <table>
                    <tbody>
                        <tr style="background: linear-gradient(to bottom, #777, #aaa, #777, #333); color: black">
                            <td>Name</td><td>Race</td><td>Class</td><td>Spec</td><td>iLevel</td><td>Emoji</td>
                        </tr>
                        ${player.map(e => html`<tr className=${e.character_class.name.replace(/\s/g, '').toLowerCase()}>
                            <td>${e.name}</td><td>${e.race.name}</td>
                            <td>${e.character_class.name}</td>
                            <td>${e.active_spec?.name}</td>
                            <td>${e.level >= 60 ? e.average_item_level : e.level}</td>
                            <td className=${e.name+' emoData'}>
                                ${

                                emFaction[e.faction.name]+
                                emRace[e.race.name.replace(/\s|\'/g, '').toLowerCase()]+
                                emClass[e.character_class.name.replace(/\s/g, '').toLowerCase()]+
                                (typeof emSpec[e.active_spec?.name.toLowerCase()] === 'object'
                                ? emSpec[e.active_spec.name.toLowerCase()][e.character_class.name.replace(/\s/g, '').toLowerCase()]
                                : emSpec[e.active_spec?.name.toLowerCase()])
                                }${e.level >= 60 
                                    ? Array.from(String(e.average_item_level).padStart(3, 0), Number).map(e => emNumbers[e])
                                    : Array.from(String(e.level).padStart(3, 0), Number).map(e => emNumbers[e])}   
                            </td>
                        </tr>`)}
                    </tbody>
                </table>
                <br />
                <article>
                </article>
            </Fragment>`;
}

render(html`<${App} />`, document.body);