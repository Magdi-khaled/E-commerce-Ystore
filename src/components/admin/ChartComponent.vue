<script setup>
import { Line } from "vue-chartjs";
import {
    Chart as ChartJS, Filler, Title,
    Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale,
} from "chart.js";
import { onMounted, reactive, ref } from "vue";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler);

const props = defineProps({
    startDate: { type: String, default: new Date().toISOString().split("T")[0], },
    endDate: { type: String, default: new Date().toISOString().split("T")[0], },
});
const chartData = ref({
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
});
const chartOptions = reactive({
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
});

const generateData = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const data = [];
    const labels = [];

    while (start <= end) {
        labels.push(start.toISOString().split("T")[0]);
        data.push(Math.floor(Math.random() * 100));
        start.setDate(start.getDate() + 1);
    }
    return { labels, data };
};
const updateChartData = () => {
    if (new Date(props.startDate) > new Date(props.endDate)) {
        alert("Start date cannot be after end date.");
        return;
    }

    const { labels, data } = generateData(props.startDate, props.endDate);
    chartData.value.labels = labels;
    chartData.value.datasets[0].data = data;
};
onMounted(() => updateChartData());
</script>

<template>
    <Line class="text-black border-2 border-gray-300 p-2 shadow-sm" id="range-chart" :data="chartData"
        :options="chartOptions" />
</template>
