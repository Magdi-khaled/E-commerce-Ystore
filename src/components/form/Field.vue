<script setup>
import { useField } from 'vee-validate';
import { defineEmits, defineProps, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    label: String,
    name: String,
    placeholder: String,
    modelValue: [String, Number, Array, File],
    minLen: Number || undefined,
    maxLen: Number || undefined,
    type: {
        type: String,
        default: 'text',
        validator: (value) => ['text', 'number', 'email', 'password', 'file', 'radio', 'checkbox', 'textarea', 'select'].includes(value)
    },
    hide: { type: Boolean },
    optional: { type: Boolean },
    // Select variables
    options: { type: Array, default: () => [] },
    optionsType: String || undefined,
    // File upload variables
    accept: String,
    multiple: { type: Boolean, default: false },
    // Validation schema
    validator: { type: Object, default: () => ({}) },
    handleChange: { type: Function, default: () => { } },
});

// Initialize form validation 
const { value, errorMessage, validate, setErrors } = useField(
    props.name,
    props.validator,
    { validateOnValueUpdate: false }
);

value.value = props.modelValue;
// Watch `value` to update modelValue
watch(value, (newValue) => {
    emit('update:modelValue', newValue);
});

// Handle blur event for validation
async function handleBlur() {
    await validate();
    // emit('update:modelValue', value.value);
}
// Handle single file upload
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setErrors('');
    emit("update:modelValue", `/assets/shop/${file.name}`);
};
// Handle multiple file uploads
const handleFilesChange = async (event) => {
    const files = event.target.files;
    if (!files) return;

    if (files.length < 3) {
        event.target.value = "";
        emit("update:modelValue", []);
        return;
    } else if (files.length > 4) {
        event.target.value = "";
        emit("update:modelValue", []);
        return;
    }
    setErrors("");
    const filesArray = Array.from(files).map(file => `/assets/shop/${file.name}`);
    emit("update:modelValue", filesArray);
};
</script>

<template>
    <div class="flex flex-col gap-1">
        <!-- Label -->
        <label :for="props.name" :class="{ 'after:content-none': props.hide || props.optional }"
            class="whitespace-nowrap text-sm sm:text-md font-medium capitalize after:content-['*'] after:text-red-600 after:pl-1">
            <i v-if="props.name === 'gender'" class="fa-solid fa-venus-mars pr-1"></i>
            {{ props.label }}
        </label>
        <!-- Textarea -->
        <textarea v-if="props.type === 'textarea'" :id="props.name" :name="props.name" :placeholder="props.placeholder"
            autocomplete="off" class="p-3 lg:p-4 h-[7rem] text-xs lg:text-[14px] tracking-wide outline-0 border-[1px] border-gray-400 focus:border-gray-600
        rounded-lg bg-white focus:bg-[#f8f8f8] focus:scale-[1.001] transition-all duration-200" v-model="value" />
        <!-- Select -->
        <select v-else-if="props.type === 'select'" v-model="value" :name="props.name" :id="props.name"
            @blur="handleBlur" :multiple="props.multiple" class="text-sm sm:text-md py-[12px] px-2 outline-0 border-[1px] border-gray-400 focus:border-gray-600
        rounded-lg bg-white focus:bg-[#f8f8f8] focus:scale-[1.001] transition-all duration-200">
            <option value="">{{ props.optionsType }}</option>
            <option v-for="(item, index) in props.options" :key="index" :value="item" class="capitalize">
                {{ item }}
            </option>
        </select>
        <!-- Single File Input -->
        <input v-else-if="props.type === 'file' && !props.multiple" :type="props.type" :name="props.name"
            :id="props.name" @blur="validate()" @change="handleFileChange" :accept="props.accept" v-model="value" class="text-sm sm:text-md py-3 px-2 outline-0 border-[1px] border-gray-400 focus:border-gray-600
        rounded-lg bg-white focus:bg-[#f8f8f8] focus:scale-[1.001] transition-all duration-200" />
        <!-- Multiple Files Input -->
        <input v-else-if="props.type === 'file' && props.multiple" :type="props.type" :name="props.name"
            :id="props.name" @blur="validate()" @change="handleFilesChange" :accept="props.accept"
            :multiple="props.multiple" class="text-sm sm:text-md py-2 px-2 bg-gray-100 border-[2px] border-b-[3px]
            border-b-gray-600 outline-none text-gray-700 w-full" />
        <!-- Input number, text.... -->
        <input v-else :id="props.name" :name="props.name" :type="props.type" autocomplete="off" :disabled="props.hide"
            @change="handleChange" v-model="value" :placeholder="props.placeholder" class="px-3 lg:px-4 py-3 lg:py-[15px] text-xs lg:text-[14px] tracking-wide outline-0 border-[1px] border-gray-400 focus:border-gray-600
            rounded-lg focus:bg-[#f8f8f8] focus:scale-[1.001] transition-all duration-200"
            :class="{ 'cursor-not-allowed bg-gray-200': props.hide }" />

        <!-- Error Message -->
        <div v-show="errorMessage" class="text-red-500 text-sm">
            {{ errorMessage }}
        </div>
    </div>
</template>