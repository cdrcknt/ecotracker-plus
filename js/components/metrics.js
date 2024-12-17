export class ImpactMetrics {
    constructor() {
        this.metrics = {
            waterSaved: 0,
            energySaved: 0,
            wasteReduced: 0,
            treesPlanted: 0
        };
    }

    updateMetrics(activity) {
        const impacts = this.calculateImpact(activity);
        Object.keys(impacts).forEach(key => {
            this.metrics[key] += impacts[key];
        });
        this.updateUI();
    }

    calculateImpact(activity) {
        // Calculate environmental impact based on activity
        return {
            waterSaved: activity.waterImpact || 0,
            energySaved: activity.energyImpact || 0,
            wasteReduced: activity.wasteImpact || 0,
            treesPlanted: activity.treeImpact || 0
        };
    }
}