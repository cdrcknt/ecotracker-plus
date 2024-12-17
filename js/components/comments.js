document.addEventListener('DOMContentLoaded', () => {
    class CommentSystem {
        constructor() {
            this.comments = [];
            this.commentInput = document.getElementById('commentInput');
            this.commentsContainer = document.getElementById('commentsContainer');
            this.postCommentButton = document.querySelector('button[onclick="addComment()"]');

            if (this.postCommentButton) {
                this.postCommentButton.addEventListener('click', () => this.addComment());
            }
        }

        addComment() {
            if (!this.commentInput) return;

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

            // Show notification
            this.showNotification("Comment posted successfully!");
        }

        renderComments() {
            if (!this.commentsContainer) return;

            this.commentsContainer.innerHTML = this.comments
                .map(comment => this.createCommentHTML(comment))
                .join('');
        }

        createCommentHTML(comment) {
            return `
                <div class="bg-gray-50 p-3 rounded-lg mb-2">
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

        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50';
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => notification.remove(), 3000);
        }
    }

    // Create a global instance
    window.commentSystem = new CommentSystem();
});

// Function for HTML onclick attribute
function addComment() {
    if (window.commentSystem) {
        window.commentSystem.addComment();
    }
}