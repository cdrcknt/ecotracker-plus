export class ProfileManager {
    constructor() {
        this.profile = {
            name: "User",
            level: 1,
            points: 0,
            achievements: []
        };
        this.logoutBtn = document.getElementById("profileLogoutBtn");
        this.loginScreen = document.getElementById("loginScreen");
        this.initialize();
    }

    initialize() {
        if (this.logoutBtn) {
            this.logoutBtn.addEventListener("click", () => this.logout());
        }
    }

    updateProfile(data) {
        this.profile = { ...this.profile, ...data };
        this.updateUI();
    }

    updateUI() {
        document.getElementById('userLevel').textContent = `Level ${this.profile.level}`;
        document.getElementById('userPoints').textContent = `${this.profile.points} Points`;
        document.getElementById('profileUserName').textContent = this.profile.name;
        document.getElementById('modalPoints').textContent = this.profile.points;
        document.getElementById('modalLevel').textContent = this.profile.level;
    }

    logout() {
        localStorage.removeItem('ecoUser'); // Clear session
        alert("Logged out successfully!");
        window.location.reload(); // Refresh to update the UI
    }
}
