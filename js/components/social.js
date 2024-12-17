export class SocialFeed {
    constructor() {
        // Initial posts to populate the feed
        this.posts = [
            {
                id: 1,
                user: "Sarah Chen",
                avatar: "🚲",
                timestamp: new Date('2024-03-15T10:30:00'),
                content: "Just completed my first week of bike commuting! Saved 15kg of CO2 emissions 🌍",
                likes: 45
            },
            {
                id: 2,
                user: "Marcus Johnson",
                avatar: "🌱",
                timestamp: new Date('2024-03-15T14:45:00'),
                content: "Started my home composting project today! Check out my setup below 🌱",
                likes: 32,
                image: "/api/placeholder/400/200"
            },
            {
                id: 3,
                user: "Emma Rodriguez",
                avatar: "♻️",
                timestamp: new Date('2024-03-16T09:15:00'),
                content: "Reduced my single-use plastic by 80% this month! Small changes make a big difference 💚",
                likes: 56
            }
        ];
        
        this.updateFeed();
    }

    addPost(post) {
        const newPost = {
            id: Date.now(),
            user: "You",
            avatar: "👤",
            timestamp: new Date(),
            likes: 0,
            ...post
        };
        
        this.posts.unshift(newPost);
        this.updateFeed();
    }

    likePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            this.updateFeed();
        }
    }

    updateFeed() {
        const feedElement = document.getElementById('socialFeed');
        feedElement.innerHTML = this.posts
            .map(post => this.createPostHTML(post))
            .join('');
    }

    createPostHTML(post) {
        const formattedTime = this.formatTimeAgo(post.timestamp);
        return `
            <div class="border-b pb-4 animate-slide-in">
                <div class="flex items-center mb-2">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        ${post.avatar}
                    </div>
                    <div>
                        <h3 class="font-semibold">${post.user}</h3>
                        <p class="text-sm text-gray-600">${formattedTime}</p>
                    </div>
                </div>
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="mt-2 rounded-lg">` : ''}
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

    formatTimeAgo(timestamp) {
        const now = new Date();
        const diffMs = now - timestamp;
        const diffMinutes = Math.round(diffMs / (1000 * 60));
        const diffHours = Math.round(diffMs / (1000 * 60 * 60));

        if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        return timestamp.toLocaleDateString();
    }
}

// Global instance for easy access
window.socialFeed = new SocialFeed();