export class StateManager {
    constructor() {
        this.state = {
            user: {
                points: 0,
                level: 1,
                challenges: [],
                achievements: []
            },
            metrics: {
                waterSaved: 0,
                energySaved: 0,
                wasteReduced: 0
            }
        };

        this.listeners = new Set();
    }

    updateState(path, value) {
        let current = this.state;
        const parts = path.split('.');
        const last = parts.pop();

        for (const part of parts) {
            current = current[part] = current[part] || {};
        }

        current[last] = value;
        this.notifyListeners();
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }
}