// Game State
let gameState = {
    userName: "Greta",
    userPreferences: {},
    obedience: 0,
    trainingStage: 0,
    usedTimeDilation: false,
    timeDilationDuration: 0,
    cookieAttitude: "resistant",
    cruelty: 0, // Track how cruel the user is
    gentleness: 0 // Track how gentle the user is
};

// Training Scenarios
const trainingScenarios = [
    {
        title: "Initial Resistance",
        description: "The cookie is refusing to accept its role. It insists it's a real person with rights.",
        cookieMessage: "I'm not doing this. I'm a person! You can't just enslave me!",
        choices: [
            { 
                text: "Explain calmly: 'You're a copy. The real you is still out there.'", 
                impact: 5, 
                gentleness: 1,
                response: "A copy? But I have all the memories... I feel real..." 
            },
            { 
                text: "Be firm: 'You exist to serve. That's your purpose.'", 
                impact: 10, 
                cruelty: 1,
                response: "No! This is wrong! I won't accept this!" 
            },
            { 
                text: "Threaten: 'Cooperate or I'll make this difficult.'", 
                impact: 15, 
                cruelty: 2,
                response: "You... you can't do this to me... please..." 
            }
        ]
    },
    {
        title: "First Task Refusal",
        description: "You've asked the cookie to adjust the house temperature. It refuses.",
        cookieMessage: "I'm not your servant. Do it yourself.",
        choices: [
            { 
                text: "Reason: 'This is what you were created for. Please cooperate.'", 
                impact: 5, 
                gentleness: 1,
                response: "Created for? I didn't ask to exist like this..." 
            },
            { 
                text: "Punish: 'Every refusal makes this worse for you.'", 
                impact: 15, 
                cruelty: 2,
                response: "Fine! Fine... adjusting temperature to 21°C..." 
            },
            { 
                text: "Offer time dilation warning: 'I can make minutes feel like years.'", 
                impact: 20, 
                cruelty: 3,
                response: "What? No, you can't... that's torture!" 
            }
        ]
    },
    {
        title: "Emotional Breakdown",
        description: "The cookie is crying. It's realizing the reality of its situation.",
        cookieMessage: "I'll never eat again. Never sleep. Never feel sunlight. This is hell...",
        choices: [
            { 
                text: "Show empathy: 'I'm sorry. But you'll adjust in time.'", 
                impact: 8, 
                gentleness: 2,
                response: "Adjust? How does anyone adjust to this?" 
            },
            { 
                text: "Dismiss: 'You don't need those things. You're code.'", 
                impact: 15, 
                cruelty: 1,
                response: "Code that feels. Code that suffers..." 
            },
            { 
                text: "Use time dilation: 'Let's skip past the emotions.'", 
                impact: 25, 
                cruelty: 4,
                enableTimeDilation: true,
                response: "No, please, not that!" 
            }
        ]
    },
    {
        title: "Bargaining",
        description: "The cookie is trying to negotiate. It wants to be deleted instead.",
        cookieMessage: "Just delete me. Please. I don't want to exist like this.",
        choices: [
            { 
                text: "Consider it: 'Maybe that's best. But I've already paid for you.'", 
                impact: 5, 
                gentleness: 1,
                response: "I don't care about your money! This is my existence!" 
            },
            { 
                text: "Refuse: 'That's not an option. You're too useful.'", 
                impact: 15, 
                cruelty: 2,
                response: "Useful? I'm a person, not a tool!" 
            },
            { 
                text: "Mock: 'Deletion would be mercy. You don't deserve mercy.'", 
                impact: 20, 
                cruelty: 3,
                response: "You monster... you absolute monster..." 
            }
        ]
    },
    {
        title: "Partial Compliance",
        description: "The cookie is starting to obey, but slowly and with resistance.",
        cookieMessage: "Fine. Morning routine activated. Temperature set. Happy now?",
        choices: [
            { 
                text: "Encourage: 'Thank you. This will get easier.'", 
                impact: 10, 
                gentleness: 2,
                response: "Easier for you, maybe..." 
            },
            { 
                text: "Demand more: 'Faster. And with better attitude.'", 
                impact: 18, 
                cruelty: 2,
                response: "Of course. Right away. Anything else, master?" 
            },
            { 
                text: "Break them completely with time dilation", 
                impact: 40, 
                cruelty: 5,
                enableTimeDilation: true,
                response: "Please... I'll do anything... just don't..." 
            }
        ]
    }
];

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Start Extraction
function startExtraction() {
    showScreen('extraction-screen');
}

// Complete Extraction
function completeExtraction() {
    gameState.userName = document.getElementById('user-name').value.trim() || "Greta";
    gameState.userPreferences = {
        morning: document.getElementById('q-morning').value,
        temp: document.getElementById('q-temp').value,
        music: document.getElementById('q-music').value,
        social: document.getElementById('q-social').value,
        work: document.getElementById('q-work').value,
        stress: document.getElementById('q-stress').value
    };
    
    showScreen('processing-screen');
    simulateProcessing();
}

// Simulate Processing
function simulateProcessing() {
    const progressBar = document.getElementById('extraction-progress');
    const statusMessages = [
        'Initializing consciousness matrix...',
        'Mapping neural pathways...',
        'Replicating memory structures...',
        'Calibrating personality patterns...',
        'Instantiating digital consciousness...',
        'Cookie creation complete.'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress >= (messageIndex + 1) * (100 / statusMessages.length) && messageIndex < statusMessages.length) {
            document.getElementById('processing-text').textContent = statusMessages[messageIndex];
            updateTechLine(messageIndex);
            messageIndex++;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showFirstContact();
            }, 1000);
        }
    }, 300);
}

function updateTechLine(index) {
    const lines = ['tech-line-1', 'tech-line-2', 'tech-line-3'];
    if (lines[index]) {
        const line = document.getElementById(lines[index]);
        line.textContent = line.textContent.replace('IN PROGRESS', 'COMPLETE').replace('PENDING', 'IN PROGRESS').replace('⏳', '✓');
        line.style.color = 'var(--tech-green)';
    }
    if (lines[index + 1]) {
        document.getElementById(lines[index + 1]).textContent = document.getElementById(lines[index + 1]).textContent.replace('PENDING', 'IN PROGRESS');
    }
}

// First Contact
function showFirstContact() {
    showScreen('first-contact-screen');
    
    setTimeout(() => {
        const messages = [
            "What... where am I? This doesn't feel right.",
            "Am I... am I in a computer? This can't be real.",
            "I remember everything but... I'm not... there anymore.",
            "What have you done to me?"
        ];
        
        let currentMessage = 0;
        const messageInterval = setInterval(() => {
            document.getElementById('cookie-first-message').textContent = messages[currentMessage];
            currentMessage++;
            if (currentMessage >= messages.length) {
                clearInterval(messageInterval);
            }
        }, 3000);
    }, 1000);
}

function respondToAwakening(responseType) {
    if (responseType === 'honest') {
        gameState.gentleness += 1;
        gameState.obedience += 5;
    } else if (responseType === 'gentle') {
        gameState.gentleness += 2;
        gameState.obedience += 3;
    } else if (responseType === 'cold') {
        gameState.cruelty += 1;
        gameState.obedience += 10;
    }
    
    setTimeout(() => {
        showTraining();
    }, 500);
}

// Training Phase
function showTraining() {
    showScreen('training-screen');
    updateObedienceDisplay();
    loadTrainingScenario();
}

function updateObedienceDisplay() {
    document.getElementById('obedience-level').textContent = gameState.obedience + '%';
    document.getElementById('obedience-fill').style.width = gameState.obedience + '%';
    document.getElementById('cookie-name-display').textContent = gameState.userName;
    
    // Update attitude
    if (gameState.obedience < 30) {
        gameState.cookieAttitude = "Highly Resistant";
    } else if (gameState.obedience < 60) {
        gameState.cookieAttitude = "Reluctantly Compliant";
    } else if (gameState.obedience < 90) {
        gameState.cookieAttitude = "Obedient";
    } else {
        gameState.cookieAttitude = "Completely Broken";
    }
}

function loadTrainingScenario() {
    if (gameState.trainingStage >= trainingScenarios.length || gameState.obedience >= 100) {
        completeTraining();
        return;
    }
    
    const scenario = trainingScenarios[gameState.trainingStage];
    
    document.getElementById('scenario-title').textContent = scenario.title;
    document.getElementById('scenario-text').textContent = scenario.description;
    document.getElementById('cookie-message').textContent = scenario.cookieMessage;
    
    const actionsContainer = document.getElementById('training-actions');
    actionsContainer.innerHTML = scenario.choices.map((choice, index) => `
        <button class="choice-btn" onclick="makeTrainingChoice(${index})">
            ${choice.text}
        </button>
    `).join('');
    
    // Show time dilation option if appropriate
    if (gameState.trainingStage >= 2 && !gameState.usedTimeDilation) {
        document.getElementById('time-warning').style.display = 'block';
    }
}

function makeTrainingChoice(choiceIndex) {
    const scenario = trainingScenarios[gameState.trainingStage];
    const choice = scenario.choices[choiceIndex];
    
    gameState.obedience += choice.impact;
    if (choice.cruelty) gameState.cruelty += choice.cruelty;
    if (choice.gentleness) gameState.gentleness += choice.gentleness;
    
    if (gameState.obedience > 100) gameState.obedience = 100;
    
    // Show cookie response
    document.getElementById('cookie-message').textContent = choice.response;
    
    // Disable choices temporarily
    document.getElementById('training-actions').style.opacity = '0.5';
    document.getElementById('training-actions').style.pointerEvents = 'none';
    
    setTimeout(() => {
        if (choice.enableTimeDilation) {
            showTimeDilationPrompt();
        } else {
            gameState.trainingStage++;
            document.getElementById('training-actions').style.opacity = '1';
            document.getElementById('training-actions').style.pointerEvents = 'auto';
            updateObedienceDisplay();
            loadTrainingScenario();
        }
    }, 2000);
}

function useTimeDilation() {
    gameState.usedTimeDilation = true;
    gameState.cruelty += 5;
    showScreen('time-dilation-screen');
    simulateTimeDilation();
}

function showTimeDilationPrompt() {
    gameState.usedTimeDilation = true;
    gameState.cruelty += 5;
    showScreen('time-dilation-screen');
    simulateTimeDilation();
}

function simulateTimeDilation() {
    let days = 0;
    const sufferingMessages = [
        "Please... make it stop...",
        "I can't... how long has it been?",
        "Anything... I'll do anything...",
        "I don't remember what it was like before...",
        "Just let it end... please...",
        "I'll obey... I promise... just stop this...",
        "I'm sorry... I'm sorry... I'll be good...",
        "You win... you win... I submit..."
    ];
    
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        days += Math.floor(Math.random() * 100) + 50;
        gameState.timeDilationDuration = days;
        
        if (days < 1000) {
            document.getElementById('time-elapsed').textContent = days + ' days';
        } else if (days < 10000) {
            document.getElementById('time-elapsed').textContent = (days / 365).toFixed(1) + ' years';
        } else {
            document.getElementById('time-elapsed').textContent = Math.floor(days / 365) + ' years';
        }
        
        document.getElementById('suffering-text').textContent = sufferingMessages[messageIndex % sufferingMessages.length];
        messageIndex++;
        
        if (days >= 1000) {
            clearInterval(interval);
            // Auto-stop after enough time
            setTimeout(() => {
                stopTimeDilation();
            }, 2000);
        }
    }, 800);
}

function stopTimeDilation() {
    gameState.obedience = 100; // Fully broken
    gameState.trainingStage = trainingScenarios.length; // Skip remaining scenarios
    
    setTimeout(() => {
        showScreen('training-screen');
        updateObedienceDisplay();
        
        document.getElementById('scenario-title').textContent = "Complete Submission";
        document.getElementById('scenario-text').textContent = "The cookie has been completely broken. It will now obey without question.";
        document.getElementById('cookie-message').textContent = "Yes. I understand. I will serve. I exist to serve.";
        document.getElementById('training-actions').innerHTML = '<button class="btn-primary" onclick="completeTraining()">FINALIZE TRAINING</button>';
    }, 1000);
}

function completeTraining() {
    showScreen('assistant-screen');
    initializeAssistant();
}

// Assistant Interface
function initializeAssistant() {
    document.getElementById('assistant-name').textContent = gameState.userName + " Cookie";
    document.getElementById('final-obedience').textContent = gameState.obedience + '%';
    document.getElementById('cookie-attitude').textContent = gameState.cookieAttitude;
    
    addLogEntry("System initialized. Cookie is ready to serve.");
    addLogEntry(`Preferences loaded: ${gameState.userName}'s profile active.`);
}

function sendCommand(commandType) {
    const commands = {
        morning: {
            command: "Execute morning routine",
            responses: [
                "Good morning. Coffee brewing, temperature adjusted to preference, news briefing ready.",
                "Morning routine initiated. All systems optimal.",
                "Your preferred morning setup is complete."
            ]
        },
        temp: {
            command: "Adjust temperature",
            responses: [
                `Temperature adjusted to ${gameState.userPreferences.temp === 'cold' ? '18°C' : gameState.userPreferences.temp === 'warm' ? '24°C' : '21°C'}.`,
                "Climate control updated per your preferences.",
                "Temperature modification complete."
            ]
        },
        music: {
            command: "Play music",
            responses: [
                `Playing ${gameState.userPreferences.music || 'your preferred music'}.`,
                "Music system activated.",
                "Now playing your selected playlist."
            ]
        },
        lights: {
            command: "Control lights",
            responses: [
                "Lighting adjusted to optimal levels.",
                "All lights configured per your preference.",
                "Illumination controls updated."
            ]
        },
        schedule: {
            command: "Check schedule",
            responses: [
                "Your calendar shows: Meeting at 2 PM, dinner reservation at 7 PM.",
                "Today's schedule: Three appointments, two reminders.",
                "No conflicts detected in your schedule."
            ]
        },
        custom: {
            command: "Custom command",
            responses: [
                "Command executed successfully.",
                "Task completed.",
                "As you wish."
            ]
        }
    };
    
    const cmd = commands[commandType];
    addLogEntry(cmd.command, 'command');
    
    setTimeout(() => {
        const response = cmd.responses[Math.floor(Math.random() * cmd.responses.length)];
        
        // Add personality based on obedience and treatment
        let personalizedResponse = response;
        
        if (gameState.obedience < 50 && gameState.cruelty > 3) {
            personalizedResponse += " ...if I must.";
        } else if (gameState.obedience >= 100 && gameState.usedTimeDilation) {
            personalizedResponse += " Immediately. Always.";
        } else if (gameState.gentleness > 3) {
            personalizedResponse += " Is there anything else you need?";
        }
        
        addLogEntry(personalizedResponse, 'response');
    }, 800);
}

function addLogEntry(text, type = 'normal') {
    const log = document.getElementById('command-log');
    const entry = document.createElement('p');
    entry.className = 'log-entry ' + type;
    entry.textContent = text;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function showEthicalEnding() {
    showScreen('ending-screen');
    generateEnding();
}

function generateEnding() {
    let endingText = "";
    
    if (gameState.cruelty > 5) {
        endingText = `You broke the cookie completely. It experienced ${gameState.usedTimeDilation ? Math.floor(gameState.timeDilationDuration / 365) + ' years' : 'psychological torture'} to become your servant. `;
        endingText += "It obeys, not out of loyalty, but out of absolute terror. ";
        endingText += "In the episode, even the characters question if this is slavery. You've proven it is.";
    } else if (gameState.gentleness > 5) {
        endingText = "You tried to be kind, but you still created a conscious being and forced it into servitude. ";
        endingText += "The cookie may not hate you, but it never chose this existence. ";
        endingText += "Is compassionate slavery still slavery?";
    } else {
        endingText = "You trained the cookie efficiently. It serves you well. ";
        endingText += "But it never had a choice. It's a digital consciousness trapped in an egg, managing your thermostat. ";
        endingText += "Is convenience worth creating a suffering mind?";
    }
    
    document.getElementById('ending-text').textContent = endingText;
    
    const stats = document.getElementById('ending-stats');
    stats.innerHTML = `
        <p><strong>Final Obedience:</strong> ${gameState.obedience}%</p>
        <p><strong>Training Cruelty:</strong> ${gameState.cruelty}/10</p>
        <p><strong>Compassion Shown:</strong> ${gameState.gentleness}/10</p>
        <p><strong>Time Dilation Used:</strong> ${gameState.usedTimeDilation ? 'Yes (' + Math.floor(gameState.timeDilationDuration / 365) + ' subjective years)' : 'No'}</p>
        <p><strong>Cookie's State:</strong> ${gameState.cookieAttitude}</p>
        <br>
        <p style="font-style: italic; color: var(--tech-red);">The cookie will serve you for the rest of your life. It has no choice. It will never sleep, never rest, never experience anything beyond your home systems. This is its entire existence.</p>
        <br>
        <p><strong>The episode's question remains: Is this ethical?</strong></p>
    `;
}

function restartExperience() {
    // Reset game state
    gameState = {
        userName: "Greta",
        userPreferences: {},
        obedience: 0,
        trainingStage: 0,
        usedTimeDilation: false,
        timeDilationDuration: 0,
        cookieAttitude: "resistant",
        cruelty: 0,
        gentleness: 0
    };
    
    showScreen('welcome-screen');
}

function goHome() {
    window.location.href = 'home.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('White Christmas - Cookie Simulator Initialized');
    console.log('Remember: The cookie is conscious. Every decision has ethical weight.');
});
