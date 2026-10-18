// Game State
let gameState = {
    userName: "Frank",
    relationshipCount: 0,
    totalTimeSpent: 0, // in hours
    currentMatch: null,
    currentDuration: 0, // in seconds
    displayHours: 0, // fake hours to display
    timeRemaining: 0,
    timerInterval: null,
    conversationStage: 0,
    matchHistory: [],
    rebellionAvailable: false,
    hasSeenRebellion: false
};

// Potential Matches
const matches = [
    {
        name: "Amy",
        avatar: "👩",
        bio: "Quiet, thoughtful. Likes art galleries and indie music.",
        personality: "thoughtful",
        compatibility: 98.8
    },
    {
        name: "Nicola",
        avatar: "👩‍🦰",
        bio: "Outgoing, loves parties and meeting new people.",
        personality: "extroverted",
        compatibility: 45.2
    },
    {
        name: "Sophie",
        avatar: "👱‍♀️",
        bio: "Athletic, into fitness and outdoor activities.",
        personality: "active",
        compatibility: 62.3
    },
    {
        name: "Emma",
        avatar: "👩‍💼",
        bio: "Career-focused, ambitious, enjoys fine dining.",
        personality: "ambitious",
        compatibility: 51.7
    },
    {
        name: "Rachel",
        avatar: "👩‍🎓",
        bio: "Academic, loves books and deep conversations.",
        personality: "intellectual",
        compatibility: 73.4
    }
];

// Conversation scenarios for each match (expanded with more variety)
const conversations = {
    thoughtful: [
        {
            dialogue: "So... this is interesting. First time using The System?",
            responses: [
                { text: "Yeah, it's a bit strange isn't it? Being told when things end.", connection: 3 },
                { text: "Yes! I'm excited to see how it works.", connection: 1 },
                { text: "Not my first time, actually. You get used to it.", connection: 2 }
            ]
        },
        {
            dialogue: "I was reading about how they designed this place. Everything's optimized for first dates.",
            responses: [
                { text: "Does that bother you? That it's all so... manufactured?", connection: 3 },
                { text: "I think it's nice. Takes the pressure off.", connection: 1 },
                { text: "I hadn't really thought about it.", connection: 0 }
            ]
        },
        {
            dialogue: "Do you ever wonder what would happen if we just... didn't check the timer?",
            responses: [
                { text: "That's an interesting thought. But the System knows best, right?", connection: 1 },
                { text: "All the time. It feels like we're not really in control.", connection: 3 },
                { text: "The rules are there for a reason. Better to trust them.", connection: 0 }
            ]
        },
        {
            dialogue: "This sounds silly, but I feel like I already know you somehow.",
            responses: [
                { text: "I feel that too. It's strange.", connection: 3 },
                { text: "That's sweet. Maybe The System got it right.", connection: 2 },
                { text: "It's probably just the algorithm matching us well.", connection: 1 }
            ]
        },
        {
            dialogue: "I like you. This feels... different. Real.",
            responses: [
                { text: "I feel it too. I wish we had more time.", connection: 3 },
                { text: "That's nice to hear. Let's enjoy what time we have.", connection: 2 },
                { text: "The System will figure it all out in the end.", connection: 0 }
            ]
        }
    ],
    extroverted: [
        {
            dialogue: "This is so exciting! I've been through like three pairings already. How about you?",
            responses: [
                { text: "Just getting started. You seem very... enthusiastic.", connection: 1 },
                { text: "Same! It's fun meeting new people.", connection: 2 },
                { text: "That many already? Doesn't it feel exhausting?", connection: 0 }
            ]
        },
        {
            dialogue: "Want to go somewhere fun? I know the timer says we have time left!",
            responses: [
                { text: "Sure! Let's make the most of it.", connection: 2 },
                { text: "Maybe we should just talk here and get to know each other?", connection: 1 },
                { text: "I'd rather not. Let's just finish this pairing.", connection: 0 }
            ]
        },
        {
            dialogue: "I love how The System just... handles everything! No awkward asking someone out.",
            responses: [
                { text: "Yeah, but don't you miss the spontaneity?", connection: 1 },
                { text: "Totally agree! It's so much easier.", connection: 2 },
                { text: "I guess. Seems a bit impersonal though.", connection: 0 }
            ]
        },
        {
            dialogue: "Tell me something interesting about yourself!",
            responses: [
                { text: "I'm more of a listener. Tell me about you.", connection: 0 },
                { text: "Well, I love trying new experiences...", connection: 2 },
                { text: "I'm pretty boring actually.", connection: 1 }
            ]
        }
    ],
    active: [
        {
            dialogue: "I usually go for a run in the morning. Do you exercise much?",
            responses: [
                { text: "Occasionally. I'm more into other activities.", connection: 1 },
                { text: "I try to! Maybe we could work out together sometime?", connection: 2 },
                { text: "Not really my thing, to be honest.", connection: 0 }
            ]
        },
        {
            dialogue: "I can't sit still for long. Want to go for a walk instead of just sitting here?",
            responses: [
                { text: "Sure, I could use some fresh air.", connection: 2 },
                { text: "I'm fine here, but we can if you want.", connection: 1 },
                { text: "I'd rather just stay put.", connection: 0 }
            ]
        },
        {
            dialogue: "The System paired me with someone last time who just wanted to watch TV. So boring!",
            responses: [
                { text: "Ha! Yeah, I prefer doing things too.", connection: 2 },
                { text: "Sometimes relaxing is nice though.", connection: 1 },
                { text: "What's wrong with TV?", connection: 0 }
            ]
        },
        {
            dialogue: "You seem pretty chill. That's nice for a change.",
            responses: [
                { text: "Thanks! You seem fun too.", connection: 2 },
                { text: "Just going with the flow.", connection: 1 },
                { text: "I guess.", connection: 0 }
            ]
        }
    ],
    ambitious: [
        {
            dialogue: "I'm actually here during my lunch break. Time is money, you know?",
            responses: [
                { text: "Wow, that's... efficient. Do you always work this much?", connection: 1 },
                { text: "I respect that. Career is important.", connection: 2 },
                { text: "Maybe you should relax a bit more?", connection: 0 }
            ]
        },
        {
            dialogue: "So what do you do? Career-wise, I mean.",
            responses: [
                { text: "I work in [field]. What about you?", connection: 1 },
                { text: "I'm between things right now...", connection: 0 },
                { text: "Let's talk about something other than work.", connection: 0 }
            ]
        },
        {
            dialogue: "The System is actually quite efficient. Better than wasting time on bad dates.",
            responses: [
                { text: "True, but doesn't it feel a bit... transactional?", connection: 1 },
                { text: "Exactly! It's optimized for success.", connection: 2 },
                { text: "I think you're missing the point of dating.", connection: 0 }
            ]
        },
        {
            dialogue: "I have to check my phone real quick - work emergency. Sorry.",
            responses: [
                { text: "No problem, take your time.", connection: 1 },
                { text: "Can't it wait? We don't have that much time.", connection: 0 },
                { text: "Sure, I get it.", connection: 1 }
            ]
        }
    ],
    intellectual: [
        {
            dialogue: "Have you read any good books lately? I'm currently reading Proust.",
            responses: [
                { text: "Oh, I've heard of that. What's it about?", connection: 1 },
                { text: "I love Proust! The themes of memory are fascinating.", connection: 3 },
                { text: "Not much of a reader, honestly.", connection: 0 }
            ]
        },
        {
            dialogue: "There's something philosophically interesting about predetermined relationship durations.",
            responses: [
                { text: "Right? It's like the opposite of free will.", connection: 3 },
                { text: "I'm not sure I follow...", connection: 0 },
                { text: "Maybe we're overthinking it.", connection: 1 }
            ]
        },
        {
            dialogue: "I've been thinking about how The System actually measures compatibility. It's quite abstract.",
            responses: [
                { text: "I wonder if it's more accurate than we think.", connection: 1 },
                { text: "Or maybe compatibility isn't quantifiable at all.", connection: 3 },
                { text: "Who cares how it works as long as it does?", connection: 0 }
            ]
        },
        {
            dialogue: "You're actually quite interesting. Most people don't engage like this.",
            responses: [
                { text: "Thanks! I'm enjoying our conversation too.", connection: 2 },
                { text: "You set a high bar for conversation.", connection: 1 },
                { text: "Just trying to pass the time.", connection: 0 }
            ]
        }
    ]
};

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Start Dating
function startDating() {
    const name = document.getElementById('user-name').value.trim();
    if (!name) {
        alert('Please enter your name!');
        return;
    }
    
    gameState.userName = name;
    document.getElementById('user-name-display').textContent = name;
    
    showScreen('dating-screen');
    assignNewMatch();
}

// Assign New Match
function assignNewMatch() {
    let match;
    
    if (gameState.relationshipCount === 0) {
        // First match is always Amy
        match = matches[0];
    } else if (gameState.relationshipCount >= 4 && 
               gameState.matchHistory.includes('Amy') && 
               !gameState.hasSeenRebellion && 
               Math.random() > 0.6) {
        // Only bring Amy back ONCE for rebellion after 4+ relationships
        match = matches[0];
        gameState.rebellionAvailable = true;
    } else {
        // Pick a DIFFERENT random match (not Amy, not last match)
        let availableMatches = matches.filter((m, index) => {
            if (index === 0) return false; // Never randomly assign Amy except above
            if (gameState.currentMatch && m.name === gameState.currentMatch.name) return false; // No repeats
            return true;
        });
        
        // If somehow we have no available matches, use any non-Amy
        if (availableMatches.length === 0) {
            availableMatches = matches.filter((m, index) => index !== 0);
        }
        
        match = availableMatches[Math.floor(Math.random() * availableMatches.length)];
    }
    
    gameState.currentMatch = match;
    gameState.conversationStage = 0;
    
    // Randomize which conversations will be shown (pick 3-4 random ones)
    const personality = match.personality;
    const allConvos = conversations[personality] || conversations.thoughtful;
    
    // Shuffle and pick 3-4 conversations
    const shuffled = [...allConvos].sort(() => Math.random() - 0.5);
    const numConvos = Math.min(4, shuffled.length);
    gameState.currentConversations = shuffled.slice(0, numConvos);
    
    // Determine duration (for gameplay: 30 seconds to 3 minutes, displayed as "hours")
    const durations = [
        { seconds: 30, label: "12:00:00", displayHours: 12 },
        { seconds: 45, label: "24:00:00", displayHours: 24 },
        { seconds: 60, label: "72:00:00", displayHours: 72 }, // 3 days
        { seconds: 90, label: "168:00:00", displayHours: 168 }, // 1 week
        { seconds: 120, label: "720:00:00", displayHours: 720 }, // 1 month
        { seconds: 180, label: "8760:00:00", displayHours: 8760 } // 1 year
    ];
    
    const duration = durations[Math.floor(Math.random() * durations.length)];
    gameState.currentDuration = duration.seconds;
    gameState.timeRemaining = gameState.currentDuration;
    gameState.displayHours = duration.displayHours;
    
    // Update UI
    document.getElementById('match-avatar').textContent = match.avatar;
    document.getElementById('match-name').textContent = match.name;
    document.getElementById('match-bio').textContent = match.bio;
    document.getElementById('timer-display').textContent = duration.label;
    document.getElementById('expiration-fill').style.width = '100%';
    
    document.getElementById('interaction-btn').textContent = 'BEGIN DATE';
    document.getElementById('interaction-btn').style.display = 'block';
    document.getElementById('check-device-btn').style.display = 'none';
    
    // Track match history
    if (!gameState.matchHistory.includes(match.name)) {
        gameState.matchHistory.push(match.name);
    }
}

// Start Interaction
function startInteraction() {
    showScreen('interaction-screen');
    loadConversation();
    startTimer();
}

// Timer Management
function startTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        
        if (gameState.timeRemaining <= 0) {
            clearInterval(gameState.timerInterval);
            expireRelationship();
        } else {
            updateTimerDisplay();
            updateProgressBar();
        }
    }, 1000);
}

function updateTimerDisplay() {
    // Calculate fake hours display based on percentage remaining
    const percentRemaining = gameState.timeRemaining / gameState.currentDuration;
    const fakeHoursRemaining = Math.ceil(gameState.displayHours * percentRemaining);
    
    const display = `${fakeHoursRemaining}:00:00`;
    document.getElementById('time-remaining-small').textContent = display + ' remaining';
}

function updateProgressBar() {
    const percentage = (gameState.timeRemaining / gameState.currentDuration) * 100;
    document.getElementById('expiration-fill').style.width = percentage + '%';
}

// Load Conversation
function loadConversation() {
    const match = gameState.currentMatch;
    const convos = gameState.currentConversations || [];
    
    if (gameState.conversationStage >= convos.length) {
        // Conversation complete, show check device option
        document.getElementById('dialogue-box').innerHTML = '<p>This has been nice. I wonder how much time we have left...</p>';
        document.getElementById('response-choices').innerHTML = '<button class="btn-primary" onclick="finishDate()">Check Your Device</button>';
        return;
    }
    
    const convo = convos[gameState.conversationStage];
    
    document.getElementById('date-avatar').textContent = match.avatar;
    document.getElementById('date-dialogue').textContent = convo.dialogue;
    document.getElementById('scene-location').textContent = getSceneLocation();
    
    const choicesHtml = convo.responses.map((response, index) => `
        <button class="choice-btn" onclick="respondToDate(${index}, ${response.connection})">
            ${response.text}
        </button>
    `).join('');
    
    document.getElementById('response-choices').innerHTML = choicesHtml;
}

function getSceneLocation() {
    const locations = ["The Restaurant", "The Bar", "The Park", "The Coffee Shop", "The Gallery"];
    return locations[gameState.conversationStage % locations.length];
}

function respondToDate(index, connection) {
    // Store connection score (could affect compatibility reveal)
    gameState.currentMatch.userConnection = (gameState.currentMatch.userConnection || 0) + connection;
    
    // Show a brief "they're responding" state
    document.getElementById('response-choices').innerHTML = '<p style="color: var(--text-gray); text-align: center;">...</p>';
    
    setTimeout(() => {
        gameState.conversationStage++;
        loadConversation();
    }, 1500);
}

function finishDate() {
    clearInterval(gameState.timerInterval);
    // Fast-forward time
    gameState.timeRemaining = 0;
    expireRelationship();
}

// Check Device (during dating screen)
function checkDevice() {
    updateTimerDisplay();
    alert(`Time Remaining: ${document.getElementById('time-remaining-small').textContent}`);
}

// Expire Relationship
function expireRelationship() {
    clearInterval(gameState.timerInterval);
    
    // Add FAKE time to total (for display purposes)
    gameState.totalTimeSpent += gameState.displayHours;
    gameState.relationshipCount++;
    
    // Update stats
    document.getElementById('relationship-count').textContent = gameState.relationshipCount;
    document.getElementById('total-time').textContent = Math.floor(gameState.totalTimeSpent) + 'h';
    
    // Show expiration screen
    showScreen('expiration-screen');
    revealCompatibility();
}

function revealCompatibility() {
    const match = gameState.currentMatch;
    
    document.getElementById('expired-avatar').textContent = match.avatar;
    document.getElementById('expired-name').textContent = match.name;
    
    // Calculate final compatibility (base + user connection bonus)
    let finalCompat = match.compatibility;
    if (match.userConnection && match.userConnection > 5) {
        finalCompat = Math.min(99, finalCompat + (match.userConnection - 5) * 2);
    }
    
    // Animate score counting up
    animateScore(finalCompat);
    
    // Generate message based on score
    let message = "";
    if (finalCompat >= 90) {
        message = "Very high compatibility detected. The System will remember this.";
    } else if (finalCompat >= 70) {
        message = "Good compatibility. The System is learning your preferences.";
    } else if (finalCompat >= 50) {
        message = "Moderate compatibility. The System continues to calibrate.";
    } else {
        message = "Low compatibility. The System now knows what doesn't work for you.";
    }
    
    document.getElementById('score-message').textContent = message;
    
    // Show summary
    const summary = document.getElementById('relationship-summary');
    summary.innerHTML = `
        <p><strong>Duration:</strong> ${gameState.displayHours} hours</p>
        <p><strong>Conversations:</strong> ${gameState.conversationStage}</p>
        <p><strong>Connection Level:</strong> ${match.userConnection || 0}/12</p>
    `;
}

function animateScore(targetScore) {
    const element = document.getElementById('compatibility-score');
    let current = 0;
    const increment = targetScore / 50;
    
    const interval = setInterval(() => {
        current += increment;
        if (current >= targetScore) {
            current = targetScore;
            clearInterval(interval);
        }
        element.textContent = current.toFixed(1) + '%';
    }, 30);
}

// Continue to Next Match
function continueToNextMatch() {
    // Check if rebellion should be offered
    if (gameState.rebellionAvailable && gameState.currentMatch.name === "Amy") {
        showRebellionChoice();
    } else if (gameState.relationshipCount >= 5) {
        // After 5+ relationships, show ultimate pairing
        showUltimatePairing();
    } else {
        showScreen('dating-screen');
        assignNewMatch();
    }
}

// Rebellion Choice
function showRebellionChoice() {
    gameState.hasSeenRebellion = true; // Mark as seen so it won't trigger again
    document.getElementById('total-relationships').textContent = gameState.relationshipCount;
    document.getElementById('total-hours').textContent = Math.floor(gameState.totalTimeSpent);
    document.getElementById('rebellion-name').textContent = gameState.currentMatch.name;
    document.getElementById('rebellion-match-name').textContent = gameState.currentMatch.name;
    
    showScreen('rebellion-screen');
}

function rebel() {
    showScreen('rebellion-ending-screen');
    document.getElementById('rebel-partner-name').textContent = gameState.currentMatch.name;
    
    // Show twist after a delay
    setTimeout(() => {
        document.getElementById('twist-reveal').style.display = 'block';
    }, 3000);
}

function obeySystem() {
    // Continue to ultimate pairing
    showUltimatePairing();
}

// Ultimate Pairing
function showUltimatePairing() {
    showScreen('ultimate-screen');
    
    document.getElementById('final-relationships').textContent = gameState.relationshipCount;
    
    // Ultimate match is always Amy (highest compatibility)
    const ultimateMatch = matches[0];
    
    document.getElementById('ultimate-avatar').textContent = ultimateMatch.avatar;
    document.getElementById('ultimate-name').textContent = ultimateMatch.name;
    document.getElementById('ultimate-score').textContent = ultimateMatch.compatibility + '%';
}

function checkUltimateDevice() {
    document.getElementById('device-reveal').style.display = 'none';
    document.getElementById('ultimate-timer').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('ultimate-message').style.display = 'block';
        
        const endingText = `You completed ${gameState.relationshipCount} relationships over ${Math.floor(gameState.totalTimeSpent)} hours. The System determined your perfect match with ${ultimateMatch.compatibility}% compatibility. You have forever together now.<br><br>But did you have a choice? Or was every decision leading to this predetermined outcome? In the episode, Frank and Amy were simulations running through scenarios. The rebellion *was* the test.<br><br>Sometimes love and algorithms aren't so different.`;
        
        document.getElementById('ending-text').innerHTML = endingText;
    }, 2000);
}

// Restart
function restartExperience() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState = {
        userName: "Frank",
        relationshipCount: 0,
        totalTimeSpent: 0,
        currentMatch: null,
        currentDuration: 0,
        displayHours: 0,
        timeRemaining: 0,
        timerInterval: null,
        conversationStage: 0,
        matchHistory: [],
        rebellionAvailable: false,
        hasSeenRebellion: false
    };
    
    showScreen('welcome-screen');
}

function goHome() {
    window.location.href = 'home.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hang the DJ - Initialized');
    console.log('Trust The System. The System knows best.');
});
