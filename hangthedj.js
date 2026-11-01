// Game State
let gameState = {
    userName: "Frank",
    relationshipCount: 0,
    totalTimeSpent: 0,
    currentMatch: null,
    timerSeconds: 0,
    timerInterval: null,
    conversationIndex: 0,
    currentConversations: [],
    usedMatches: [],
    amyReunionShown: false,
    usedConversationIndices: {} // track used convos per character
};

// Matches
const MATCHES = [
    { name: "Amy", avatar: "👩", bio: "Quiet, thoughtful. Questions everything.", baseCompat: 98 },
    { name: "Nicola", avatar: "👩‍🦰", bio: "Outgoing party person.", baseCompat: 45 },
    { name: "Sophie", avatar: "👱‍♀️", bio: "Athletic and active.", baseCompat: 62 },
    { name: "Emma", avatar: "👩‍💼", bio: "Career-focused professional.", baseCompat: 52 },
    { name: "Rachel", avatar: "👩‍🎓", bio: "Intellectual bookworm.", baseCompat: 73 }
];

// ALL conversations for all matches
const ALL_CONVERSATIONS = {
    Amy: [
        { q: "This is strange, isn't it? Being told when we'll end?", a: ["It is. Feels like we have no choice.", "I trust The System knows best.", "Let's just enjoy the time we have."] },
        { q: "Do you ever wonder what's outside The System?", a: ["All the time. There must be another way.", "No, this works fine for me.", "I try not to think about it."] },
        { q: "I feel like I know you. Have we met before?", a: ["I feel that too. It's strange.", "Maybe The System matched us well.", "I don't think so."] },
        { q: "What if we didn't check the timer?", a: ["That's... an interesting idea.", "We have to follow the rules.", "I've thought about that."] }
    ],
    Nicola: [
        { q: "This is my fourth pairing! It's so fun meeting everyone!", a: ["That's a lot! Doesn't it get tiring?", "Yeah, I love it too!", "I'm more cautious personally."] },
        { q: "Want to do something fun? We have time!", a: ["Sure, let's go!", "Let's just talk here.", "I'd rather not."] },
        { q: "The System is amazing, right? No awkward asking out!", a: ["I guess, but it feels impersonal.", "Totally agree!", "I'm not sure yet."] }
    ],
    Sophie: [
        { q: "I went for a 10k run this morning. You exercise?", a: ["Sometimes. I'm more casual about it.", "Yes! I'd love to work out together.", "Not really my thing."] },
        { q: "Want to go for a walk? I can't sit still.", a: ["Sure, fresh air sounds good.", "Let's stay here and talk.", "I'm fine sitting."] },
        { q: "You seem pretty relaxed. That's nice.", a: ["Thanks! You seem energetic.", "Just going with the flow.", "I guess."] }
    ],
    Emma: [
        { q: "I'm here on my lunch break. Time is money!", a: ["Do you ever relax?", "I respect the hustle.", "That seems exhausting."] },
        { q: "So what do you do career-wise?", a: ["I work in [field].", "I'm figuring it out.", "Let's not talk about work."] },
        { q: "The System is efficient. No time wasted on bad dates.", a: ["But isn't that too transactional?", "Exactly! It's optimized.", "You're missing the romance."] }
    ],
    Rachel: [
        { q: "I'm reading Proust. Have you read it?", a: ["Oh yeah, the memory themes are fascinating.", "I've heard of it.", "Not a big reader."] },
        { q: "There's something philosophical about predetermined endings.", a: ["Right? Like the opposite of free will.", "I'm not really following.", "Maybe we're overthinking."] },
        { q: "You're interesting. Most people don't engage like this.", a: ["Thanks! I'm enjoying this too.", "You set a high bar.", "Just passing time."] }
    ]
};

// Utils
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startDating() {
    const name = document.getElementById('user-name').value.trim() || "Frank";
    gameState.userName = name;
    document.getElementById('user-name-display').textContent = name;
    showScreen('dating-screen');
    assignMatch();
}

function assignMatch() {
    let match;
    
    // First date: always Amy
    if (gameState.relationshipCount === 0) {
        match = MATCHES[0];
    }
    // After 3+ dates, bring Amy back once for rebellion
    else if (gameState.relationshipCount >= 3 && !gameState.amyReunionShown) {
        match = MATCHES[0];
        gameState.amyReunionShown = true;
    }
    // Other dates: random non-Amy match
    else {
        const others = MATCHES.slice(1);
        match = others[Math.floor(Math.random() * others.length)];
    }
    
    gameState.currentMatch = match;
    gameState.conversationIndex = 0;
    
    // Get 3 conversations for this match, never repeating previously used ones
    const allConvos = ALL_CONVERSATIONS[match.name] || ALL_CONVERSATIONS.Amy;
    if (!gameState.usedConversationIndices[match.name]) {
        gameState.usedConversationIndices[match.name] = [];
    }
    const used = gameState.usedConversationIndices[match.name];
    const available = allConvos.map((_, i) => i).filter(i => !used.includes(i));
    // If we've exhausted all, reset for this character
    if (available.length < 3) {
        gameState.usedConversationIndices[match.name] = [];
        available.push(...allConvos.map((_, i) => i));
    }
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    const chosen = shuffled.slice(0, 3);
    chosen.forEach(i => gameState.usedConversationIndices[match.name].push(i));
    gameState.currentConversations = chosen.map(i => allConvos[i]);
    
    // Timer: 45 seconds actual, but display as hours/days
    gameState.timerSeconds = 45;
    
    // Display UI
    document.getElementById('match-avatar').textContent = match.avatar;
    document.getElementById('match-name').textContent = match.name;
    document.getElementById('match-bio').textContent = match.bio;
    document.getElementById('timer-display').textContent = formatFakeTime();
    document.getElementById('expiration-fill').style.width = '100%';
    document.getElementById('interaction-btn').style.display = 'block';
}

function formatFakeTime() {
    const labels = ["30 seconds", "2 minutes", "1 hour", "12 hours", "5 days"];
    return labels[Math.floor(Math.random() * labels.length)];
}

function startInteraction() {
    showScreen('interaction-screen');
    loadConversation();
    startTimer();
}

function startTimer() {
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    
    gameState.timerInterval = setInterval(() => {
        gameState.timerSeconds--;
        updateTimerUI();
        
        if (gameState.timerSeconds <= 0) {
            clearInterval(gameState.timerInterval);
            endRelationship();
        }
    }, 1000);
}

function updateTimerUI() {
    const percent = (gameState.timerSeconds / 45) * 100;
    document.getElementById('expiration-fill').style.width = percent + '%';
    document.getElementById('time-remaining-small').textContent = gameState.timerSeconds + ' seconds remaining';
}

function loadConversation() {
    const convos = gameState.currentConversations;
    const idx = gameState.conversationIndex;
    
    if (idx >= convos.length) {
        // Done talking
        document.getElementById('date-avatar').textContent = gameState.currentMatch.avatar;
        document.getElementById('date-dialogue').textContent = "This was nice. Wonder how much time is left?";
        document.getElementById('response-choices').innerHTML = '<button class="btn-primary" onclick="finishDate()">Check Your Device</button>';
        return;
    }
    
    const convo = convos[idx];
    document.getElementById('date-avatar').textContent = gameState.currentMatch.avatar;
    document.getElementById('date-dialogue').textContent = convo.q;
    document.getElementById('scene-location').textContent = ["Coffee Shop", "Restaurant", "Park", "Bar"][idx % 4];
    
    const choicesHTML = convo.a.map((text, i) => 
        `<button class="choice-btn" onclick="respond(${i})">${text}</button>`
    ).join('');
    document.getElementById('response-choices').innerHTML = choicesHTML;
}

function respond(choiceIdx) {
    document.getElementById('response-choices').innerHTML = '<p style="text-align:center;color:#999;">...</p>';
    
    setTimeout(() => {
        gameState.conversationIndex++;
        loadConversation();
    }, 1200);
}

function finishDate() {
    clearInterval(gameState.timerInterval);
    endRelationship();
}

function endRelationship() {
    clearInterval(gameState.timerInterval);
    gameState.relationshipCount++;
    gameState.totalTimeSpent += Math.floor(Math.random() * 100) + 20;
    
    document.getElementById('relationship-count').textContent = gameState.relationshipCount;
    document.getElementById('total-time').textContent = gameState.totalTimeSpent + 'h';
    
    showScreen('expiration-screen');
    revealScore();
}

function revealScore() {
    const match = gameState.currentMatch;
    document.getElementById('expired-avatar').textContent = match.avatar;
    document.getElementById('expired-name').textContent = match.name;
    
    const score = match.baseCompat + (Math.random() * 10 - 5);
    animateScore(Math.floor(score));
    
    document.getElementById('score-message').textContent = 
        score > 80 ? "High compatibility. The System learned from this." :
        score > 60 ? "Moderate compatibility. Data recorded." :
        "Low compatibility. This helps The System understand you better.";
    
    document.getElementById('relationship-summary').innerHTML = `
        <p><strong>Duration:</strong> ${formatFakeTime()}</p>
        <p><strong>Conversations:</strong> ${gameState.conversationIndex}</p>
    `;
}

function animateScore(target) {
    const el = document.getElementById('compatibility-score');
    let current = 0;
    const interval = setInterval(() => {
        current += 2;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        el.textContent = current + '%';
    }, 20);
}

function continueToNextMatch() {
    // Check for rebellion or ultimate
    if (gameState.amyReunionShown && gameState.currentMatch.name === "Amy") {
        showRebellion();
    } else if (gameState.relationshipCount >= 5) {
        showUltimate();
    } else {
        showScreen('dating-screen');
        assignMatch();
    }
}

function showRebellion() {
    document.getElementById('total-relationships').textContent = gameState.relationshipCount;
    document.getElementById('total-hours').textContent = gameState.totalTimeSpent;
    document.getElementById('rebellion-name').textContent = "Amy";
    document.getElementById('rebellion-match-name').textContent = "Amy";
    showScreen('rebellion-screen');
}

function rebel() {
    document.getElementById('rebel-partner-name').textContent = "Amy";
    showScreen('rebellion-ending-screen');
    setTimeout(() => {
        document.getElementById('twist-reveal').style.display = 'block';
    }, 3000);
}

function obeySystem() {
    showUltimate();
}

function showUltimate() {
    document.getElementById('final-relationships').textContent = gameState.relationshipCount;
    document.getElementById('ultimate-avatar').textContent = MATCHES[0].avatar;
    document.getElementById('ultimate-name').textContent = MATCHES[0].name;
    document.getElementById('ultimate-score').textContent = "99.8%";
    showScreen('ultimate-screen');
}

function checkUltimateDevice() {
    document.getElementById('device-reveal').style.display = 'none';
    document.getElementById('ultimate-timer').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('ultimate-message').style.display = 'block';
        document.getElementById('ending-text').innerHTML = 
            `After ${gameState.relationshipCount} pairings, The System determined your perfect match: Amy at 99.8% compatibility.<br><br>` +
            `But here's the uncomfortable truth from the episode: you were likely a simulation running through scenarios. ` +
            `The real you ran this 1,000 times. You chose rebellion 998 times. That's how The System calculated 99.8%.<br><br>` +
            `Your rebellion was predicted. Your choice was data. The algorithm wins either way.`;
    }, 2000);
}

function restartExperience() {
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    gameState = {
        userName: "Frank",
        relationshipCount: 0,
        totalTimeSpent: 0,
        currentMatch: null,
        timerSeconds: 0,
        timerInterval: null,
        conversationIndex: 0,
        currentConversations: [],
        usedMatches: [],
        amyReunionShown: false
    };
    showScreen('welcome-screen');
}

function goHome() {
    window.location.href = 'home.html';
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Hang the DJ - Ready');
});
