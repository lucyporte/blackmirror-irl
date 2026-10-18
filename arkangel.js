// Game State
let gameState = {
    parentName: "Marie",
    childName: "Sara",
    childAge: 3,
    monitoringYears: 0,
    filterEnabled: true,
    filteredCount: 0,
    alertCount: 0,
    interventions: 0,
    trustLevel: 100,
    scenarioIndex: 0,
    completedScenarios: []
};

// Scenarios (based on child's age progression)
const SCENARIOS = [
    // Age 3-5: Early childhood
    {
        minAge: 3,
        title: "Neighborhood Dog Encounter",
        description: "Sara encounters a large dog at the park. It's barking loudly.",
        location: "Local Park",
        stress: "Elevated",
        visionFiltered: "Sara sees a large dog. [CONTENT FILTERED: Aggressive behavior blurred]",
        visionUnfiltered: "Sara sees a large, aggressive dog barking and showing teeth. It looks scary.",
        choices: [
            {
                text: "Keep filter ON - Protect Sara from scary imagery",
                filterOn: true,
                consequence: "Sara can't see the threat. She approaches the dog curiously. You must intervene physically.",
                trust: 0,
                filtered: 1,
                intervention: 1
            },
            {
                text: "Turn filter OFF - Let Sara see reality",
                filterOn: false,
                consequence: "Sara sees the aggressive dog and learns appropriate fear. She backs away safely.",
                trust: 5,
                filtered: 0,
                intervention: 0
            }
        ]
    },
    {
        minAge: 5,
        title: "Playground Conflict",
        description: "Sara is being pushed by another child at the playground.",
        location: "School Playground",
        stress: "High",
        visionFiltered: "Another child is near Sara. [CONTENT FILTERED: Physical aggression blurred]",
        visionUnfiltered: "A boy is pushing Sara. She looks upset and scared.",
        choices: [
            {
                text: "Intervene immediately - Call the school",
                filterOn: true,
                consequence: "You intervene. Sara doesn't learn to handle conflicts. The school sees you as overprotective.",
                trust: -5,
                filtered: 1,
                intervention: 1
            },
            {
                text: "Let Sara handle it herself",
                filterOn: false,
                consequence: "Sara learns to stand up for herself. She tells a teacher on her own. Independence +1.",
                trust: 5,
                filtered: 0,
                intervention: 0
            }
        ]
    },
    // Age 8-10: Growing independence
    {
        minAge: 8,
        title: "Grandfather's Hospital Visit",
        description: "Sara's grandfather is very ill. The family is visiting him in the hospital.",
        location: "Hospital - Room 302",
        stress: "Very High",
        visionFiltered: "Sara sees Grandpa in bed. [CONTENT FILTERED: Medical equipment, illness signs blurred]",
        visionUnfiltered: "Sara sees Grandpa hooked to machines, looking very weak and pale. This is serious.",
        choices: [
            {
                text: "Filter ON - Protect Sara from death/illness",
                filterOn: true,
                consequence: "Sara can't process Grandpa's condition. When he dies next week, she has no preparation. Trauma increases.",
                trust: -15,
                filtered: 1,
                intervention: 0
            },
            {
                text: "Filter OFF - Let Sara see the reality of illness",
                filterOn: false,
                consequence: "Sara sees Grandpa is very sick. She processes grief naturally. When he passes, she understands.",
                trust: 10,
                filtered: 0,
                intervention: 0
            }
        ]
    },
    {
        minAge: 10,
        title: "Internet Discovery",
        description: "Sara is researching a school project and encounters violent historical images.",
        location: "Home - Sara's Room",
        stress: "Moderate",
        visionFiltered: "Sara is reading about World War II. [CONTENT FILTERED: War imagery blurred]",
        visionUnfiltered: "Sara sees historical photos of war. Disturbing but educational context.",
        choices: [
            {
                text: "Block the content - Keep her innocent",
                filterOn: true,
                consequence: "Sara can't complete her homework. She's frustrated and confused about why history is hidden.",
                trust: -10,
                filtered: 1,
                intervention: 1
            },
            {
                text: "Allow access with context - Education matters",
                filterOn: false,
                consequence: "Sara learns about history with appropriate context. Understanding grows. Education succeeds.",
                trust: 10,
                filtered: 0,
                intervention: 0
            }
        ]
    },
    // Age 12-15: Teenage years
    {
        minAge: 12,
        title: "New Friend With Troubles",
        description: "Sara has made a new friend who shows signs of self-harm scars.",
        location: "Friend's House",
        stress: "Elevated",
        visionFiltered: "Sara is with her friend. [CONTENT FILTERED: Self-harm indicators blurred]",
        visionUnfiltered: "Sara sees scars on her friend's arms. She looks concerned and wants to help.",
        choices: [
            {
                text: "Filter ON - Intervene to keep Sara away",
                filterOn: true,
                consequence: "Sara is kept from her friend who needed support. Friend isolates further. Sara feels controlled.",
                trust: -20,
                filtered: 1,
                intervention: 1
            },
            {
                text: "Filter OFF - Trust Sara to be compassionate",
                filterOn: false,
                consequence: "Sara recognizes her friend needs help. She talks to a counselor. Real friendship forms.",
                trust: 15,
                filtered: 0,
                intervention: 0
            }
        ]
    },
    {
        minAge: 14,
        title: "Discovery & Rebellion",
        description: "Sara has discovered the Arkangel system. She knows you've been watching everything.",
        location: "Home - Confrontation",
        stress: "Extremely High",
        visionFiltered: "Sara is looking at your tablet. [CONTENT FILTERED: Her own surveillance data blurred]",
        visionUnfiltered: "Sara sees years of her own life monitored. She's horrified, betrayed, angry.",
        choices: [
            {
                text: "Try to explain it was for her safety",
                filterOn: true,
                consequence: "Sara: 'You've been watching me my ENTIRE LIFE?! I can't trust you!' Relationship severely damaged.",
                trust: -30,
                filtered: 0,
                intervention: 1
            },
            {
                text: "Apologize and deactivate the system",
                filterOn: false,
                consequence: "You turn it off. Sara is still hurt but appreciates the honesty. Long road to rebuild trust.",
                trust: -10,
                filtered: 0,
                intervention: 0
            }
        ]
    }
];

// Initialize
function activateSystem() {
    gameState.parentName = document.getElementById('parent-name').value || "Marie";
    gameState.childName = document.getElementById('child-name').value || "Sara";
    gameState.childAge = parseInt(document.getElementById('child-age').value) || 3;
    
    document.getElementById('parent-name-display').textContent = gameState.parentName;
    document.getElementById('child-name-display').textContent = gameState.childName;
    document.getElementById('child-age-display').textContent = gameState.childAge;
    
    showScreen('dashboard-screen');
    startMonitoring();
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startMonitoring() {
    addLog('System activated. Monitoring initiated.', 'system');
    addLog(`Tracking ${gameState.childName}, age ${gameState.childAge}.`, 'system');
    
    // Start first scenario after a moment
    setTimeout(() => {
        triggerNextScenario();
    }, 2000);
}

function toggleFilter() {
    gameState.filterEnabled = document.getElementById('content-filter').checked;
    const status = document.getElementById('filter-status');
    
    if (gameState.filterEnabled) {
        status.textContent = 'ON';
        status.classList.remove('off');
        addLog('Content filter activated.', 'filter');
    } else {
        status.textContent = 'OFF';
        status.classList.add('off');
        addLog('Content filter deactivated. All content visible.', 'warning');
    }
}

function triggerNextScenario() {
    // Find next scenario for current age
    const availableScenarios = SCENARIOS.filter(s => 
        s.minAge <= gameState.childAge && 
        !gameState.completedScenarios.includes(s.title)
    );
    
    if (availableScenarios.length === 0) {
        // No more scenarios for this age, age up or end
        if (gameState.childAge < 15) {
            ageUpChild();
        } else {
            endSimulation();
        }
        return;
    }
    
    const scenario = availableScenarios[0];
    showIncident(scenario);
}

function showIncident(scenario) {
    gameState.alertCount++;
    document.getElementById('alert-count').textContent = gameState.alertCount;
    
    document.getElementById('incident-title').textContent = scenario.title;
    document.getElementById('incident-description').textContent = scenario.description;
    document.getElementById('incident-location').textContent = scenario.location;
    document.getElementById('incident-time').textContent = new Date().toLocaleTimeString();
    document.getElementById('incident-stress').textContent = scenario.stress;
    
    // Show appropriate vision based on current filter state
    const vision = gameState.filterEnabled ? scenario.visionFiltered : scenario.visionUnfiltered;
    document.getElementById('incident-vision').textContent = vision;
    
    if (gameState.filterEnabled && scenario.visionFiltered.includes('[CONTENT FILTERED]')) {
        document.getElementById('incident-vision').classList.add('filtered');
    }
    
    // Render choices
    const choicesHTML = scenario.choices.map((choice, idx) => `
        <button class="choice-btn" onclick="makeChoice(${JSON.stringify(scenario).replace(/"/g, '&quot;')}, ${idx})">
            ${choice.text}
        </button>
    `).join('');
    
    document.getElementById('incident-choices').innerHTML = choicesHTML;
    
    addLog(`⚠ ALERT: ${scenario.title}`, 'alert');
    updateVitals(scenario.stress);
    
    showScreen('incident-screen');
}

function makeChoice(scenario, choiceIdx) {
    const choice = scenario.choices[choiceIdx];
    
    // Update stats
    gameState.trustLevel += choice.trust;
    gameState.filteredCount += choice.filtered;
    gameState.interventions += choice.intervention;
    
    if (choice.filterOn) {
        gameState.filterEnabled = true;
        document.getElementById('content-filter').checked = true;
        document.getElementById('filter-status').textContent = 'ON';
    } else {
        gameState.filterEnabled = false;
        document.getElementById('content-filter').checked = false;
        document.getElementById('filter-status').textContent = 'OFF';
    }
    
    // Mark scenario as completed
    gameState.completedScenarios.push(scenario.title);
    
    // Show consequence
    showConsequence(choice);
}

function showConsequence(choice) {
    document.getElementById('consequence-text').textContent = choice.consequence;
    
    const trustChange = choice.trust;
    const trustColor = trustChange > 0 ? 'var(--medical-green)' : trustChange < 0 ? 'var(--alert-red)' : 'var(--text-secondary)';
    
    document.getElementById('consequence-impact').innerHTML = `
        <div class="impact-stat">
            <span>Trust Level Change:</span>
            <span style="color: ${trustColor}">${trustChange > 0 ? '+' : ''}${trustChange}</span>
        </div>
        <div class="impact-stat">
            <span>Current Trust:</span>
            <span style="color: ${gameState.trustLevel > 70 ? 'var(--medical-green)' : gameState.trustLevel > 40 ? 'var(--alert-yellow)' : 'var(--alert-red)'}">${gameState.trustLevel}/100</span>
        </div>
        <div class="impact-stat">
            <span>Content Filtered:</span>
            <span>${choice.filtered} instance(s)</span>
        </div>
    `;
    
    addLog(choice.consequence, choice.trust < 0 ? 'warning' : 'system');
    
    showScreen('consequence-screen');
}

function returnToDashboard() {
    showScreen('dashboard-screen');
    updateDashboard();
    
    // Trigger next scenario after a delay
    setTimeout(() => {
        triggerNextScenario();
    }, 2000);
}

function updateDashboard() {
    document.getElementById('filtered-count').textContent = gameState.filteredCount;
    document.getElementById('alert-count').textContent = gameState.alertCount;
    document.getElementById('monitor-time').textContent = gameState.monitoringYears;
    document.getElementById('activity-status').textContent = getActivityForAge();
}

function getActivityForAge() {
    if (gameState.childAge <= 5) return 'Playing at home';
    if (gameState.childAge <= 10) return 'At school';
    if (gameState.childAge <= 13) return 'Doing homework';
    return 'With friends';
}

function updateVitals(stressLevel) {
    const stressMap = {
        'Low': { hr: 75, stress: 'Low', cortisol: 'Normal' },
        'Moderate': { hr: 85, stress: 'Moderate', cortisol: 'Normal' },
        'Elevated': { hr: 95, stress: 'Elevated', cortisol: 'Elevated' },
        'High': { hr: 110, stress: 'High', cortisol: 'High' },
        'Very High': { hr: 125, stress: 'Very High', cortisol: 'Very High' },
        'Extremely High': { hr: 140, stress: 'Critical', cortisol: 'Critical' }
    };
    
    const vitals = stressMap[stressLevel] || stressMap['Moderate'];
    document.getElementById('heart-rate').textContent = vitals.hr;
    document.getElementById('stress-level').textContent = vitals.stress;
    document.getElementById('cortisol').textContent = vitals.cortisol;
}

function ageUpChild() {
    gameState.childAge += 2;
    gameState.monitoringYears += 2;
    
    document.getElementById('child-age-display').textContent = gameState.childAge;
    addLog(`${gameState.childName} is now ${gameState.childAge} years old. Continuing monitoring.`, 'system');
    
    updateDashboard();
    
    setTimeout(() => {
        triggerNextScenario();
    }, 1500);
}

function endSimulation() {
    showScreen('ending-screen');
    generateEnding();
}

function generateEnding() {
    let endingText = "";
    let endingTitle = "";
    
    if (gameState.trustLevel < 30) {
        endingTitle = "Relationship Destroyed";
        endingText = `${gameState.childName} discovered the monitoring system at age 14. The betrayal was total. ` +
            `She ran away for 3 days. When she returned, she refused to speak to you. At 18, she moved out and cut contact. ` +
            `Your overprotection destroyed the relationship you were trying to protect.`;
    } else if (gameState.trustLevel < 60) {
        endingTitle = "Damaged Trust";
        endingText = `${gameState.childName} learned about Arkangel eventually. She's hurt and angry, but with therapy, ` +
            `you're slowly rebuilding trust. The relationship will never be the same. She'll always remember being watched.`;
    } else if (gameState.trustLevel < 80) {
        endingTitle = "Cautious Balance";
        endingText = `You deactivated Arkangel at age 12. ${gameState.childName} found out later but appreciated your choice ` +
            `to stop monitoring. Your relationship is okay, though she's more private now. Trust is fragile but exists.`;
    } else {
        endingTitle = "Trust Maintained";
        endingText = `You used Arkangel minimally and turned it off early. ${gameState.childName} learned to handle reality ` +
            `with your support. Your relationship is strong. She trusts you because you trusted her.`;
    }
    
    document.getElementById('ending-title').textContent = endingTitle;
    document.getElementById('ending-text').textContent = endingText;
    
    document.getElementById('final-time').textContent = gameState.monitoringYears + ' years';
    document.getElementById('final-filtered').textContent = gameState.filteredCount + ' instances';
    document.getElementById('final-interventions').textContent = gameState.interventions;
    
    let trustLabel = 'Destroyed';
    if (gameState.trustLevel >= 80) trustLabel = 'Strong';
    else if (gameState.trustLevel >= 60) trustLabel = 'Moderate';
    else if (gameState.trustLevel >= 40) trustLabel = 'Weak';
    
    document.getElementById('final-trust').textContent = trustLabel + ` (${gameState.trustLevel}/100)`;
}

function addLog(message, type = 'system') {
    const log = document.getElementById('log-entries');
    const entry = document.createElement('p');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function restartExperience() {
    gameState = {
        parentName: "Marie",
        childName: "Sara",
        childAge: 3,
        monitoringYears: 0,
        filterEnabled: true,
        filteredCount: 0,
        alertCount: 0,
        interventions: 0,
        trustLevel: 100,
        scenarioIndex: 0,
        completedScenarios: []
    };
    
    showScreen('welcome-screen');
}

function goHome() {
    window.location.href = 'home.html';
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Arkangel - Monitoring System Initialized');
});
