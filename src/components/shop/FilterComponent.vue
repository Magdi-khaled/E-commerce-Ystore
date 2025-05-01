<script setup>
import data from "@/composables/shop.categories.data.js";
import noUiSlider from "nouislider";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { routeMapping } from "@/composables/useUtils.js";

defineProps({ show: { type: Boolean, required: true } });

const toggleFilter = defineModel('toggleFilter');
const allT = ref(sessionStorage.getItem("allT") ?? 'all fashion');
const route = useRoute();
const router = useRouter();
const pricing = ref(true);
const coloring = ref(true);
const sizing = ref(true);
const color = ref("");
const clothesType = ref([]);
const selectedSize = ref([]);
const catList = data.categories;
const colorList = data.colorList;
const sizeList = data.sizeList;
const FilterStyle = data.filterStyle;
const filterOptions = ref([]);
const slider = ref(null);
const priceRange = ref([580, 2400]);


watch(allT, async (newValue) => {
    const routeName = routeMapping[newValue];
    if (routeName) {
        try {
            await router.push({ name: routeName });
            window.location.reload();
        } catch (err) {
            console.error("Navigation error:", err);
        }
    }
});

watch(route, () => {
    allT.value = sessionStorage.getItem("allT") || "";
});
const selectedColor = computed(() => {
    var selectedColor = "";
    colorList.forEach((v) => {
        if (color.value === v.color) {
            selectedColor = v;
        }
    });
    return selectedColor;
});
const allv = computed(() => {
    sessionStorage.setItem('allT', allT.value);
    return allT.value;
});
const choices = (category) => {
    return filterOptions.value.includes(category.name) || category.label === allv.value;
};
const filter = (category) => {
    const indx = filterOptions.value.findIndex(c => c === category.name);

    (indx === -1) ? filterOptions.value.push(category.name) :
        filterOptions.value.splice(indx, 1);

    category.show = !category.show;
    console.log(filterOptions.value);
    return category.show;
};

onMounted(() => {
    noUiSlider.create(slider.value, {
        start: priceRange.value,
        connect: true,
        range: { min: 0, max: 3000 },
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
</script>

<template>
    <Transition class="fade">
        <div class="hidden md:block w-3/12 bg-white h-fit rounded-md" :style="show ? FilterStyle : {}">
            <div v-if="show" class="flex justify-between border-b-2 pb-4 text-xl">
                <h1 class="capitalize font-semibold">filters</h1>
                <button @click="toggleFilter = false">
                    <i class="fa-solid fa-xmark text-xl sm:text-2xl hover:text-gray-500"></i>
                </button>
            </div>
            <div class="hidden">{{ allv }}</div>
            <!-- all fashion -->
            <div class="my-2">
                <label for="all-f" class="pl-2 px-40 flex items-center cursor-pointer capitalize text-sm">
                    <input type="checkbox" id="all-f" @click="allT = 'all fashion'"
                        class="appearance-none fa-duotone fa-solid fa-check text-gray-400 text-[12px] w-[15px] h-[14px] border-2 border-gray-400 rounded-sm cursor-pointer"
                        :class="{ 'bg-gray-700 text-white border-none px-[2px] pt-[1px]': allT === 'all fashion' || allT === '' }" />
                    <p class="whitespace-nowrap font-normal">all fashion</p>
                </label>
            </div>
            <!-- clothes -->
            <div v-for="category in catList.slice(1, 12)" class="clothes mt-4 text-gray-600 text-sm">
                <button v-if="category.label !== 'all fashion'" @click="filter(category)"
                    :class="{ 'text-blue-500': category.show }"
                    class="capitalize flex justify-start items-center gap-2">
                    <i v-if="category.show" class="fa-duotone fa-solid fa-minus text-sm text-blue-600"></i>
                    <i v-else class="fa-duotone fa-solid fa-plus text-sm text-gray-900"></i>
                    {{ category.name }}
                </button>
                <template v-if="choices(category)">
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
                            <button v-if="item.categories" @click="filter(item)"
                                :class="{ 'text-blue-500': item?.show }"
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
                            <div v-if="item?.show && item.categories" class="pl-12 text-black w-full">
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
</template>

<style scoped>
@import "@/assets/css/shop/shop-filter.css";
</style>
