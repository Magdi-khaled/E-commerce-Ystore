<template>
    <div class="line-chart">
        <Line class="text-black border-2 border-gray-300 p-2 shadow-sm" id="range-chart" :data="chartData"
            :options="chartOptions" />
    </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
    Chart as ChartJS,
    Filler,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler);

export default {
    name:'ChartComponent',
    components: { Line },
    props: {
        startDate: {
            type: String,
            default: new Date().toISOString().split("T")[0], // Default to today
        },
        endDate: {
            type: String,
            default: new Date().toISOString().split("T")[0], // Default to today
        },
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: "Product Sales",
                        data: [1000, 1250, 1900, 2100, 2260, 3150, 3750, 3250, 2760, 3250, 2800, 4250, 3760],
                        borderColor: "#000000",
                        backgroundColor: "#ff0000",
                        fill: false,
                        tension: 0.0,
                        pointRadius: 0,
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: {
                    mode: "index",
                    intersect: false,
                },
                plugins: {
                    title: {
                        display: false,
                        text: "Product Sales",
                    },
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: "Month",
                        },
                    },
                }
            },
        };
    },
    methods: {
        generateData(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const data = [];
            const labels = [];

            while (start <= end) {
                labels.push(start.toISOString().split("T")[0]); // Format as YYYY-MM-DD
                data.push(Math.floor(Math.random() * 100)); // Random value for demonstration
                start.setDate(start.getDate() + 1); // Increment day
            }

            return { labels, data };
        },
        updateChartData() {
            if (new Date(this.startDate) > new Date(this.endDate)) {
                alert("Start date cannot be after end date.");
                return;
            }

            const { labels, data } = this.generateData(this.startDate, this.endDate);
            this.chartData.labels = labels;
            this.chartData.datasets[0].data = data;
        },
    },
    mounted() {
        this.updateChartData(); // Initialize chart data on load
    },
};
</script>

<style scoped>
label {
    display: block;
    margin-bottom: 10px;
}

input {
    display: block;
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}
</style>
