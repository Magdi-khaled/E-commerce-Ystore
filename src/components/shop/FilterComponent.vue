<template>

    <!-- <Teleport v-if="!hideFitler" to='body'> -->
    <Transition class="fade">
        <div class="filter hidden md:block w-3/12 bg-white h-fit rounded-md"
            :style="showFilter && !hideFitler ? FilterStyle : {}">
            <div v-if="!hideFitler" class="filter-header flex justify-between pb-4 text-xl">
                <h1 class="capitalize font-semibold">filters</h1>
                <button @click="$emit('closeFilter')">
                    <i class="fa-solid fa-xmark text-xl sm:text-2xl hover:text-gray-500"></i>
                </button>
            </div>
            <hr v-if="!hideFitler" />
            <div class="hidden">{{ allv }}</div>
            <div class="my-2">
                <label for="all-f" class="pl-2 px-40 flex items-center cursor-pointer capitalize text-sm">
                    <input type="checkbox" id="all-f" @click="allT = 'all fashion'"
                        class="appearance-none fa-duotone fa-solid fa-check text-gray-400 text-[12px] w-[15px] h-[14px] border-2 border-gray-400 rounded-sm cursor-pointer"
                        :class="{ 'bg-gray-700 text-white border-none px-[2px] pt-[1px]': allT === 'all fashion' }" />
                    <p class="whitespace-nowrap font-normal">all fashion</p>
                </label>
            </div>
            <!-- clothes -->
            <div v-for="category in catList" class="clothes mt-4 text-gray-600 text-sm">
                <button v-if="category.label !== 'all fashion'" @click="category.show = !category.show"
                    :class="{ 'text-blue-500': category.show }"
                    class="capitalize flex justify-start items-center gap-2">
                    <i v-if="category.show" class="fa-duotone fa-solid fa-minus text-sm text-blue-600"></i>
                    <i v-else class="fa-duotone fa-solid fa-plus text-sm text-gray-900"></i>
                    {{ category.name }}
                </button>
                <template v-if="handleSelectedFilter() && category.show && category.label !== 'all fashion'">
                    <label :for="category.label" class="pl-5 py-1 w-[55%] flex items-center cursor-pointer capitalize">
                        <input type="checkbox" :value="category.label" :id="category.label"
                            @click="allT = category.label"
                            class="appearance-none fa-duotone fa-solid fa-check text-gray-400 text-[12px] w-[15px] h-[14px] border-2 border-gray-400 rounded-sm cursor-pointer"
                            :class="{
                                'bg-gray-700 text-white border-none px-[2px] pt-[1px]':
                                    allT === category.label,
                            }" />
                        <p class="whitespace-nowrap">{{ category.label }}</p>
                    </label>

                    <template v-if="category.categories">
                        <div v-for="item in category.categories"
                            class="pl-3 py-1 flex flex-wrap justify-between items-center">
                            <button v-if="item.categories" @click="item.show = !item.show"
                                :class="{ 'text-blue-500': item.show }"
                                class="capitalize flex justify-start items-center gap-2">
                                <i v-if="item.show" class="fa-duotone fa-solid fa-minus text-sm text-blue-600"></i>
                                <i v-else class="fa-duotone fa-solid fa-plus text-sm text-gray-900"></i>
                                {{ item.name }}
                            </button>
                            <label v-else class="pl-2 w-6/12 flex items-center cursor-pointer capitalize">
                                <input type="checkbox" v-model="clothesType" :value="item.name" :id="item.name" class="appearance-none fa-duotone fa-solid fa-check text-gray-400 text-xs 
                                w-[15px] h-[15px] border-2 border-gray-400 rounded-sm cursor-pointer" :class="{
                                    'bg-gray-700 text-white border-none pl-[2px]':
                                        clothesType.includes(item.name),
                                }" />
                                <span class="whitespace-nowrap">{{ item.name }}</span>
                            </label>
                            <div v-if="item.show && item.categories" class="pl-12 text-black w-full">
                                <hr class="my-1" />
                                <ul v-for="itemn in item.categories" :key="itemn">
                                    <label class="w-full flex items-center cursor-pointer">
                                        <input type="checkbox" v-model="clothesType" :value="itemn.name" :id="itemn"
                                            class="appearance-none fa-duotone fa-solid fa-check text-gray-400 text-xs w-[15px] h-[15px] border-2 border-gray-400 rounded-sm cursor-pointer"
                                            :class="{
                                                'bg-gray-700 text-white border-none pl-[2px]':
                                                    clothesType.includes(itemn.name),
                                            }" />
                                        <span class="whitespace-nowrap">{{ itemn.name }}</span>
                                    </label>
                                </ul>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
            <hr class="my-4" />
            <!-- pricing -->
            <div>
                <button @click="pricing = !pricing"
                    class="capitalize mb-8 font-bold p-2 text-md flex justify-between items-center w-full rounded-sm bg-gray-100">
                    price
                    <i v-if="pricing" class="fa-regular fa-chevron-up text-md text-gray-700 font-bold"></i>
                    <i v-else class="fa-regular fa-chevron-down text-md text-gray-700 font-bold"></i>
                </button>

                <div :class="{ active: !pricing }" class="priceRange mb-12 px-2">
                    <!-- Slider Container -->
                    <div ref="slider" class="my-2"></div>
                </div>
            </div>
            <!-- colouring -->
            <div>
                <button @click="coloring = !coloring"
                    class="capitalize mb-8 font-bold p-2 text-md flex justify-between items-center w-full rounded-sm bg-gray-100">
                    colour
                    <i v-if="coloring" class="fa-regular fa-chevron-up text-md text-gray-700 font-bold"></i>
                    <i v-else class="fa-regular fa-chevron-down text-md text-gray-700 font-bold"></i>
                </button>

                <div :class="{ active: !coloring }" class="colors w-full mb-4">
                    <label :for="colorItem.color" v-for="colorItem in colorList" class="relative">
                        <input type="radio" v-model="color" :value="colorItem.color" :id="colorItem.color"
                            class="appearance-none w-6 h-6 m-1 border-2 border-gray-400 cursor-pointer rounded-sm"
                            :class="{
                                'outline outline-2 outline-black': color == colorItem.color,
                            }" :style="{ 'background-color': `#${colorItem.value}` }" />
                        <i v-if="color" class="fa-solid fa-check text-gray-700 absolute py-2 px-3 text-lg"
                            :class="{ hidden: color != colorItem.color }"></i>
                    </label>
                    <p class="font-bold capitalize">
                        ( <i class="fa-regular fa-palette"></i> ) :
                        <span v-if="color" :style="{ color: `#${selectedColor.value}` }" class="text-sm">
                            [{{ selectedColor.color }}]</span>
                        <span class="text-gray-400 font-normal" v-if="!color">[ all ]</span>
                    </p>
                </div>
            </div>
            <!-- size -->
            <div>
                <button @click="sizing = !sizing"
                    class="capitalize mb-8 font-bold p-2 text-md flex justify-between items-center w-full rounded-sm bg-gray-100">
                    size
                    <i v-if="sizing" class="fa-regular fa-chevron-up text-md text-gray-700 font-bold"></i>
                    <i v-else class="fa-regular fa-chevron-down text-md text-gray-700 font-bold"></i>
                </button>

                <div :class="{ active: !sizing }" class="sizing px-8">
                    <div class="colors grid grid-cols-2 gap-1 mb-4 px-6 md:px-0">
                        <label v-for="item in sizeList" :key="item" class="w-full flex items-center cursor-pointer">
                            <input type="checkbox" v-model="selectedSize" :value="item.key" :id="item.key"
                                class="appearance-none fa-duotone fa-solid fa-check text-gray-400 text-xs w-[15px] h-[15px] border-2 border-gray-400 rounded-sm cursor-pointer"
                                :class="{
                                    'border-none bg-gray-700 text-white pl-[2px]':
                                        selectedSize.includes(item.key) || item.key === 'All Size',
                                }" />
                            <span class="pl-2 whitespace-nowrap">{{ item.key }}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
    <!-- </Teleport> -->
</template>
<script>
import BaseButton from "../../components/BaseButton.vue";
import db from "../../assets/db/shop.categories.data.json";
import noUiSlider from "nouislider";
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
    name: "filterShopComponent",
    props: {
        showFilter: {
            type: Boolean,
            required: true,
        },
    },
    components: { BaseButton },
    data() {
        return {
            allT: sessionStorage.getItem('allT') || '',
            pricing: true,
            coloring: true,
            sizing: true,
            styling: false,
            FiltersOn: false,
            check: true,
            color: "",
            clothesType: [],
            selectedSize: [],
            catList: db.categories,
            colorList: db.colorList,
            sizeList: db.sizeList,
            FilterStyle: db.filterStyle,
        };
    },
    async created() {
        await sessionStorage.setItem('allT', 'all fashion');
    },
    watch: {
        allT(newValue, oldValue) {
            const routeMapping = {
                "all fashion": "Shop",
                "all women's fashion": "women-fashion",
                "all men's fashion": "men-fashion",
                "all bags & luggage": "bags-luggage",
                "all shoes": "shoes-fashion",
                "all accessories": "accessories",
                "all sport wear": "sport-wear",
                "all girls fashion": "girls-wear",
                "all boys fashion": "boys-wear",
                "all formal wear": "formal-wear",
            };
            const routeName = routeMapping[newValue];

            if (routeName) {
                this.$router.push({ name: routeName }).then(() => {
                    window.location.reload();
                }).catch((err) => {
                    console.error("Navigation error:", err);
                });
            }
        },
        $route(to, from) {
            // this.fetchData(); // Function to fetch new data when the route changes
            this.$nextTick(() => {
                this.allT = sessionStorage.getItem('allT') || '';
            });
        },
    },
    computed: {
        selectedColor() {
            var selectedColor = "";
            this.colorList.forEach((v) => {
                if (this.color === v.color) {
                    selectedColor = v;
                }
            });
            return selectedColor;
        },
        allv() {
            sessionStorage.setItem('allT', this.allT);
            return this.allT;
        },
    },
    setup() {
        const hideFitler = ref(window.innerWidth > 766);
        const slider = ref(null);
        const priceRange = ref([520, 2400]);

        const updateShow = () => {
            hideFitler.value = window.innerWidth > 766;
        };
        onBeforeUnmount(() => {
            addEventListener("resize", updateShow);
        });

        onMounted(() => {
            addEventListener("resize", updateShow);
            noUiSlider.create(slider.value, {
                start: priceRange.value,
                connect: true,
                range: {
                    min: 0,
                    max: 3000,
                },
                step: 10,
                tooltips: [true, true],
                format: {
                    to: (value) => `<h1 class='font-bold text-sm'>
                        <span class='text-gray-600 text-xs'>EGP</span> ${Math.round(
                        value
                    )} </h1> `,
                    from: (value) => Number(value),
                },
            });
            slider.value.noUiSlider.on("update", (values) => {
                priceRange.value = values.map(Number);
            });
        });
        return { priceRange, slider, hideFitler };
    },
    methods: {
        handleSelectedFilter() {
            const category = this.catList.find(v => v.label === this.allT);
            category.show = true;
            return category?.show;
        }
    },
};
</script>
<style scoped>
@import "@/assets/css/shop/shop-filter.css";

.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
