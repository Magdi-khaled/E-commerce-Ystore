<template>
    <div class="calendar text-gray-800">
        <div class="header relative">
            <button @click="prevMonth">◀</button>
            <h2 class="font-medium text-md cursor-pointer" @click="showMonths = !showMonths, showYears = false">{{
                months[month] }}</h2>
            <h2 class="font-medium text-md cursor-pointer" @click="showYears = !showYears, showMonths = false">{{ year
                }}
            </h2>

            <div v-if="showMonths"
                class="years absolute z-10 top-[94%] left-[10%] w-32 h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded shadow-md">
                <div v-for="(index, imonth) in months" :key="imonth" @click="this.month = imonth, showMonths = false"
                    class="cursor-pointer">
                    {{ months[imonth] }}
                    <hr>
                </div>
            </div>
            <div v-if="showYears"
                class="years absolute z-10 top-[94%] right-[5%] w-32 h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded shadow-md">
                <div v-for="iyear in years" :key="iyear" @click="this.year = iyear, showYears = false"
                    class="cursor-pointer">
                    {{ iyear }}
                    <hr>
                </div>
            </div>
            <button @click="nextMonth">▶</button>
        </div>
        <div class="weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
        </div>
        <div class="days">
            <div v-for="day in lastMonthDays" :key="'last-' + day" class="day opacity-50">
                {{ day }}
            </div>
            <div v-for="day in daysInMonth" :key="day" class="day cursor-pointer" @click="this.day = day"
                :class="{ today: this.day === day }">
                {{ day }}
            </div>
        </div>
        <div class="w-full text-start mt-2" @click="getToday">
            <BaseButton class="rounded w-5/12 py-[6px] text-sm">Today</BaseButton>
        </div>
    </div>
</template>

<script>
import BaseButton from '../BaseButton.vue';
export default {
    name: 'Calendar',
    props: {
        show: {
            type: Boolean,
            default: true
        }
    },
    components: { BaseButton },
    data() {
        return {
            showYears: false,
            showMonths: false,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            day: new Date().getDate(),
            years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
                2019, 2020, 2021, 2022, 2023, 2024, 2025],
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        };
    },
    computed: {
        daysInMonth() {
            return new Date(this.year, this.month + 1, 0).getDate();
        },
        firstDayOfMonth() {
            return new Date(this.year, this.month, 1).getDay();
        },
        blankDays() {
            return Array.from({
                length: this.firstDayOfMonth
            }, (_, i) => {
                return this.firstDayOfMonth;
            });
        },
        monthName() {
            return this.monthNames[this.month];
        },
        lastMonthDays() {
            const lastDayOfPrevMonth = new Date(this.year, this.month, 0).getDate();
            return Array.from({ length: this.firstDayOfMonth }, (_, i) => lastDayOfPrevMonth - this.firstDayOfMonth + i + 1);
        }

    },
    methods: {
        getToday() {
            this.day = new Date().getDate();
            this.month = new Date().getMonth();
            this.year = new Date().getFullYear();
        },
        prevMonth() {
            this.showYears = false;
            this.showMonths = false;
            if (this.month === 0) {
                this.month = 11;
                this.year--;
            } else {
                this.month--;
            }
        },
        nextMonth() {
            this.showYears = false;
            this.showMonths = false;
            if (this.month === 11) {
                this.month = 0;
                this.year++;
            } else {
                this.month++;
            }
        },
    },
};
</script>

<style scoped>
.calendar {

    max-width: 400px;
    margin: auto;
    text-align: center;
}

.blank {
    color: #aaa;
    font-size: small;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.weekdays,
.days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.weekday {
    font-weight: normal;
    font-size: small;
    text-transform: uppercase;
    margin-bottom: 4px;
}

.day {
    font-weight: normal;
    font-size: medium;
    padding: 7px 6px;
    text-align: center;
}



.blank {
    visibility: hidden;
}

.today {
    background-color: #2f2f2f;
    border-radius: 50%;
    outline: 3px #2f2f2f66 solid;
    color: #fff;
    font-weight: bold;
}
</style>