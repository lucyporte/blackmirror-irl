// Game State
let gameState = {
    playerName: "Yorkie",
    currentDecade: "1980s",
    trialMinutesLeft: 5,
    connections: [],
    currentPerson: null,
    visitedDecades: new Set(),
    danceCount: 0,
    hasMetKelly: false
};

// NPCs in San Junipero
const PEOPLE = {
    "1980s": [
        { name: "Kelly", emoji: "👩‍🦱", vibe: "Cool, confident, mysterious", isKelly: true },
        { name: "Wes", emoji: "👨‍🎤", vibe: "Fun, outgoing, life of the party" },
        { name: "Tucker", emoji: "👨‍💼", vibe: "Bar owner, friendly" }
    ],
    "1990s": [
        { name: "Kelly", emoji: "👩‍🦱", vibe: "Still cool in the 90s", isKelly: true },
        { name: "Grunge Kid", emoji: "🎸", vibe: "Alternative music fan" },
        { name: "Skater", emoji: "🛹", vibe: "Chill vibes" }
    ],
    "2000s": [
        { name: "Kelly", emoji: "👩‍🦱", vibe: "Modern Kelly", isKelly: true },
        { name: "Pop Star", emoji: "💎", vibe: "All about the bling" },
        { name: "Tech Bro", emoji: "📱", vibe: "Early social media fan" }
    ],
    "2010s": [
        { name: "Kelly", emoji: "👩‍🦱", vibe: "Contemporary Kelly", isKelly: true },
        { name: "Festival Goer", emoji: "🎧", vibe: "EDM enthusiast" },
        { name: "Influencer", emoji: "📸", vibe: "Living for the 'gram" }
    ]
};

// Conversation trees
const CONVERSATIONS = {
    Kelly: [
        {
            npc: "Hey, I haven't seen you here before. First time in San Junipero?",
            responses: [
                { text: "Yeah, it's all a bit overwhelming honestly.", connection: 2 },
                { text: "First time. You come here often?", connection: 1 },
                { text: "Yes! This place is amazing!", connection: 1 }
            ]
        },
        {
            npc: "So what brings you here? Trial run or are you thinking of staying?",
            responses: [
                { text: "I'm not sure yet. It's a big decision.", connection: 2 },
                { text: "Just exploring. Seeing what it's about.", connection: 1 },
                { text: "Definitely staying! Why wouldn't you?", connection: 0 }
            ]
        },
        {
            npc: "I've been here a while. At first it was just for fun, but now... I don't know.",
            responses: [
                { text: "You sound conflicted. Want to talk about it?", connection: 3 },
                { text: "Why the hesitation?", connection: 2 },
                { text: "This place seems perfect though!", connection: 0 }
            ]
        },
        {
            npc: "There's something about you. You're different from the others here.",
            responses: [
                { text: "I could say the same about you.", connection: 3 },
                { text: "Different how?", connection: 2 },
                { text: "Thanks, I guess?", connection: 1 }
            ]
        }
    ],
    default: [
        {
            npc: "Love this place! The energy never gets old!",
            responses: [
                { text: "Yeah, it's pretty amazing!", connection: 1 },
                { text: "Don't you ever want something... real?", connection: 0 },
                { text: "What's your favorite decade?", connection: 1 }
            ]
        },
        {
            npc: "You're new here, right? Welcome to paradise!",
            responses: [
                { text: "Thanks! Everyone seems so happy.", connection: 1 },
                { text: "It's nice but also strange.", connection: 1 },
                { text: "Yeah! Let's party!", connection: 1 }
            ]
        }
    ]
};

// Timers
let trialTimer = null;

// Utils
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Start Experience
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
    startTrialTimer();
}

function startTrialTimer() {
    if (trialTimer) return; // Already started
    
    trialTimer = setInterval(() => {
        gameState.trialMinutesLeft--;
        
        const minutes = Math.floor(gameState.trialMinutesLeft);
        const seconds = Math.floor((gameState.trialMinutesLeft % 1) * 60);
        document.getElementById('trial-time').textContent = 
            `${minutes}:${String(seconds).padStart(2, '0')}`;
        
        if (gameState.trialMinutesLeft <= 0) {
            clearInterval(trialTimer);
            endTrial();
        }
    }, 60000 / 60); // Speed up time for demo (1 minute = 1 second)
}

function updateScene() {
    const decadeDescriptions = {
        "1980s": "You're at Tucker's - the hottest club in San Junipero. Neon lights pulse to the rhythm of 80s synth-pop. People are dancing, laughing, living.",
        "1990s": "The vibe has shifted to grunge and alternative rock. Everyone's more laid back, wearing flannel and ripped jeans.",
        "2000s": "Pop music blasts as people show off their flip phones and bling. The energy is electric and carefree.",
        "2010s": "EDM drops shake the floor. Everyone's dancing with glow sticks. The festival never ends here."
    };
    
    document.getElementById('scene-description').textContent = decadeDescriptions[gameState.currentDecade];
    
    // Render people
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

function exploreTown() {
    const locations = [
        "You walk along the beach. The sunset never ends here.",
        "You visit the arcade. Every game is free.",
        "You grab a drink at the bar. It tastes perfect, as always.",
        "You sit in a park. The weather is always 75 degrees."
    ];
    
    document.getElementById('scene-description').textContent = 
        locations[Math.floor(Math.random() * locations.length)];
}

function showDecadeSelect() {
    showScreen('decade-screen');
}

function dance() {
    gameState.danceCount++;
    const danceMessages = [
        "You lose yourself in the music. This feeling never gets old!",
        "Everyone's dancing with you. The energy is incredible!",
        "You're free. You're young. You're alive... sort of.",
        "The music pulses through you. Time doesn't exist here."
    ];
    
    document.getElementById('scene-description').textContent = 
        danceMessages[Math.floor(Math.random() * danceMessages.length)];
}

// Conversations
function startConversation(personName) {
    const person = PEOPLE[gameState.currentDecade].find(p => p.name === personName);
    if (!person) return;
    
    gameState.currentPerson = person;
    gameState.conversationStage = 0;
    
    if (person.isKelly) {
        gameState.hasMetKelly = true;
    }
    
    // Find existing connection or create new
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
    const conversations = person.isKelly ? CONVERSATIONS.Kelly : CONVERSATIONS.default;
    const connection = gameState.connections.find(c => c.name === person.name);
    
    // Pick conversation based on connection level
    const convIndex = Math.min(gameState.conversationStage, conversations.length - 1);
    const convo = conversations[convIndex];
    
    document.getElementById('npc-dialogue').textContent = convo.npc;
    
    const responsesHTML = convo.responses.map((response, idx) => `
        <button class="response-btn" onclick="respond(${response.connection})">
            ${response.text}
        </button>
    `).join('');
    
    document.getElementById('conversation-responses').innerHTML = responsesHTML;
}

function respond(connectionGain) {
    const person = gameState.currentPerson;
    const connection = gameState.connections.find(c => c.name === person.name);
    
    connection.level += connectionGain;
    document.getElementById('connection-level').textContent = connection.level;
    
    // Show brief "thinking" state
    document.getElementById('conversation-responses').innerHTML = 
        '<p style="text-align:center;color:rgba(255,255,255,0.5);">...</p>';
    
    setTimeout(() => {
        gameState.conversationStage++;
        
        const conversations = person.isKelly ? CONVERSATIONS.Kelly : CONVERSATIONS.default;
        
        if (gameState.conversationStage >= conversations.length) {
            // Conversation complete
            updateConnectionsList();
            showScreen('club-screen');
        } else {
            loadConversation();
        }
    }, 1200);
}

function updateConnectionsList() {
    const list = document.getElementById('connections-list');
    
    if (gameState.connections.length === 0) {
        list.innerHTML = '<p class="empty-state">You haven\'t met anyone yet. Start socializing!</p>';
        return;
    }
    
    list.innerHTML = gameState.connections.map(conn => `
        <div class="connection-item">
            <span>${conn.emoji} ${conn.name}</span>
            <span style="color: var(--neon-yellow)">Connection: ${conn.level}/10</span>
        </div>
    `).join('');
}

// End Trial
function endTrial() {
    showScreen('decision-screen');
    
    const kellyConnection = gameState.connections.find(c => c.name === "Kelly");
    
    if (kellyConnection && kellyConnection.level >= 6) {
        document.getElementById('special-connection').textContent = 
            "You formed a deep connection with Kelly. She's hoping you'll stay.";
    } else if (gameState.hasMetKelly) {
        document.getElementById('special-connection').textContent = 
            "You met Kelly, but didn't really connect.";
    } else {
        document.getElementById('special-connection').textContent = 
            "You had fun, but no deep connections formed.";
    }
}

function stayForever() {
    const kellyConnection = gameState.connections.find(c => c.name === "Kelly");
    let endingText = "";
    
    if (kellyConnection && kellyConnection.level >= 6) {
        // True love ending (like the episode)
        endingText = `You chose to stay. Kelly chose to stay too. Together, you live forever in San Junipero - ` +
            `dancing through decades, exploring infinite possibilities, loving without limits. ` +
            `Your consciousness exists in the cloud, but your love is real. Heaven IS a place on Earth.`;
    } else if (gameState.connections.length > 0) {
        // Friends ending
        endingText = `You chose eternal life in San Junipero. You've made friends, visited ${gameState.visitedDecades.size} decades, ` +
            `and danced ${gameState.danceCount} times. The party never ends. You're happy... mostly. ` +
            `Sometimes you wonder what you're missing, but then the music starts again.`;
    } else {
        // Alone ending
        endingText = `You chose to stay forever. San Junipero is beautiful, but you're still figuring out what eternity means. ` +
            `Maybe you'll make deeper connections over time. You have literally forever to try.`;
    }
    
    showEnding("Heaven is a Place on Earth", endingText);
}

function passOn() {
    const kellyConnection = gameState.connections.find(c => c.name === "Kelly");
    let endingText = "";
    
    if (kellyConnection && kellyConnection.level >= 6) {
        // Bittersweet ending
        endingText = `You chose to pass on naturally. Kelly stays in San Junipero, waiting for you. ` +
            `Your time together was beautiful but brief. Sometimes love means letting go. ` +
            `She'll remember you forever - literally.`;
    } else {
        // Peaceful ending
        endingText = `You chose natural death. San Junipero was beautiful, but you believe some things should end. ` +
            `You experienced the digital paradise and chose mortality anyway. ` +
            `That's its own kind of courage.`;
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
        trialMinutesLeft: 5,
        connections: [],
        currentPerson: null,
        visitedDecades: new Set(),
        danceCount: 0,
        hasMetKelly: false
    };
    
    trialTimer = null;
    showScreen('welcome-screen');
}

function goHome() {
    window.location.href = 'home.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('San Junipero - Paradise Initialized');
    console.log('🎵 Heaven is a place on Earth 🎵');
});
