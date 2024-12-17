export class CommentSystem {
    constructor() {
        this.comments = [];
        this.commentInput = document.getElementById('commentInput');
        this.commentsContainer = document.getElementById('commentsContainer');
        this.commentSection = document.getElementById('commentSection');
    }

    addComment() {
        const commentText = this.commentInput.value.trim();
        if (!commentText) {
            alert('Please enter a comment');
            return;
        }

        const newComment = {
            id: Date.now(),
            text: commentText,
            user: 'You',
            timestamp: new Date()
        };

        this.comments.unshift(newComment);
        this.renderComments();
        this.commentInput.value = ''; // Clear input
    }

    renderComments() {
        this.commentsContainer.innerHTML = this.comments
            .map(comment => this.createCommentHTML(comment))
            .join('');
    }

    createCommentHTML(comment) {
        return `
            <div class="bg-gray-50 p-3 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="font-semibold">${comment.user}</h4>
                    <span class="text-sm text-gray-500">${this.formatTimeAgo(comment.timestamp)}</span>
                </div>
                <p>${comment.text}</p>
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
window.commentSystem = new CommentSystem();

// Function to add comment (for HTML onclick)
function addComment() {
    window.commentSystem.addComment();
}