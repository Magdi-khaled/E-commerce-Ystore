<template>
    <div class="filter hidden md:block w-3/12 bg-white h-fit border-2 rounded-xl p-6"
        :style="(showFilter && !hideFitler) ? FilterStyle : {}">
        <div class="filter-header flex justify-between pb-4 text-xl md:text-2xl">
            <h1 class="capitalize font-sans font-bold">filters</h1>
            <button v-if="hideFitler" class="rounded-full text-gray-500" disabled>
                <img src="../../assets/images/icons/filter.png" alt="filter-icon">
            </button>
            <button v-else @click="$emit('closeFilter')">
                <i class="fa-sharp fa-solid fa-xmark text-2xl"></i>
            </button>
        </div>
        <hr>
        <div v-for="item in clothes" class="clothes mt-4 text-gray-500">
            <div class="flex flex-wrap justify-between items-center">
                <button @click="item.show = !item.show" :class="{ 'text-black': item.show }"
                    class="capitalize font-bold flex justify-between w-full outline-none">
                    {{ item.type }}
                    <i class="fa-regular fa-chevron-right"></i>
                </button>
                <div v-if="item.show" class="pl-4 text-black w-full">
                    <ul v-for="item in item.looks">
                        <input type="radio" v-model="clothesType" :value="item" :id="item">
                        <label :for="item" class="text-md font-bold capitalize pl-2">{{ item }}</label>
                    </ul>
                </div>
            </div>
        </div>
        <hr class="my-4">
        <div>
            <h1 class="capitalize font-bold py-4 text-md md:text-xl flex justify-between w-full outline-none">
                price
                <button @click="pricing = !pricing">
                    <i v-if="!pricing" class="fa-sharp-duotone fa-regular fa-angle-up text-md"></i>
                    <i v-else class="fa-regular fa-chevron-down text-md"></i>
                </button>
            </h1>
            <div :class="{ active: pricing }" class="priceRange mb-12">
                <!-- Slider Container -->
                <div ref="slider" class="my-2 "></div>
            </div>
        </div>
        <hr class="my-4">
        <div>
            <h1 class="capitalize font-bold py-4 text-md md:text-xl flex justify-between w-full outline-none">
                colors
                <button @click="coloring = !coloring">
                    <i v-if="!coloring" class="fa-sharp-duotone fa-regular fa-angle-up text-md"></i>
                    <i v-else class="fa-regular fa-chevron-down text-md"></i>
                </button>
            </h1>
            <div :class="{ active: coloring }" class="colors w-full mb-4 flex flex-wrap">
                <label v-for="colorItem in colorList" class="relative">
                    <input type="radio" v-model="color" :value="colorItem.color"
                        class="appearance-none w-7 lg:w-10 h-7 lg:h-10 m-1 border-2 border-gray-400 cursor-pointer rounded-full "
                        :class="{ 'outline outline-2 outline-black': color == colorItem.color }"
                        :style="{ 'background-color': `#${colorItem.value}` }">
                    <i v-if="color" class="fa-solid fa-check text-white absolute z-30 py-3 px-4 text-2xl"
                        :class="{ 'hidden': color != colorItem.color }"></i>
                </label>
                <p class="font-bold capitalize">
                    ( <i class="fa-regular fa-palette"></i> ) selected color:
                    <span :style="{ 'color': `#${selectedColor.value}` }">
                        {{ selectedColor.color }}</span>
                    <span class="text-gray-400" v-if="!color">none </span>
                </p>
            </div>
        </div>
        <hr class="my-4">
        <div>
            <h1 class="capitalize font-bold py-4 text-md md:text-xl flex justify-between w-full outline-none">
                size
                <button @click="sizing = !sizing">
                    <i v-if="!sizing" class="fa-sharp-duotone fa-regular fa-angle-up text-md"></i>
                    <i v-else class="fa-regular fa-chevron-down text-md"></i>
                </button>
            </h1>
            <div :class="{ active: sizing }" class="sizing flex flex-wrap ">
                <div v-for="sizeType in sizeList">
                    <input type="checkbox" :id="sizeType" class="p-2 m-1 rounded-md font-bold border-2"
                        v-model="sizchoosenArr" :value="sizeType"
                        :class="{ 'outline outline-2 outline-black': selectedSize == sizeType }">
                    <label :for="sizeType" class="font-bold capitalize">{{ sizeType }}</label>
                </div>
                <p class="mt-2 w-full font-bold capitalize">
                    ( <i class="fa-solid fa-text-size text-gray-400"></i> ) selected sizes:
                <div v-if="sizchoosenArr.length">
                    <ul v-for="size in sizchoosenArr" :key="size" class="flex w-full">
                        <li class="w-5/12"><i class="fa-solid fa-minus"></i> {{ size }}</li>
                    </ul>
                </div>
                <span v-else class="text-gray-400">none </span>
                </p>
            </div>
        </div>
        <hr class="my-4">
        <div>
            <h1 class="capitalize font-bold py-4 text-md md:text-xl flex justify-between w-full outline-none">
                dress style
                <button @click="styling = !styling">
                    <i v-if="!styling" class="fa-sharp-duotone fa-regular fa-angle-up text-md"></i>
                    <i v-else class="fa-regular fa-chevron-down text-md"></i>
                </button>
            </h1>
            <div :class="{ active: styling }" v-for="item in styles" class="styling mt-4 text-gray-500">
                <div class="flex flex-wrap justify-between items-center">
                    <button @click="item.show = !item.show" :class="{ 'text-black': item.show }"
                        class="capitalize font-bold flex justify-between w-full outline-none">
                        {{ item.type }}
                        <i class="fa-regular fa-chevron-right"></i>
                    </button>
                    <div v-if="item.show" class="pl-4 text-black w-full">
                        <ul v-for="item in item.looks">
                            <input type="radio" v-model="clothesType" :value="item" :id="item">
                            <label :for="item" class="text-md font-bold capitalize pl-2">{{ item }}</label>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <hr class="my-4">
        <div>
            <baseButton @click="applyFilters">
                apply filters
            </baseButton>
        </div>
    </div>
</template>
<script>
import baseButton from '../../components/baseButton.vue';
import noUiSlider from 'nouislider';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
    name: 'filterShopComponent',
    props: {
        showFilter: {
            type: Boolean,
            required: true
        }
    },
    components: { baseButton },
    data() {
        return {
            color: '',
            clothesType: '',
            selectedSize: null,
            sizchoosenArr: [],
            clothes: [
                { type: 't-shirts', looks: ['polo', 'oversize'], show: false },
                { type: 'shorts', looks: ['jeans', 'likra'], show: false },
                { type: 'shirts', looks: ['striped', 'formal'], show: false },
                { type: 'hoodies', looks: ['paints', 'no-paints'], show: false },
                { type: 'jeans', looks: ['slimfit', 'boy friend', 'chino', 'pants'], show: false },
            ],
            colorList: [
                { color: '', value: '', },
                { color: 'green', value: '00C12B', },
                { color: 'red', value: 'F50606', },
                { color: 'yellow', value: 'F5DD06', },
                { color: 'orange', value: 'F57906', },
                { color: 'babyblue', value: '06CAF5', },
                { color: 'blue', value: '063AF5', },
                { color: 'purple', value: '7D06F5', },
                { color: 'pink', value: 'F506A4', },
                { color: 'white', value: 'c8c8c8', },
                { color: 'black', value: '000000', }
            ],
            sizeList: ['xX-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xX-large', '3X-large', '4X-large'],
            styles: [
                { type: 'casual', looks: ['c-men', 'c-women'], show: false },
                { type: 'formal', looks: ['f-men', 'f-women'], show: false },
                { type: 'party', looks: ['p-men', 'p-women'], show: false },
                { type: 'gym', looks: ['g-men', 'g-women'], show: false },
            ],
            FilterStyle: {
                display: 'block',
                position: "fixed",
                marginTop: "5.5rem",
                zIndex: "30",
                background: "white",
                width: "100%",
                left: "0",
                top: "0",
                borderRadius: "20px",
                height: "calc(100vh - 5rem)",
                overflowY: "auto"
            }
        }
    },
    created() { },
    computed: {
        colortype() {
            return this.colorList.find((v) => this.color == v.color);
        },
        selectedColor() {
            var selectedColor = '';
            this.colorList.forEach((v) => {
                if (this.color === v.color) {
                    selectedColor = v;
                }
            });
            return selectedColor;
        }
    },
    setup() {
        const pricing = ref(false);
        const coloring = ref(false);
        const sizing = ref(false);
        const styling = ref(false);
        const FiltersOn = ref(false);
        const hideFitler = ref(window.innerWidth > 766);
        const slider = ref(null);
        const priceRange = ref([850, 2400]);

        const updateShow = () => {
            hideFitler.value = window.innerWidth > 766;

        }
        onBeforeUnmount(() => {
            addEventListener('resize', updateShow);
        })
        onMounted(() => {
            addEventListener('resize', updateShow);
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
                    to: (value) => `<h1 class='font-bold'>$  ${Math.round(value)} </h1> `,
                    from: (value) => Number(value),
                },
            });
            slider.value.noUiSlider.on('update', (values) => {
                priceRange.value = values.map(Number);
            });
        });
        return { pricing, coloring, sizing, styling, priceRange, slider, FiltersOn, hideFitler };
    },
    methods: {
        applyFilters() { this.FiltersOn = true; },
    }
};
</script>
<style scoped>
.noUi-target {
    height: 8px;
    background-color: rgb(227, 227, 227);
    border: none;
}

:deep(.noUi-connect) {
    background: #000;
}

:deep(.noUi-handle) {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background-color: #000;
    box-shadow: none;
}

:deep(.noUi-horizontal .noUi-handle) {
    right: -4px;
    top: -7px;
    color: #000;
    background-color: #000;
}

:deep(.noUi-handle:before, .noUi-handle:after) {
    color: #000;
    background: black;
}

.priceRange,
.dressStyle,
.styling {
    display: block;
    transition: all 0.5s ease-in-out;
}

.priceRange.active,
.colors.active,
.sizing.active,
.styling.active,
.dressStyle.active {
    display: none;
}

.colors input[value='']:first-child {
    position: relative;
}

.colors input[value='']:first-child::before {
    content: "";
    position: absolute;
    background-color: red;
    width: 5px;
    height: 100%;
    transform: rotateZ(-45deg);
    left: 43%;
    border: 1px solid rgba(0, 0, 0, 0.497);
}

.fa-check {
    left: -4%;
    bottom: 4%;
}

:deep(.noUi-horizontal .noUi-tooltip) {
    background-color: transparent;
    border: none;
    top: 90%;
}

@media (max-width:656px) {
    .filter {
        position: absolute;
        z-index: 30;
        background: white;
        width: 100%;
        left: 0;
        border-radius: 70px;
        padding-top: 20px;
        scroll-behavior: unset;
        top: 8%;
    }
}
</style>