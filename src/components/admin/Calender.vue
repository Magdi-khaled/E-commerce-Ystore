<template>
    <div class="m-auto max-w-[400px] text-center text-gray-800">
        <div class="flex justify-between items-center mb-4 relative">
            <button @click="prevMonth">◀</button>
            <h2 class="font-medium text-md cursor-pointer" @click="showMonths = !showMonths, showYears = false">
                {{ months[month] }}
            </h2>
            <h2 class="font-medium text-md cursor-pointer" @click="showYears = !showYears, showMonths = false">
                {{ year }}
            </h2>

            <div v-if="showMonths"
                class="absolute z-10 top-[94%] left-[10%] w-32 h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded shadow-md">
                <div v-for="(monthName, index) in months" :key="index" @click="month = index; showMonths = false"
                    class="cursor-pointer">
                    {{ monthName }}
                    <hr />
                </div>
            </div>
            <div v-if="showYears"
                class="absolute z-10 top-[94%] right-[5%] w-32 h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded shadow-md">
                <div v-for="(iyear, index) in years" :key="index" @click="year = iyear, showYears = false"
                    class="cursor-pointer">
                    {{ iyear }}
                    <hr />
                </div>
            </div>
            <button @click="nextMonth">▶</button>
        </div>
        <div class="grid grid-cols-7">
            <div v-for="day in weekdays" :key="day" class="font-normal p-1 text-sm uppercase">{{ day }}</div>
        </div>
        <div class="grid grid-cols-7">
            <div v-for="day in lastMonthDays" :key="'last-' + day"
                class="font-normal text-md p-2 text-center opacity-50">
                {{ day }}
            </div>
            <div v-for="day in daysInMonth" :key="day" class="font-normal text-md p-2 text-center cursor-pointer"
                @click="daySelected(day)"
                :class="{ 'bg-[#2f2f2f] rounded-full outline outline-[4px] outline-[#2f2f2f66] text-white font-bold': day === currentDay }">
                {{ day }}
            </div>
        </div>
        <div class="w-full text-start mt-2" @click="getToday">
            <BaseButton class="rounded w-5/12 py-[6px] text-sm">Today</BaseButton>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import BaseButton from '../BaseButton.vue';

defineProps({ show: { type: Boolean, default: true, } });

const showYears = ref(false);
const showMonths = ref(false);
const month = ref(new Date().getMonth());
const year = ref(new Date().getFullYear());
const currentDay = ref(new Date().getDate());
const years = reactive([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
const weekdays = reactive(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
const months = reactive(["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"]);


const daysInMonth = computed(() => new Date(year.value, month.value + 1, 0).getDate());
const firstDayOfMonth = computed(() => new Date(year.value, month.value, 1).getDay());
const lastMonthDays = computed(() => {
    const lastDayOfPrevMonth = new Date(year.value, month.value, 0).getDate();
    return Array.from({ length: firstDayOfMonth.value }, (_, i) => lastDayOfPrevMonth - firstDayOfMonth.value + i + 1);
});

const getToday = () => {
    currentDay.value = new Date().getDate();
    month.value = new Date().getMonth();
    year.value = new Date().getFullYear();
};

const prevMonth = () => {
    showYears.value = false;
    showMonths.value = false;
    if (month.value === 0) {
        month.value = 11;
        year.value--;
    } else { month.value--; }
};

const nextMonth = () => {
    showYears.value = false;
    showMonths.value = false;
    if (month.value === 11) {
        month.value = 0;
        year.value++;
    } else { month.value++; }
};

const daySelected = (day) => currentDay.value = day;
</script>