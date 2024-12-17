export class NotificationSystem {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    show(message, type = 'success') {
        const notification = {
            message,
            type,
            id: Date.now()
        };

        this.queue.push(notification);
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    async processQueue() {
        if (this.queue.length === 0) {
            this.isProcessing = false;
            return;
        }

        this.isProcessing = true;
        const notification = this.queue.shift();
        await this.displayNotification(notification);
        this.processQueue();
    }

    async displayNotification(notification) {
        const element = document.createElement('div');
        element.className = `notification notification-${notification.type}`;
        element.textContent = notification.message;
        document.body.appendChild(element);

        await new Promise(resolve => setTimeout(resolve, 3000));
        element.remove();
    }
}