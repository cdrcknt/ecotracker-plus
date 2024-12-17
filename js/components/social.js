document.addEventListener('DOMContentLoaded', () => {
    class SocialFeed {
        constructor() {
            this.posts = [
                {
                    id: 1,
                    user: "Sarah Chen",
                    avatar: "🚲",
                    content: "Just completed my first week of bike commuting! Saved 15kg of CO2 emissions 🌍",
                    likes: 45,
                    timestamp: new Date('2024-03-15T10:30:00')
                },
                {
                    id: 2,
                    user: "Marcus Johnson",
                    avatar: "🌱",
                    content: "Started my home composting project today! Check out my setup below 🌱",
                    likes: 32,
                    timestamp: new Date('2024-03-15T14:45:00')
                },
                {
                    id: 3,
                    user: "Emma Rodriguez",
                    avatar: "♻️",
                    content: "Reduced my single-use plastic by 80% this month! Small changes make a big difference 💚",
                    likes: 56,
                    timestamp: new Date('2024-03-16T09:15:00')
                }
            ];

            this.feedElement = document.getElementById('socialFeed');
            this.shareButton = document.querySelector('button[onclick="addPost()"]');

            if (this.shareButton) {
                this.shareButton.addEventListener('click', () => this.addPost());
            }

            this.renderPosts();
        }

        renderPosts() {
            if (!this.feedElement) return;

            this.feedElement.innerHTML = this.posts.map(post => this.createPostHTML(post)).join('');
        }

        addPost() {
            const postContent = prompt("What eco-friendly action did you take today?");
            
            if (postContent && postContent.trim() !== '') {
                const newPost = {
                    id: Date.now(),
                    user: "You",
                    avatar: "👤",
                    content: postContent,
                    likes: 0,
                    timestamp: new Date()
                };

                this.posts.unshift(newPost);
                this.renderPosts();
                
                // Show notification
                this.showNotification("Post shared successfully!");
            }
        }

        createPostHTML(post) {
            return `
                <div class="border-b pb-4 animate-slide-in">
                    <div class="flex items-center mb-2">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            ${post.avatar}
                        </div>
                        <div>
                            <h3 class="font-semibold">${post.user}</h3>
                            <p class="text-sm text-gray-600">${this.formatTimeAgo(post.timestamp)}</p>
                        </div>
                    </div>
                    <p>${post.content}</p>
                    <div class="mt-2 flex space-x-4">
                        <button onclick="socialFeed.likePost(${post.id})" class="text-green-600 hover:text-green-700">
                            👍 ${post.likes} Likes
                        </button>
                        <button class="text-blue-600 hover:text-blue-700">
                            💭 Comment
                        </button>
                    </div>
                </div>
            `;
        }

        likePost(postId) {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                post.likes++;
                this.renderPosts();
            }
        }

        formatTimeAgo(timestamp) {
            const now = new Date();
            const diffMs = now - timestamp;
            const diffMinutes = Math.round(diffMs / (1000 * 60));
            const diffHours = Math.round(diffMs / (1000 * 60 * 60));

            if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
            if (diffHours < 24) return `${diffHours} hours ago`;
            return timestamp.toLocaleDateString();
        }

        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50';
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => notification.remove(), 3000);
        }
    }

    // Create a global instance
    window.socialFeed = new SocialFeed();
});

// Function for HTML onclick attribute
function addPost() {
    if (window.socialFeed) {
        window.socialFeed.addPost();
    }
}