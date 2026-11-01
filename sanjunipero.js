// Game State
let gameState = {
    playerName: "Yorkie",
    currentDecade: "1980s",
    currentLocation: "Tucker's Bar",
    trialMinutesLeft: 60, // 60 real seconds = feels like a proper session
    connections: [],
    currentPerson: null,
    conversationStage: 0,
    visitedDecades: new Set(),
    visitedLocations: new Set(),
    danceCount: 0,
    hasMetKelly: false,
    kellyConnectionLevel: 0,
    discoveries: [],
    seenDanceMsgs: [],
    mood: "curious"
};


// Locations per decade
const LOCATIONS = {
    "1980s": [
        { name: "Tucker's Bar", emoji: "🍹", desc: "Neon lights pulse to the rhythm of 80s synth-pop. The dancefloor is packed." },
        { name: "Beach Boardwalk", emoji: "🌅", desc: "The sun never sets here. Couples stroll past video game arcades." },
        { name: "Arcade", emoji: "🕹️", desc: "Free-to-play forever. Pac-Man, Space Invaders, the classics. Everyone's a winner." },
        { name: "Record Store", emoji: "💿", desc: "Every album ever made. You could spend eternity here and never hear the same song twice." }
    ],
    "1990s": [
        { name: "Grunge Bar", emoji: "🎸", desc: "Flannel shirts and cigarette smoke. Nirvana plays on a loop nobody minds." },
        { name: "Beach Boardwalk", emoji: "🌅", desc: "Rollerbladers and hacky-sackers. The same perfect sunset." },
        { name: "Coffee House", emoji: "☕", desc: "Acoustic sets and black coffee. Everyone's writing something." },
        { name: "Record Store", emoji: "💿", desc: "Britpop, grunge, trip-hop. Everything you forgot you loved." }
    ],
    "2000s": [
        { name: "Club Night", emoji: "🎤", desc: "Destiny's Child blasts. Flip phones glow like fireflies on the dancefloor." },
        { name: "Beach Boardwalk", emoji: "🌅", desc: "The same perfect sunset, now with iPod white earbuds everywhere." },
        { name: "DVD Rental", emoji: "📼", desc: "Every film ever made. No late fees. No due dates." },
        { name: "Internet Café", emoji: "💻", desc: "Dial-up tone plays softly. MSN Messenger windows open everywhere." }
    ],
    "2010s": [
        { name: "Festival Main Stage", emoji: "🎧", desc: "EDM drops shake the ground. Glow sticks everywhere. The crowd never tires." },
        { name: "Beach Boardwalk", emoji: "🌅", desc: "The same perfect sunset. Instagrammable forever." },
        { name: "Rooftop Bar", emoji: "🌃", desc: "City lights stretch to the horizon. Craft cocktails that never disappoint." },
        { name: "Pop-Up Gallery", emoji: "🎨", desc: "Art that moves, speaks, breathes. A new piece appears every time you look away." }
    ]
};

// NPCs
const PEOPLE = {
    "1980s": [
        { name: "Kelly", emoji: "👩‍🦱", vibe: "Cool, confident, a little guarded", isKelly: true },
        { name: "Wes", emoji: "👨‍🎤", vibe: "Life of the party, been here years" },
        { name: "Tucker", emoji: "👨‍💼", vibe: "Bar owner, knows everyone's story" },
        { name: "Dana", emoji: "👩‍🎤", vibe: "Wild, funny, never stops dancing" }
    ],
    "1990s": [
        { name: "Kelly", emoji: "👩‍🦱", vibe: "Still cool in the 90s, flannel and all", isKelly: true },
        { name: "Grunge Kid", emoji: "🎸", vibe: "Quiet, thoughtful, surprisingly deep" },
        { name: "Skater", emoji: "🛹", vibe: "Chill, easygoing, been here since the 80s" },
        { name: "Jen", emoji: "👩‍💻", vibe: "Poet, coffee addict, kind eyes" }
    ],
    "2000s": [
        { name: "Kelly", emoji: "👩‍🦱", vibe: "Knows all the words to every song here", isKelly: true },
        { name: "Pop Star", emoji: "💎", vibe: "Glittery, loud, secretly quite lonely" },
        { name: "Tech Bro", emoji: "📱", vibe: "Always pitching his startup idea" },
        { name: "Marcy", emoji: "👩‍🎵", vibe: "Former DJ, now just dances" }
    ],
    "2010s": [
        { name: "Kelly", emoji: "👩‍🦱", vibe: "Dances like she's trying to forget something", isKelly: true },
        { name: "Festival Goer", emoji: "🎧", vibe: "Pure joy, lives for the drop" },
        { name: "Influencer", emoji: "📸", vibe: "Always on, surprisingly self-aware about it" },
        { name: "Ravi", emoji: "🧑‍🎤", vibe: "Quiet, watching, seems to see everything" }
    ]
};

// Deep conversation trees
const CONVERSATIONS = {
    Kelly: [
        {
            npc: "Hey. Haven't seen you here before. First time?",
            responses: [
                { text: "Yeah. It's... a lot to take in.", connection: 2 },
                { text: "First time. You come here often?", connection: 1 },
                { text: "Is it that obvious?", connection: 2 }
            ]
        },
        {
            npc: "Trial run or you thinking of staying?",
            responses: [
                { text: "Not sure yet. It's a big decision.", connection: 2 },
                { text: "Just exploring. What about you?", connection: 2 },
                { text: "Definitely staying. Why wouldn't you?", connection: 0 }
            ]
        },
        {
            npc: "I've been here a while. It's... complicated. Sometimes I wonder if I made the right call.",
            responses: [
                { text: "What makes you stay then?", connection: 3 },
                { text: "What would have been the alternative?", connection: 2 },
                { text: "Sounds like you regret it.", connection: 1 }
            ]
        },
        {
            npc: "The music, I guess. And the people. You meet someone new every night here, technically. But most of them are just... passing through.",
            responses: [
                { text: "Like me?", connection: 3 },
                { text: "That sounds lonely.", connection: 3 },
                { text: "Must be nice not to get bored.", connection: 1 }
            ]
        },
        {
            npc: "Yeah. Like you. But... I don't know. Something's different tonight.",
            responses: [
                { text: "Can I find you later? In a different decade maybe?", connection: 4 },
                { text: "Different how?", connection: 3 },
                { text: "I should explore more. Can we talk again?", connection: 3 }
            ]
        }
    ],
    Tucker: [
        {
            npc: "Welcome. First drink is always on the house here. Been running this place since 1987, technically.",
            responses: [
                { text: "What's it like running a bar in a digital afterlife?", connection: 2 },
                { text: "Since 1987? You must have seen a lot.", connection: 2 },
                { text: "What do you recommend?", connection: 1 }
            ]
        },
        {
            npc: "You get used to it. People come, people go. Some stay forever. The ones who struggle are the ones who can't let go of what they left behind.",
            responses: [
                { text: "What do you mean?", connection: 2 },
                { text: "That sounds sad.", connection: 2 },
                { text: "Have you let go?", connection: 3 }
            ]
        },
        {
            npc: "Mostly. I miss the seasons. Spring, mostly. Never spring here. Always... this. Which isn't bad. Just the same.",
            responses: [
                { text: "I hadn't thought about seasons.", connection: 2 },
                { text: "Does it ever feel hollow?", connection: 2 },
                { text: "I think I'd miss that too.", connection: 2 }
            ]
        }
    ],
    Wes: [
        {
            npc: "Hey! You look like you need to dance. Trust me, it fixes everything.",
            responses: [
                { text: "What exactly does it fix?", connection: 1 },
                { text: "Does it actually fix things here?", connection: 2 },
                { text: "Maybe. What are you here for?", connection: 2 }
            ]
        },
        {
            npc: "Ha! That's the question isn't it. I died in 2019. Car accident. Total cliché. Now I just... party. Forever. Which sounds great and is mostly great.",
            responses: [
                { text: "What's the 'mostly' part?", connection: 3 },
                { text: "You seem at peace with it.", connection: 1 },
                { text: "Do you ever go to other decades?", connection: 1 }
            ]
        },
        {
            npc: "The mostly part is... I had a daughter. She can trial-visit. Sometimes she does. We talk, we dance. Then she leaves and comes back older. And I stay the same. That part's hard.",
            responses: [
                { text: "I'm sorry.", connection: 3 },
                { text: "Does she know how much it means to you?", connection: 2 },
                { text: "That must change things.", connection: 2 }
            ]
        }
    ],
    default: [
        {
            npc: "You new here? Welcome to forever!",
            responses: [
                { text: "Thanks! Everyone seems so happy.", connection: 1 },
                { text: "Is it always this good?", connection: 1 },
                { text: "What's your story?", connection: 2 }
            ]
        },
        {
            npc: "Mostly, yeah. You stop noticing the weirdness after a while. The no-ageing, the perfect weather. It just becomes... normal.",
            responses: [
                { text: "Does normal feel like enough?", connection: 2 },
                { text: "I can't imagine.", connection: 1 },
                { text: "Sounds peaceful.", connection: 1 }
            ]
        }
    ]
};

// More explore descriptions
const EXPLORE_TEXTS = {
    "Tucker's Bar": [
        "You find a corner booth and watch the room. Everyone's laughing but nobody looks tired.",
        "You catch your reflection behind the bar. You look exactly how you want to look.",
        "A song comes on that you forgot existed. You feel it somewhere deep.",
        "Tucker nods at you from across the bar. You feel, strangely, like you belong here."
    ],
    "Beach Boardwalk": [
        "The sun hangs perfectly at golden hour. It never moves. You stop minding.",
        "You take your shoes off on the sand. The temperature is exactly right.",
        "A couple walks past holding hands. They look like they've been together a century.",
        "You watch the ocean. The waves are rhythmic, perfect, endless."
    ],
    "Arcade": [
        "You play a game you've never beaten. You win first try. It feels earned anyway.",
        "A kid next to you is playing Galaga. He says he's been playing since 1983.",
        "Everything here is free. Nothing breaks. Nobody tilts the machine.",
        "You find a two-player cabinet and sit down. Something about it feels like an invitation."
    ],
    "Record Store": [
        "You find an album you lost in a house move years ago. You put it on.",
        "The owner knows every record. He recommends something you've never heard. It's perfect.",
        "You spend longer in here than you planned. Nobody minds.",
        "There's a listening station. You put on headphones and disappear for a while."
    ],
    "default": [
        "You explore for a while. Everything here feels curated, like a memory of a place rather than a place.",
        "You sit outside and breathe. The air is exactly right.",
        "You people-watch. Everyone here made a choice to be here.",
        "You wander. There's no rush. There's never a rush."
    ]
};

// Timers
let trialTimer = null;

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function enterParadise() {
    gameState.playerName = document.getElementById('user-name').value || "Yorkie";
    document.getElementById('player-name-display').textContent = gameState.playerName;
    showScreen('decade-screen');
}

function selectDecade(decade) {
    gameState.currentDecade = decade;
    gameState.visitedDecades.add(decade);
    document.getElementById('current-decade-display').textContent = decade;
    showScreen('club-screen');
    updateScene();
    if (!trialTimer) startTrialTimer();
}

function startTrialTimer() {
    updateTimerDisplay();
    trialTimer = setInterval(() => {
        gameState.trialMinutesLeft--;
        updateTimerDisplay();
        if (gameState.trialMinutesLeft <= 0) {
            clearInterval(trialTimer);
            endTrial();
        }
    }, 1000); // 1 real second per tick, 60 ticks total
}

function updateTimerDisplay() {
    const mins = Math.floor(gameState.trialMinutesLeft / 60);
    const secs = gameState.trialMinutesLeft % 60;
    document.getElementById('trial-time').textContent =
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateScene() {
    const locations = LOCATIONS[gameState.currentDecade];
    const currentLoc = locations.find(l => l.name === gameState.currentLocation) || locations[0];
    gameState.currentLocation = currentLoc.name;
    gameState.visitedLocations.add(gameState.currentLocation);

    document.getElementById('scene-description').textContent = currentLoc.desc;
    document.getElementById('current-location-display').textContent = currentLoc.name;

    const people = PEOPLE[gameState.currentDecade];
    const peopleHTML = people.map(person => `
        <div class="person-card" onclick="startConversation('${person.name}')">
            <div class="person-emoji">${person.emoji}</div>
            <div class="person-name">${person.name}</div>
            <div class="person-vibe">${person.vibe}</div>
        </div>
    `).join('');
    document.getElementById('scene-people').innerHTML = peopleHTML;
}

function changeLocation() {
    const locations = LOCATIONS[gameState.currentDecade];
    const currentIndex = locations.findIndex(l => l.name === gameState.currentLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    gameState.currentLocation = locations[nextIndex].name;
    gameState.visitedLocations.add(gameState.currentLocation);
    updateScene();
}

function exploreTown() {
    const texts = EXPLORE_TEXTS[gameState.currentLocation] || EXPLORE_TEXTS["default"];
    // Pick one not recently seen
    const unseen = texts.filter(t => !gameState.discoveries.includes(t));
    const pool = unseen.length > 0 ? unseen : texts;
    const text = pool[Math.floor(Math.random() * pool.length)];
    document.getElementById('scene-description').textContent = text;
    if (!gameState.discoveries.includes(text)) {
        gameState.discoveries.push(text);
    }
}

function showDecadeSelect() {
    showScreen('decade-screen');
}

function dance() {
    gameState.danceCount++;
    const danceMessages = [
        "You lose yourself in the music. Just for a moment, nothing else exists.",
        "Everyone on the floor. The energy is electric and completely real.",
        "You're free. You're young. You're here.",
        "The music pulses. You stop thinking. This is what it's for.",
        "Someone pulls you further onto the dancefloor. You don't resist.",
        "You dance until you're breathless. Then remember you don't need to breathe here."
    ];
    const unseen = danceMessages.filter(m => !gameState.seenDanceMsgs.includes(m));
    const pool = unseen.length > 0 ? unseen : danceMessages;
    const msg = pool[Math.floor(Math.random() * pool.length)];
    gameState.seenDanceMsgs.push(msg);
    document.getElementById('scene-description').textContent = msg;
}

function startConversation(personName) {
    const person = PEOPLE[gameState.currentDecade].find(p => p.name === personName);
    if (!person) return;

    gameState.currentPerson = person;
    gameState.conversationStage = 0;

    if (person.isKelly) gameState.hasMetKelly = true;

    let connection = gameState.connections.find(c => c.name === personName);
    if (!connection) {
        connection = { name: personName, level: 0, emoji: person.emoji };
        gameState.connections.push(connection);
    }

    document.getElementById('conv-avatar').textContent = person.emoji;
    document.getElementById('conv-name').textContent = person.name;
    document.getElementById('conv-bio').textContent = person.vibe;
    document.getElementById('connection-level').textContent = connection.level;

    loadConversation();
    showScreen('conversation-screen');
}

function loadConversation() {
    const person = gameState.currentPerson;
    let convTree;
    if (person.isKelly) convTree = CONVERSATIONS.Kelly;
    else if (CONVERSATIONS[person.name]) convTree = CONVERSATIONS[person.name];
    else convTree = CONVERSATIONS.default;

    const connection = gameState.connections.find(c => c.name === person.name);
    const convIndex = Math.min(gameState.conversationStage, convTree.length - 1);
    const convo = convTree[convIndex];

    document.getElementById('npc-dialogue').textContent = convo.npc;

    const responsesHTML = convo.responses.map((response, idx) => `
        <button class="response-btn" onclick="respond(${idx})">${response.text}</button>
    `).join('');
    document.getElementById('conversation-responses').innerHTML = responsesHTML;
}

function respond(responseIdx) {
    const person = gameState.currentPerson;
    let convTree;
    if (person.isKelly) convTree = CONVERSATIONS.Kelly;
    else if (CONVERSATIONS[person.name]) convTree = CONVERSATIONS[person.name];
    else convTree = CONVERSATIONS.default;

    const convIndex = Math.min(gameState.conversationStage, convTree.length - 1);
    const response = convTree[convIndex].responses[responseIdx];

    const connection = gameState.connections.find(c => c.name === person.name);
    connection.level += response.connection;
    if (person.isKelly) gameState.kellyConnectionLevel = connection.level;
    document.getElementById('connection-level').textContent = connection.level;

    document.getElementById('conversation-responses').innerHTML =
        '<p style="text-align:center;color:rgba(255,255,255,0.4);font-style:italic;">...</p>';

    setTimeout(() => {
        gameState.conversationStage++;
        if (gameState.conversationStage >= convTree.length) {
            updateConnectionsList();
            showScreen('club-screen');
        } else {
            loadConversation();
        }
    }, 1000);
}

function updateConnectionsList() {
    const list = document.getElementById('connections-list');
    if (gameState.connections.length === 0) {
        list.innerHTML = '<p class="empty-state">You haven\'t met anyone yet.</p>';
        return;
    }
    list.innerHTML = gameState.connections.map(conn => `
        <div class="connection-item">
            <span>${conn.emoji} ${conn.name}</span>
            <span style="color:var(--neon-yellow)">${conn.level} / 15</span>
        </div>
    `).join('');
}

function endTrial() {
    showScreen('decision-screen');
    const kellyConn = gameState.connections.find(c => c.name === "Kelly");
    if (kellyConn && kellyConn.level >= 8) {
        document.getElementById('special-connection').textContent =
            "You and Kelly found something real here. She's waiting to hear your answer.";
    } else if (gameState.hasMetKelly) {
        document.getElementById('special-connection').textContent =
            "You met Kelly. Something was there, but you didn't quite reach it.";
    } else {
        document.getElementById('special-connection').textContent =
            "You explored, you danced, you saw what this place is.";
    }
}

function stayForever() {
    const kellyConn = gameState.connections.find(c => c.name === "Kelly");
    let endingText;

    if (kellyConn && kellyConn.level >= 8) {
        endingText = `You chose to stay. Kelly chose to stay too. Together you move through decades — ` +
            `dancing in the 80s, walking the boardwalk in the 90s, watching the same perfect sunset every evening. ` +
            `Your consciousness lives in the cloud. Your love is not simulated.`;
    } else if (gameState.connections.length >= 3) {
        endingText = `You chose eternity. You've visited ${gameState.visitedDecades.size} decades, ` +
            `found ${gameState.visitedLocations.size} places, danced ${gameState.danceCount} times. ` +
            `You have friends here. It's a life. A different kind of life, but yours.`;
    } else {
        endingText = `You chose to stay. San Junipero opens up before you — ` +
            `all the decades, all the people, all the music. You have forever to explore it. ` +
            `Tonight, you just start.`;
    }

    showEnding("Heaven is a Place on Earth", endingText);
}

function passOn() {
    const kellyConn = gameState.connections.find(c => c.name === "Kelly");
    let endingText;

    if (kellyConn && kellyConn.level >= 8) {
        endingText = `You chose to pass on naturally. Kelly stays — she'll dance in Tucker's long after you're gone. ` +
            `She'll remember you. Literally forever. ` +
            `You chose mortality, and there's a kind of courage in that.`;
    } else {
        endingText = `You chose to pass on. San Junipero was beautiful — the music, the people, the light that never fades. ` +
            `But you believed some things should end. You walk out into the dark, and it's okay.`;
    }

    showEnding("Until We Meet Again", endingText);
}

function showEnding(title, text) {
    document.getElementById('ending-title').textContent = title;
    document.getElementById('ending-text').textContent = text;
    document.getElementById('decades-visited').textContent = gameState.visitedDecades.size;
    document.getElementById('connections-made').textContent = gameState.connections.length;
    document.getElementById('dances-count').textContent = gameState.danceCount;
    showScreen('ending-screen');
}

function restartExperience() {
    if (trialTimer) clearInterval(trialTimer);
    gameState = {
        playerName: "Yorkie",
        currentDecade: "1980s",
        currentLocation: "Tucker's Bar",
        trialMinutesLeft: 60,
        connections: [],
        currentPerson: null,
        conversationStage: 0,
        visitedDecades: new Set(),
        visitedLocations: new Set(),
        danceCount: 0,
        hasMetKelly: false,
        kellyConnectionLevel: 0,
        discoveries: [],
        seenDanceMsgs: [],
        mood: "curious"
    };
    trialTimer = null;
    showScreen('welcome-screen');
}

function goHome() {
    window.location.href = 'home.html';
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('San Junipero — Heaven is a place on Earth 🌴');
});
