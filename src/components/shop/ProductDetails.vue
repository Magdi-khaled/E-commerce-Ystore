<script setup>
defineProps({ product: { type: Object, required: true } });
</script>

<template>
    <div data-aos="fade-up">
        <div>
            <h1 class="font-medium font-sans text-xl">Producet details</h1>
        </div>
        <div class="my-3 ml-0 sm:ml-2">
            <table class="text-sm sm:text-md w-full md:w-8/12">
                <tbody>
                    <tr class="border-t-[1px] border-t-[#bbbfbf]">
                        <td class="w-5/12 bg-[#f0f2f2] text-gray-700 p-2">Title</td>
                        <td class="capitalize text-black p-2">
                            {{ product.title }}
                        </td>
                    </tr>
                    <tr class="border-t-[1px] border-t-[#bbbfbf]">
                        <td class="bg-[#f0f2f2] text-gray-700 p-2">
                            Date first available
                        </td>
                        <td class="text-black p-2">
                            9 July 2023
                        </td>
                    </tr>
                    <tr class="border-t-[1px] border-t-[#bbbfbf]">
                        <td class="bg-[#f0f2f2] text-gray-700 p-2">
                            Department
                        </td>
                        <td class="text-black p-2">
                            Men's winter wear <i class="fa-regular fa-snowflake text-xs"></i>
                        </td>
                    </tr>
                    <tr class="border-t-[1px] border-t-[#bbbfbf]">
                        <td class="capitalize bg-[#f0f2f2] text-gray-700 p-2">
                            Manufacturer
                        </td>
                        <td class="text-black p-2">
                            SHOP.CO </td>
                    </tr>
                    <tr class=" border-t-[1px] border-t-[#bbbfbf]">
                        <td class="capitalize bg-[#f0f2f2]  text-gray-700 p-2">
                            material
                        </td>
                        <td class="text-black p-2 capitalize">
                            {{ product?.material }}
                        </td>
                    </tr>
                    <tr class="border-y-[1px] border-y-[#bbbfbf]">
                        <td class="capitalize bg-[#f0f2f2]  text-gray-700 p-2">
                            package dimensions
                        </td>
                        <td class="text-black p-2">
                            22.9 x 13 x 5.9 cm - 200 g
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>