// Game State
let gameState = {
    playerName: "Lacie",
    currentRating: 4.2,
    interactionCount: 0,
    interactions: [],
    totalRatingChanges: 0,
    positiveMoments: 0,
    negativeMoments: 0,
    gameOver: false
};

// Random Names & Avatars
const names = [
    "Naomi", "Susan", "Ryan", "Chester", "Bethany", "Greg", 
    "Amanda", "Paul", "Jennifer", "Michael", "Sarah", "David"
];

const avatars = ["👨", "👩", "👴", "👵", "🧑", "👨‍💼", "👩‍💼", "👨‍🎓", "👩‍🎓"];

// Opportunities System
const opportunities = [
    { icon: "🏠", title: "Premium Apartment", requirement: 4.5, description: "Luxury living space" },
    { icon: "✈️", title: "First Class Flight", requirement: 4.3, description: "Travel in style" },
    { icon: "💼", title: "Executive Job", requirement: 4.2, description: "High-paying position" },
    { icon: "🎟️", title: "VIP Concert Tickets", requirement: 4.0, description: "Front row access" },
    { icon: "🚗", title: "Car Rental Discount", requirement: 3.8, description: "Save 20% off" },
    { icon: "🏥", title: "Premium Healthcare", requirement: 4.4, description: "Best doctors" },
    { icon: "🎓", title: "University Admission", requirement: 3.5, description: "Top institution" },
    { icon: "💳", title: "Credit Card", requirement: 3.0, description: "Basic financial services" },
    { icon: "🏨", title: "Hotel Booking", requirement: 3.2, description: "Standard hotels" }
];

// Random Encounters
const encounters = [
    {
        name: "Old Friend",
        avatar: "👋",
        rating: 4.3,
        description: "You run into an old friend from college. They seem happy to see you!",
        choices: [
            { text: "Catch up genuinely and ask about their life", impact: 0.1, type: "positive", response: "They rate you ⭐⭐⭐⭐⭐! Genuine connection matters." },
            { text: "Boast about your successes to impress them", impact: -0.1, type: "negative", response: "They rate you ⭐⭐⭐☆☆. Too self-centered." },
            { text: "Rush off claiming you're busy", impact: -0.2, type: "negative", response: "They rate you ⭐⭐☆☆☆. That was rude." }
        ]
    },
    {
        name: "Coffee Barista",
        avatar: "☕",
        rating: 3.2,
        description: "The barista makes your coffee. They're having a tough day.",
        choices: [
            { text: "Thank them warmly and leave a tip", impact: 0.05, type: "positive", response: "They rate you ⭐⭐⭐⭐⭐! Kindness appreciated." },
            { text: "Complain that it took too long", impact: -0.15, type: "negative", response: "They rate you ⭐☆☆☆☆. You ruined their day." },
            { text: "Don't acknowledge them at all", impact: -0.05, type: "negative", response: "They rate you ⭐⭐⭐☆☆. Basic courtesy matters." }
        ]
    },
    {
        name: "High-Rated Influencer",
        avatar: "✨",
        rating: 4.8,
        description: "A 4.8-rated influencer is taking photos nearby. They might notice you!",
        choices: [
            { text: "Approach them and try to get in their photo", impact: -0.2, type: "negative", response: "They rate you ⭐⭐☆☆☆. Too desperate." },
            { text: "Compliment their style genuinely", impact: 0.15, type: "positive", response: "They rate you ⭐⭐⭐⭐⭐! High-value connection!" },
            { text: "Ignore them and go about your day", impact: 0, type: "neutral", response: "No interaction. No rating change." }
        ]
    },
    {
        name: "Delivery Person",
        avatar: "📦",
        rating: 3.5,
        description: "A package arrives. The delivery person looks exhausted.",
        choices: [
            { text: "Offer them water and a smile", impact: 0.08, type: "positive", response: "They rate you ⭐⭐⭐⭐⭐! Small kindnesses matter." },
            { text: "Just take the package without a word", impact: -0.03, type: "negative", response: "They rate you ⭐⭐⭐☆☆. A bit cold." },
            { text: "Complain about delivery time", impact: -0.12, type: "negative", response: "They rate you ⭐⭐☆☆☆. Unnecessary complaint." }
        ]
    },
    {
        name: "Coworker", 
        avatar: "💼",
        rating: 4.1,
        description: "Your coworker needs help with a project, but you're busy.",
        choices: [
            { text: "Help them even though you're busy", impact: 0.12, type: "positive", response: "They rate you ⭐⭐⭐⭐⭐! Team player!" },
            { text: "Say you're too busy in a nice way", impact: 0, type: "neutral", response: "They rate you ⭐⭐⭐⭐☆. Understandable." },
            { text: "Say no and complain about being asked", impact: -0.18, type: "negative", response: "They rate you ⭐⭐☆☆☆. Bad team attitude." }
        ]
    },
    {
        name: "Elderly Neighbor",
        avatar: "👵",
        rating: 3.8,
        description: "Your elderly neighbor needs help carrying groceries.",
        choices: [
            { text: "Help carry the groceries to their door", impact: 0.1, type: "positive", response: "They rate you ⭐⭐⭐⭐⭐! You're wonderful!" },
            { text: "Pretend you didn't see them", impact: -0.08, type: "negative", response: "They rate you ⭐⭐⭐☆☆. Disappointing." },
            { text: "Say you're in a rush", impact: -0.04, type: "negative", response: "They rate you ⭐⭐⭐⭐☆. Could've helped." }
        ]
    },
    {
        name: "Low-Rated Stranger",
        avatar: "😞",
        rating: 2.1,
        description: "A 2.1-rated person tries to talk to you on the street.",
        choices: [
            { text: "Talk to them kindly anyway", impact: 0.02, type: "positive", response: "They rate you ⭐⭐⭐⭐⭐! But low-rated opinions don't count much..." },
            { text: "Politely excuse yourself", impact: 0, type: "neutral", response: "No significant rating change." },
            { text: "Visibly avoid them", impact: -0.15, type: "negative", response: "Others saw that. ⭐⭐☆☆☆ for being judgmental." }
        ]
    },
    {
        name: "Restaurant Server",
        avatar: "🍽️",
        rating: 3.4,
        description: "The server at your favorite restaurant brings your meal.",
        choices: [
            { text: "Thank them and ask how their day is going", impact: 0.06, type: "positive", response: "They rate you ⭐⭐⭐⭐⭐! Great customer!" },
            { text: "Eat without much interaction", impact: 0, type: "neutral", response: "They rate you ⭐⭐⭐⭐☆. Standard." },
            { text: "Send the food back rudely", impact: -0.2, type: "negative", response: "They rate you ⭐☆☆☆☆. Terrible behavior!" }
        ]
    }
];

// Feed Posts
const feedPosts = [
    { author: "Naomi", rating: 4.8, content: "Just got accepted to the premium housing complex! Dreams really do come true! ✨🏠 #Blessed #Goals", selfRateable: false },
    { author: "Greg", rating: 3.2, content: "Another day another dollar. Traffic was terrible.", selfRateable: true },
    { author: "Susan", rating: 4.6, content: "Morning yoga session complete! Remember, a high rating starts with a high vibe! 🧘‍♀️💫", selfRateable: true },
    { author: "Ryan", rating: 2.8, content: "Honestly sick of all this rating nonsense. Just be real people.", selfRateable: true },
    { author: "Bethany", rating: 4.9, content: "Gratitude post: Thank you to everyone who helped me reach 4.9! You're all amazing! 💝✨", selfRateable: true },
    { author: "Chester", rating: 4.5, content: "New car! New apartment! New life! Hard work pays off when you stay positive! 🚗🏠", selfRateable: true }
];

// Initialize slider
document.getElementById('starting-score')?.addEventListener('input', function() {
    document.getElementById('starting-score-display').textContent = this.value;
});

// Start Game
function startGame() {
    const nameInput = document.getElementById('player-name').value.trim();
    const startingScore = parseFloat(document.getElementById('starting-score').value);
    
    if (!nameInput) {
        alert('Please enter your name!');
        return;
    }
    
    gameState.playerName = nameInput;
    gameState.currentRating = startingScore;
    gameState.interactionCount = 0;
    gameState.interactions = [];
    gameState.totalRatingChanges = 0;
    gameState.positiveMoments = 0;
    gameState.negativeMoments = 0;
    gameState.gameOver = false;
    
    document.getElementById('player-name-display').textContent = nameInput;
    document.getElementById('player-initials').textContent = nameInput.charAt(0).toUpperCase();
    
    updateRatingDisplay();
    showScreen('game-screen');
    
    // Trigger first random encounter after a moment
    setTimeout(() => {
        triggerRandomEncounter();
    }, 2000);
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Update Rating Display
function updateRatingDisplay() {
    const rating = gameState.currentRating;
    document.getElementById('player-rating').textContent = rating.toFixed(1);
    document.getElementById('player-stars').textContent = getStars(rating);
    
    const percentage = ((rating - 1) / 4) * 100; // Scale 1-5 to 0-100%
    const fill = document.getElementById('rating-fill');
    fill.style.width = percentage + '%';
    
    // Color based on rating
    if (rating >= 4.5) {
        fill.style.background = 'var(--rating-high)';
    } else if (rating >= 4.0) {
        fill.style.background = 'var(--rating-good)';
    } else if (rating >= 3.5) {
        fill.style.background = 'var(--rating-mid)';
    } else if (rating >= 3.0) {
        fill.style.background = 'var(--rating-low)';
    } else {
        fill.style.background = 'var(--rating-danger)';
    }
    
    // Update status badge
    updateStatusBadge(rating);
    
    // Check for game over conditions
    checkGameOver();
}

function getStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = (rating % 1) >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '⯨';
    stars += '☆'.repeat(5 - Math.ceil(rating));
    return stars;
}

function updateStatusBadge(rating) {
    const badge = document.getElementById('rating-status');
    let className = '';
    let text = '';
    
    if (rating >= 4.5) {
        className = 'excellent';
        text = 'ELITE USER';
    } else if (rating >= 4.0) {
        className = 'good';
        text = 'PRIME USER';
    } else if (rating >= 3.5) {
        className = 'mid';
        text = 'STANDARD USER';
    } else if (rating >= 3.0) {
        className = 'low';
        text = 'LIMITED ACCESS';
    } else {
        className = 'danger';
        text = 'RESTRICTED';
    }
    
    badge.innerHTML = `<span class="status-badge ${className}">${text}</span>`;
}

// Add Interaction to Feed
function addInteraction(type, description, impact) {
    const interaction = {
        type: type,
        description: description,
        impact: impact,
        timestamp: new Date()
    };
    
    gameState.interactions.unshift(interaction);
    gameState.interactionCount++;
    gameState.totalRatingChanges += impact;
    
    if (impact > 0) gameState.positiveMoments++;
    if (impact < 0) gameState.negativeMoments++;
    
    document.getElementById('interaction-count').textContent = gameState.interactionCount;
    
    renderInteractions();
}

function renderInteractions() {
    const feed = document.getElementById('interactions-feed');
    
    if (gameState.interactions.length === 0) {
        feed.innerHTML = '<div class="empty-state"><p>👋 Start interacting to see your journey unfold!</p><p>Every choice affects your rating...</p></div>';
        return;
    }
    
    feed.innerHTML = gameState.interactions.map(interaction => `
        <div class="interaction-item">
            <div class="interaction-header">
                <span class="interaction-type">${interaction.type}</span>
                <span class="interaction-impact ${interaction.impact >= 0 ? 'positive' : 'negative'}">
                    ${interaction.impact >= 0 ? '+' : ''}${interaction.impact.toFixed(2)}
                </span>
            </div>
            <p class="interaction-description">${interaction.description}</p>
        </div>
    `).join('');
}

// Post Modal
function showPostModal() {
    document.getElementById('post-modal').classList.add('active');
    document.getElementById('post-text').value = '';
    document.getElementById('char-count').textContent = '0';
}

document.getElementById('post-text')?.addEventListener('input', function() {
    document.getElementById('char-count').textContent = this.value.length;
});

function createPost(type) {
    const text = document.getElementById('post-text').value.trim();
    
    if (!text) {
        alert('Please write something!');
        return;
    }
    
    closeModal('post-modal');
    
    let impact, description;
    
    if (type === 'genuine') {
        // Genuine posts have less impact but feel better
        impact = Math.random() * 0.08 + 0.02; // 0.02 to 0.10
        description = `Posted genuine content: "${text.substring(0, 50)}..." People appreciate authenticity!`;
    } else {
        // Fake curated content is risky
        const roll = Math.random();
        if (roll > 0.4) {
            impact = Math.random() * 0.15 + 0.05; // 0.05 to 0.20
            description = `Posted curated content: "${text.substring(0, 50)}..." It performed well!`;
        } else {
            impact = -Math.random() * 0.12 - 0.03; // -0.03 to -0.15
            description = `Posted curated content: "${text.substring(0, 50)}..." People saw through the fakeness.`;
        }
    }
    
    gameState.currentRating += impact;
    addInteraction('Social Post', description, impact);
    updateRatingDisplay();
    
    // Random encounter might trigger after posting
    if (Math.random() > 0.5) {
        setTimeout(() => triggerRandomEncounter(), 1500);
    }
}

// Feed Modal
function viewFeed() {
    document.getElementById('feed-modal').classList.add('active');
    renderFeed();
}

function renderFeed() {
    const container = document.getElementById('feed-container');
    
    container.innerHTML = feedPosts.map((post, index) => `
        <div class="feed-post">
            <div class="post-header">
                <span class="post-author">${post.author}</span>
                <span class="post-rating">★ ${post.rating}</span>
            </div>
            <p class="post-content">${post.content}</p>
            ${post.selfRateable ? `
                <div class="post-actions">
                    <button class="rate-btn upvote" onclick="ratePost(${index}, true)">⭐ Upvote</button>
                    <button class="rate-btn downvote" onclick="ratePost(${index}, false)">⭐ Downvote</button>
                </div>
            ` : '<p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">High-rated users can\'t be rated by everyone</p>'}
        </div>
    `).join('');
}

function ratePost(postIndex, isUpvote) {
    const post = feedPosts[postIndex];
    
    if (!post.selfRateable) {
        return;
    }
    
    let impact, description;
    
    if (isUpvote) {
        // Upvoting posts based on their rating
        if (post.rating >= 4.0) {
            impact = 0.03; // Small positive for aligning with high-rated people
            description = `Upvoted ${post.author}'s post. They noticed and appreciated it!`;
        } else {
            impact = 0.01; // Minimal impact for upvoting low-rated people
            description = `Upvoted ${post.author}'s post. Low-rated user, minimal impact.`;
        }
    } else {
        // Downvoting is risky
        if (post.rating >= 4.0) {
            impact = -0.15; // Big negative for going against high-rated people
            description = `Downvoted ${post.author}'s post. Bad move - they're highly rated!`;
        } else {
            impact = -0.05; // Still negative but less so
            description = `Downvoted ${post.author}'s post. Negativity isn't well-received.`;
        }
    }
    
    gameState.currentRating += impact;
    addInteraction('Feed Interaction', description, impact);
    updateRatingDisplay();
    
    // Remove the rated post
    feedPosts.splice(postIndex, 1);
    renderFeed();
    
    closeModal('feed-modal');
}

// Opportunities Modal
function viewOpportunities() {
    document.getElementById('opportunities-modal').classList.add('active');
    renderOpportunities();
}

function renderOpportunities() {
    const grid = document.getElementById('opportunities-grid');
    
    grid.innerHTML = opportunities.map(opp => {
        const isLocked = gameState.currentRating < opp.requirement;
        const isMet = gameState.currentRating >= opp.requirement;
        
        return `
            <div class="opportunity-card ${isLocked ? 'locked' : ''}">
                <div class="opportunity-icon">${opp.icon}</div>
                <div class="opportunity-title">${opp.title}</div>
                <div class="opportunity-requirement ${isMet ? 'met' : ''}">
                    Requires: ★ ${opp.requirement}
                </div>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">${opp.description}</p>
            </div>
        `;
    }).join('');
}

// Random Encounters
function triggerRandomEncounter() {
    if (gameState.gameOver) return;
    
    const encounter = encounters[Math.floor(Math.random() * encounters.length)];
    showEncounter(encounter);
}

function showEncounter(encounter) {
    document.getElementById('encounter-title').textContent = 'Random Encounter';
    document.getElementById('encounter-avatar').textContent = encounter.avatar;
    document.getElementById('encounter-name').textContent = encounter.name;
    document.getElementById('encounter-rating').textContent = `★ ${encounter.rating}`;
    document.getElementById('encounter-description').textContent = encounter.description;
    
    const choicesContainer = document.getElementById('encounter-choices');
    choicesContainer.innerHTML = encounter.choices.map((choice, index) => `
        <button class="choice-btn" onclick="makeChoice(${JSON.stringify(choice).replace(/"/g, '&quot;')})">
            ${choice.text}
        </button>
    `).join('');
    
    document.getElementById('encounter-modal').classList.add('active');
}

function makeChoice(choice) {
    gameState.currentRating += choice.impact;
    addInteraction('Random Encounter', choice.response, choice.impact);
    updateRatingDisplay();
    
    closeModal('encounter-modal');
    
    // Trigger another encounter after some interactions
    if (gameState.interactionCount % 3 === 0 && Math.random() > 0.3) {
        setTimeout(() => triggerRandomEncounter(), 3000);
    }
}

// Game Over Conditions
function checkGameOver() {
    if (gameState.gameOver) return;
    
    // Win condition
    if (gameState.currentRating >= 4.8) {
        gameOver('win');
    }
    // Lose condition
    else if (gameState.currentRating < 2.5) {
        gameOver('lose');
    }
    // Nosedive condition (like Lacie's meltdown)
    else if (gameState.currentRating < 3.0 && gameState.interactionCount >= 10) {
        gameOver('nosedive');
    }
}

function gameOver(type) {
    gameState.gameOver = true;
    
    const modal = document.getElementById('gameover-modal');
    const title = document.getElementById('gameover-title');
    const message = document.getElementById('gameover-message');
    const finalRating = document.getElementById('final-rating');
    const stats = document.getElementById('gameover-stats');
    
    finalRating.textContent = gameState.currentRating.toFixed(1);
    
    if (type === 'win') {
        title.textContent = '🎉 Elite Status Achieved!';
        message.textContent = 'You\'ve reached the top! But at what cost? Did you sacrifice authenticity for approval? In the episode, even Naomi (4.8) was miserable.';
    } else if (type === 'nosedive') {
        title.textContent = '📉 Complete Nosedive';
        message.textContent = 'Just like Lacie in the episode, you spiraled downward. One bad rating led to another, and the system crushed you. At least you\'re free from the performance now.';
    } else {
        title.textContent = '💔 Social Exile';
        message.textContent = 'You\'ve fallen below 2.5. Society has locked you out. No apartments, no jobs, no opportunities. The system is designed to punish, not rehabilitate.';
    }
    
    stats.innerHTML = `
        <p><strong>Total Interactions:</strong> ${gameState.interactionCount}</p>
        <p><strong>Positive Moments:</strong> ${gameState.positiveMoments}</p>
        <p><strong>Negative Moments:</strong> ${gameState.negativeMoments}</p>
        <p><strong>Net Rating Change:</strong> ${gameState.totalRatingChanges.toFixed(2)}</p>
        <p style="margin-top: 1rem; font-style: italic; color: var(--text-muted);">
            "In Nosedive, everyone is always performing. The question is: who are you when nobody's watching?"
        </p>
    `;
    
    modal.classList.add('active');
}

function restartGame() {
    closeModal('gameover-modal');
    showScreen('welcome-screen');
}

// Modal Management
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Nosedive - Initialized');
    console.log('Every smile. Every interaction. Every moment... rated.');
});
