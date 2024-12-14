<template>
    <Line :data="chartData" :options="chartOptions" />
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, LinearScale, CategoryScale);

export default {
    name: "CaloriesChartComponent",
    components: { Line },
    props: {
        caloriesConsumed: Array,
        caloriesBurned: Array,
        chartTitle: String,
        dates: Array,
    },
    computed: {
        chartData() {
            return {
                labels: this.dates.map(date => this.formatDate(date)),
                datasets: [
                    {
                        label: 'Calories Consumed',
                        data: this.caloriesConsumed,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Calories Burned',
                        data: this.caloriesBurned,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    }
                ]
            };
        },
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: this.chartTitle
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 10,
                            source: 'auto'
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            };
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
    }
};
</script>