document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const loginScreen = document.getElementById('loginScreen');
    const homeContent = document.getElementById('homeContent');
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    // Comprehensive logging and error checking
    if (!loginScreen) console.error('Login screen element not found');
    if (!homeContent) console.error('Home content element not found');
    if (!loginForm) console.error('Login form element not found');
    if (!loginEmail) console.error('Login email input not found');
    if (!loginPassword) console.error('Login password input not found');

    // Profile Manager with detailed logging
    class ProfileManager {
        updateProfile(profileData) {
            console.log('Updating profile:', profileData);
            
            // Use querySelectorAll to be more robust
            const nameElements = document.querySelectorAll('#profileUserName');
            nameElements.forEach(el => el.textContent = profileData.name);

            const pointsElements = document.querySelectorAll('#modalPoints, #userPoints');
            pointsElements.forEach(el => el.textContent = `${profileData.points} Points`);

            const levelElements = document.querySelectorAll('#modalLevel, #userLevel');
            levelElements.forEach(el => el.textContent = `Level ${profileData.level}`);
        }
    }

    const profileManager = new ProfileManager();

    // Comprehensive login status check
    function checkLoginStatus() {
        console.log('Checking login status');
        const storedUser = localStorage.getItem('ecoUser');
        
        if (storedUser) {
            console.log('User found in localStorage');
            loginScreen.style.display = 'none';
            homeContent.style.display = 'block';
            
            profileManager.updateProfile({
                name: storedUser.split('@')[0],
                level: 5,
                points: 850,
                achievements: []
            });
            document.getElementById('commentSection').classList.remove('hidden');
            document.getElementById('commentLoginPrompt').classList.add('hidden');
        } else {
            console.log('No user found in localStorage');
            loginScreen.style.display = 'flex';
            homeContent.style.display = 'none';
            document.getElementById('commentSection').classList.add('hidden');
        document.getElementById('commentLoginPrompt').classList.remove('hidden');
        }
    }

    // Robust login handler
    function handleLogin(event) {
        console.log('Login form submitted');
        event.preventDefault(); // Critical: prevent default form submission

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        console.log('Login attempt:', { email, passwordLength: password.length });

        // Comprehensive validation
        if (!email) {
            console.error('Email is empty');
            alert('Please enter an email address');
            return;
        }

        if (!password) {
            console.error('Password is empty');
            alert('Please enter a password');
            return;
        }

        // Enhanced validation
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            console.error('Invalid email format');
            alert('Please enter a valid Gmail address');
            return;
        }

        if (password.length < 6) {
            console.error('Password too short');
            alert('Password must be at least 6 characters long');
            return;
        }

        // Successful validation
        try {
            localStorage.setItem('ecoUser', email);
            
            // Explicitly set display styles
            loginScreen.style.display = 'none';
            homeContent.style.display = 'block';

            // Update profile
            profileManager.updateProfile({
                name: email.split('@')[0],
                level: 5,
                points: 850,
                achievements: []
            });

            // Clear form
            loginEmail.value = '';
            loginPassword.value = '';

            console.log('Login successful');
            showNotification(`Welcome, ${email.split('@')[0]}!`);
        } catch (error) {
            console.error('Login process failed:', error);
            alert('An error occurred during login. Please try again.');
        }
    }

    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }

    // Event Listeners with error handling
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('Login form event listener added');
    } else {
        console.error('Could not add login form event listener');
    }

    // Initial login status check
    checkLoginStatus();
});

// Logout function
function logout() {
    localStorage.removeItem('ecoUser');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('homeContent').style.display = 'none';
}

// Attach logout to profile logout button
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('profileLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// Optional: Add this function if you want a signup toggle
function toggleSignup() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}

// Challenge completion handler
function completeChallenge(button, points) {
    button.disabled = true;
    button.textContent = "Completed! ✅";
    button.classList.add('bg-gray-400');
    button.classList.remove('hover:bg-green-700', 'hover:bg-blue-700', 'hover:bg-purple-700');
    
    userState.challengesCompleted++;
    userState.updatePoints(points);
    
    // Update impact metrics
    updateImpactMetrics(points);
    showNotification(`🎉 Challenge completed! +${points} points`);
}

// Impact metrics updates
function updateImpactMetrics(points) {
    const waterSaved = document.getElementById('waterSaved');
    const treesSaved = document.getElementById('treesSaved');
    const energySaved = document.getElementById('energySaved');
    const wasteReduced = document.getElementById('wasteReduced');

    // Random increases based on points
    const waterIncrease = Math.round(points * 0.3);
    const treesIncrease = (points * 0.004).toFixed(1);
    const energyIncrease = Math.round(points * 0.24);
    const wasteIncrease = (points * 0.01).toFixed(1);

    waterSaved.textContent = `${parseInt(waterSaved.textContent) + waterIncrease}L`;
    treesSaved.textContent = (parseFloat(treesSaved.textContent) + parseFloat(treesIncrease)).toFixed(1);
    energySaved.textContent = `${parseInt(energySaved.textContent) + energyIncrease}kWh`;
    wasteReduced.textContent = `${(parseFloat(wasteReduced.textContent) + parseFloat(wasteIncrease)).toFixed(1)}kg`;
}

// Profile modal toggle
function toggleProfile() {
    const modal = document.getElementById('profileModal');
    modal.classList.toggle('hidden');
}

// Social feed management
const posts = [
    {
        user: "Sarah Chen",
        avatar: "🚲",
        time: "2 hours ago",
        content: "Just completed my first week of bike commuting! Saved 15kg of CO2 emissions 🌍",
        likes: 45
    },
    {
        user: "Marcus Johnson",
        avatar: "🌱",
        time: "5 hours ago",
        content: "Started my home composting project today! Check out my setup below 🌱",
        likes: 32,
        hasImage: true
    }
];

function initializeSocialFeed() {
    const feed = document.getElementById('socialFeed');
    feed.innerHTML = ''; // Clear existing posts
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        feed.appendChild(postElement);
    });
}

function createPostElement(post) {
    const div = document.createElement('div');
    div.className = 'border-b pb-4 animate-slide-in';
    
    div.innerHTML = `
        <div class="flex items-center mb-2">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                ${post.avatar}
            </div>
            <div>
                <h3 class="font-semibold">${post.user}</h3>
                <p class="text-sm text-gray-600">${post.time}</p>
            </div>
        </div>
        <p>${post.content}</p>
        ${post.hasImage ? '<img src="/api/placeholder/400/200" alt="Post image" class="mt-2 rounded-lg">' : ''}
        <div class="mt-2 flex space-x-4">
            <button onclick="toggleLike(this)" class="text-green-600 hover:text-green-700">
                👍 ${post.likes} Likes
            </button>
            <button class="text-blue-600 hover:text-blue-700">
                💭 Comment
            </button>
        </div>
    `;
    
    return div;
}

function toggleLike(button) {
    const likesText = button.textContent;
    const currentLikes = parseInt(likesText.match(/\d+/)[0]);
    button.textContent = `👍 ${currentLikes + 1} Likes`;
    button.classList.add('animate-pulse-once');
    setTimeout(() => button.classList.remove('animate-pulse-once'), 500);
}

function addPost() {
    const newPost = {
        user: "You",
        avatar: "👤",
        time: "Just now",
        content: "Made another eco-friendly choice today! 🌱",
        likes: 0
    };
    
    posts.unshift(newPost);
    initializeSocialFeed();
    showNotification("🌟 Post shared successfully!");
}

// Carbon footprint chart
function initializeCharts() {
    const ctx = document.getElementById('carbonChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Carbon Footprint (kg CO2)',
                data: [250, 230, 180, 160, 140, 120],
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    userState.updateUI();
    userState.updateProgressBar();
    initializeCharts();
    initializeSocialFeed();
});

