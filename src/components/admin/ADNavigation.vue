<template>
    <!-- hidden navbar -->
    <nav class="admin-navbar flex items-center justify-between px-2 sm:px-6 py-2 bg-white"
        :class="[$attrs.class, { 'sm:px-[14px]': dashboard }]">
        <div class="w-8/12 lg:w-full flex items-center justify-between"
            :class="{ 'justify-end': sm, 'w-full': !show || full }">
            <div v-if="this.$route.name === 'AD-Dashboard'" class="pr-4">
                <button v-if="!medium && dashboard" @click="handleSide" class="text-xl hover:text-gray-600">
                    <i v-if="show" class="fa-regular fa-left-to-line"></i>
                    <i v-else class="fa-solid fa-bars"></i>
                </button>
                <button v-else-if="medium && dashboard" @click="handleSmallSide"
                    class="text-xl hover:text-gray-600 pr-4">
                    <i class="fa-regular fa-bars text-md"></i>
                </button>
            </div>
            <div class="w-5/12 md:w-3/12 lg:w-2/12 px-1">
                <img class="w-6/12" src="../../assets/images/logo/logo.webp" alt="shop.co">
            </div>
            <label v-if="!sm" for="dashboardSearch" class="w-8/12 relative"
                :class="{ 'w-8/12': !show, 'w-full': medium }">
                <i class=" absolute top-3 left-3 fa-sharp fa-light fa-magnifying-glass font-bold text-gray-500"></i>
                <input type="text" name="dashboardSearch" id="dashboardSearch"
                    class="pl-8 w-11/12 bg-gray-100 p-2 border-[1px] outline-none border-gray-400 text-sm sm:text-md"
                    placeholder="Search for sechdules and products..." v-model="searchTxt">
            </label>

            <div class="w-5/12 md:w-3/12 flex justify-between items-center">
                <div class="flex gap-2 sm:gap-3 md:gap-4">
                    <button class=""
                        @click="this.$router.push({ name: 'AD-Shop', params: { shopName: shopName, sId: sId } })"
                        title="Your Shop Profile">
                        <i class="fa-sharp fa-regular fa-store p-1 mr-2 text-xl md:text-2xl"></i>
                    </button>
                    <button class="">
                        <i class="fa-sharp fa-regular fa-messages text-xl md:text-2xl"></i>
                    </button>
                </div>
                <BaseButton
                    class="text-white font-bold text-sm lg:text-md ml-2 py-[2px] px-1 whitespace-nowrap rounded">
                    Sign out
                </BaseButton>
            </div>
        </div>
    </nav>
    <hr>
    <div v-if="sm" class="w-full p-2 bg-white">
        <label for="sdashboardSearch" class="relative">
            <i class=" absolute top-[5%] left-[3%] fa-sharp fa-light fa-magnifying-glass
            font-bold text-gray-500 text-sm"></i>
            <input type="text" name="sdashboardSearch" id="sdashboardSearch"
                class="pl-8 w-full p-2 outline-none border-[1px] border-gray-400 text-sm"
                placeholder="Search for sechdules and products..." v-model="searchTxt">
            <ul v-if="searchTxt" class=" absolute bg-white w-full z-50 rounded-b">
                <template v-for="item in handleSearchResult" :key="index">
                    <li class="hover:bg-[#2f2f2f] hover:text-white px-10 py-2 cursor-pointer">{{ item }}
                    </li>
                </template>
            </ul>
        </label>
    </div>
    <hr>
</template>

<script>
import BaseButton from '../../components/BaseButton.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
export default {
    name: 'ADNavigation',
    components: { BaseButton },
    props: {
        medium: Boolean,
        dashboard: Boolean,
    },
    data() {
        return {
            sId: 6554437,
            shopName: 'Xzen-Shop',
            inheritAttrs: false, // to prevent inheriting class from parent
            full: true,
            searchTxt: '',
            result: false,
        }
    },
    methods: {
        handleSearchResult() {
            const searchedList = this.schedules.filter((item) =>
                item.toString().includes(this.searchText)
            );
            console.log('searching...');
            setTimeout(() => {
                this.result = false;
            }, 1000);
            this.result = true;
            return searchedList;
        },
        handleSide() {
            this.show = !this.show;
            this.$emit('toggleSidebar', this.computedShow);
        },
        handleSmallSide() {
            this.show = true;
            this.full = true;
            this.$emit('toggleSidebar', this.computedShow);
        },
        showChange(val) {
            this.show = val;
        }
    },
    computed: {
        computedShow: {
            get() {
                return this.show;
            },
            set(show) {
                this.show = show;
            }
        }
        // showSide() {
        //     if (window.innerWidth <= 1150) this.show = false;
        //     else this.show = true;
        //     return this.show;
        // },
    },
    setup(_, { emit }) {
        // const smNav = ref(window.innerWidth > 1020);
        const show = ref(window.innerWidth > 1020);
        const sm = ref(window.innerWidth < 620);

        const updateShow = () => {
            show.value = window.innerWidth > 1020;

            emit('toggleSidebar', show);
            sm.value = window.innerWidth < 620;
        };
        onMounted(() => {
            window.addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateShow);
        });
        return { show, sm };
    },
    mounted() {
        this.$emit('toggleSidebar', this.computedShow);
    }

}
</script>

<style scoped></style>