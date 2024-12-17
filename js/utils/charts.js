export class ChartManager {
    constructor() {
        this.charts = {};
    }

    initializeCharts() {
        this.initializeCarbonChart();
        this.initializeImpactChart();
    }

    initializeCarbonChart() {
        const ctx = document.getElementById('carbonChart').getContext('2d');
        this.charts.carbon = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Carbon Footprint (kg CO2)',
                    data: [250, 230, 180, 160, 140, 120],
                    borderColor: '#22c55e',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    updateChartData(chartId, newData) {
        if (this.charts[chartId]) {
            this.charts[chartId].data.datasets[0].data = newData;
            this.charts[chartId].update();
        }
    }
}