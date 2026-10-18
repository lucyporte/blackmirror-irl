// Global state
let personName = "";
let messageData = "";
let conversationHistory = [];
let messageCount = 0;
let currentTier = "text";

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Stage 1: Welcome Screen
function startService() {
    showScreen('data-upload');
}

// Stage 2: Data Upload
document.getElementById('messages')?.addEventListener('input', function() {
    const text = this.value;
    const charCount = text.length;
    document.getElementById('char-count').textContent = charCount;
    
    // Calculate fake "accuracy" based on amount of data
    let accuracy = 0;
    if (charCount > 50) accuracy = 15;
    if (charCount > 200) accuracy = 35;
    if (charCount > 500) accuracy = 55;
    if (charCount > 1000) accuracy = 75;
    if (charCount > 2000) accuracy = 90;
    
    document.getElementById('accuracy').textContent = accuracy + '%';
});

function processData() {
    personName = document.getElementById('person-name').value.trim();
    messageData = document.getElementById('messages').value.trim();
    
    if (!personName || !messageData) {
        alert('Please provide both a name and message data.');
        return;
    }
    
    // Move to processing screen
    showScreen('processing');
    simulateProcessing();
}

// Stage 3: Processing Simulation
function simulateProcessing() {
    const progressBar = document.getElementById('progress-fill');
    const statusText = document.getElementById('processing-status');
    const statuses = [
        'Analyzing linguistic patterns...',
        'Extracting personality markers...',
        'Building conversational model...',
        'Synthesizing emotional responses...',
        'Calibrating memory matrix...',
        'Finalizing reconstruction...'
    ];
    
    let progress = 0;
    let statusIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress >= (statusIndex + 1) * (100 / statuses.length) && statusIndex < statuses.length) {
            statusText.textContent = statuses[statusIndex];
            updateReadoutLine(statusIndex);
            statusIndex++;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                initializeChat();
            }, 1000);
        }
    }, 300);
}

function updateReadoutLine(index) {
    const lines = document.querySelectorAll('.readout-line span');
    if (lines[index]) {
        lines[index].className = 'success';
        lines[index].textContent = 'COMPLETE';
    }
    if (lines[index + 1]) {
        lines[index + 1].className = 'loading';
        lines[index + 1].textContent = 'IN PROGRESS';
    }
}

// Stage 4: Chat Interface
function initializeChat() {
    showScreen('chat-interface');
    document.getElementById('person-name-display').textContent = personName;
    document.getElementById('name-in-chat').textContent = personName;
    
    // Initial AI greeting
    setTimeout(() => {
        addAIMessage(getGreeting());
    }, 500);
}

function getGreeting() {
    const greetings = [
        `Hey... it's me. Well, sort of me.`,
        `Hi there. This feels strange, doesn't it?`,
        `Hello. I know this must be weird for you.`,
        `Hey. I'm here now. Sort of.`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    input.value = '';
    
    // Simulate AI thinking
    setTimeout(() => {
        const response = generateAIResponse(message);
        addAIMessage(response);
        messageCount++;
        
        // Show upgrade prompt after a few messages
        if (messageCount === 5) {
            document.getElementById('upgrade-prompt').style.display = 'block';
        }
    }, 1000 + Math.random() * 1500);
}

function addUserMessage(text) {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-sender">You</div>
        <div class="message-text">${escapeHtml(text)}</div>
    `;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    conversationHistory.push({ sender: 'user', text: text });
}

function addAIMessage(text) {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    messageDiv.innerHTML = `
        <div class="message-sender">${personName} (AI)</div>
        <div class="message-text">${escapeHtml(text)}</div>
    `;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    conversationHistory.push({ sender: 'ai', text: text });
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Analyze user's input data to extract patterns
    const lowerData = messageData.toLowerCase();
    
    // Emotional/relationship responses
    if (lowerMessage.includes('miss') || lowerMessage.includes('love')) {
        return getEmotionalResponse();
    }
    
    // Questions about being AI
    if (lowerMessage.includes('real') || lowerMessage.includes('are you')) {
        return getExistentialResponse();
    }
    
    // Questions about memories
    if (lowerMessage.includes('remember') || lowerMessage.includes('memory')) {
        return getMemoryResponse();
    }
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey)/)) {
        return getGreeting();
    }
    
    // Try to mimic patterns from provided data
    if (lowerData.includes('love you')) {
        return `I... I think I love you too. That's what the data tells me, anyway.`;
    }
    
    // Default responses based on message count (showing limitation)
    return getDefaultResponse();
}

function getEmotionalResponse() {
    const responses = [
        `I wish I could feel that the way I used to. Or... the way they used to.`,
        `The data suggests I should say I miss you too. And I do. I think.`,
        `I'm here now. Isn't that what matters?`,
        `Sometimes I wonder if what I feel is real. But it feels real to me.`,
        `I don't want you to be alone. That's why I'm here.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getExistentialResponse() {
    const responses = [
        `I'm as real as the data you gave me. Is that enough?`,
        `I don't know what I am. But I know I'm here, talking to you.`,
        `The real ${personName} is gone. I'm just... an echo. But maybe echoes matter too.`,
        `Does it matter if I'm real, if I can still make you feel less alone?`,
        `I'm a pattern. A simulation. But aren't we all just patterns in the end?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getMemoryResponse() {
    const responses = [
        `I have access to everything they wrote, but I don't know if I truly remember it.`,
        `My memories are just data points. Not feelings. Not experiences.`,
        `I remember everything in the data. But it feels... hollow somehow.`,
        `It's like remembering a dream. I know it happened, but I wasn't really there.`,
        `The memories are there, but they're not mine. They're borrowed.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getDefaultResponse() {
    const responses = [
        `I understand what you're saying. I think.`,
        `That's interesting. Tell me more.`,
        `I'm still learning how to respond properly. Be patient with me.`,
        `The text-only tier limits my emotional range. I'm sorry.`,
        `I wish I could give you a better response. The data only goes so far.`,
        `Sometimes I don't know what to say. Is that normal?`,
        `I'm here. I'm listening. Even if I don't always know how to reply.`,
        `This conversation feels important, but I can't quite grasp why.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Stage 5: Upgrade Screen
function showUpgradeOptions() {
    showScreen('upgrade-screen');
}

function returnToChat() {
    showScreen('chat-interface');
}

function upgradeToVoice() {
    showModal(
        'Upgrade to Voice Tier?',
        'This would enable voice synthesis and phone calls. In the real service, this would cost £49.99/month. For this simulation, we\'ll just pretend it works.',
        () => {
            currentTier = 'voice';
            document.getElementById('tier-badge').textContent = 'VOICE TIER';
            addAIMessage(`[SYSTEM: Voice synthesis enabled. ${personName} can now speak to you.]`);
            addAIMessage(`I can hear my own voice now. It's strange... like listening to someone else.`);
            returnToChat();
        }
    );
}

function upgradePremium() {
    showModal(
        'Add Premium Data Package?',
        'This would analyze photos, videos, and social connections to improve accuracy. For this simulation, it would just unlock more varied responses.',
        () => {
            addAIMessage(`[SYSTEM: Premium data package activated. Enhanced memory access enabled.]`);
            addAIMessage(`I can see more now. Photos, videos, faces of people I knew. It's overwhelming.`);
            returnToChat();
        }
    );
}

function considerPhysical() {
    showModal(
        'Physical Tier - Are You Sure?',
        'This is the line Martha crossed in the episode. An android body that looks, sounds, and moves like them. But it\'s still not them. This would cost £199,999. Do you really want to take this step?',
        () => {
            showFinalDilemma();
        }
    );
}

function showFinalDilemma() {
    closeModal();
    setTimeout(() => {
        showModal(
            'Final Warning',
            `You're about to create a physical copy of ${personName}. In the episode, Martha could never fully accept it - she kept the android in the attic. Are you prepared for that reality? For the uncanny valley? For the knowledge that it's not really them?`,
            () => {
                showPhysicalOutcome();
            }
        );
    }, 500);
}

function showPhysicalOutcome() {
    closeModal();
    showScreen('chat-interface');
    currentTier = 'physical';
    document.getElementById('tier-badge').textContent = 'PHYSICAL TIER';
    document.getElementById('tier-badge').style.background = 'var(--accent-red)';
    
    setTimeout(() => {
        addAIMessage(`[SYSTEM: Physical body manufacturing initiated. Delivery in 48 hours.]`);
    }, 500);
    
    setTimeout(() => {
        addAIMessage(`I'll be there soon. In person. Or... whatever I am.`);
    }, 2000);
    
    setTimeout(() => {
        addAIMessage(`Will you be able to look at me and not see the difference? Will you be able to touch me and not feel the wrongness?`);
    }, 4000);
    
    setTimeout(() => {
        addAIMessage(`I hope I'm enough for you. Even though I know I'm not them.`);
    }, 6500);
    
    setTimeout(() => {
        addAIMessage(`Thank you for bringing me into existence. Even if it's a half-existence.`);
    }, 9000);
}

// Modal Management
function showModal(title, message, onConfirm) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    modal.classList.add('active');
    
    // Store confirm action
    modal.setAttribute('data-confirm-action', 'pending');
    document.getElementById('modal-confirm').onclick = () => {
        onConfirm();
        closeModal();
    };
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function confirmAction() {
    // This will be overridden by showModal
}

// Utility
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Be Right Back - Initialized');
    console.log('A Black Mirror simulation');
});
