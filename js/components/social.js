export class SocialFeed {
    constructor() {
        this.posts = [];
    }

    addPost(post) {
        this.posts.unshift({
            id: Date.now(),
            timestamp: new Date(),
            likes: 0,
            ...post
        });
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
        // Update social feed UI
        const feedElement = document.getElementById('socialFeed');
        feedElement.innerHTML = this.posts
            .map(post => this.createPostHTML(post))
            .join('');
    }
}