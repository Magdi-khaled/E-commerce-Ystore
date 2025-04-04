<script setup>
import { useField } from 'vee-validate';
import { defineEmits, defineProps, watch, ref } from 'vue';

const emit = defineEmits(['update:modelValue', 'handleChange']);
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
        // setErrors("At least 3 images required");
        event.target.value = "";
        emit("update:modelValue", []);
        return;
    } else if (files.length > 4) {
        // setErrors("You can upload a maximum of 4 images only");
        event.target.value = "";
        emit("update:modelValue", []);
        return;
    }
    setErrors(""); // Clear errors on valid input
    const filesArray = Array.from(files).map(file => `/assets/shop/${file.name}`);
    emit("update:modelValue", filesArray);
};

function handleInput(event) {
    let newValue = event.target.value;
    if (props.name === 'expiry') {
        // Remove all non-digit characters
        newValue = newValue.replace(/\D/g, '');
        // If more than 2 digits, insert a '/'
        if (newValue.length > 2) {
            newValue = newValue.slice(0, 2) + '/' + newValue.slice(2, 4);
        }
        // Update the element and the vee-validate field value
        event.target.value = newValue;
        value.value = newValue;
        emit('update:modelValue', newValue);
    }
    // Emit handleChange for any additional behavior
    emit('handleChange', event);
}
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
        <textarea v-if="props.type === 'textarea'" v-model="value" :name="props.name" :id="props.name"
            :placeholder="props.placeholder" @blur="handleBlur"
            class="h-[4em] sm:h-[5em] text-sm sm:text-md p-2 bg-gray-100 border-[2px] border-b-[3px] border-b-gray-600 outline-none text-gray-700" />

        <!-- Select -->
        <select v-else-if="props.type === 'select'" v-model="value" :name="props.name" :id="props.name"
            @blur="handleBlur" :multiple="props.multiple"
            class="text-sm sm:text-md py-2 px-2 bg-gray-100 border-[2px] border-b-[3px] border-b-gray-600 outline-none text-gray-700 w-full capitalize">
            <option value="">{{ props.optionsType }}</option>
            <option v-for="(item, index) in props.options" :key="index" :value="item" class="capitalize">
                {{ item }}
            </option>
        </select>

        <!-- Single File Input -->
        <input v-else-if="props.type === 'file' && !props.multiple" :type="props.type" :name="props.name"
            :id="props.name" @blur="validate()" @change="handleFileChange" :accept="props.accept" v-model="value"
            class="text-sm sm:text-md py-2 px-2 bg-gray-100 border-[2px] border-b-[3px] border-b-gray-600 outline-none text-gray-700 w-full" />

        <!-- Multiple Files Input -->
        <input v-else-if="props.type === 'file' && props.multiple" :type="props.type" :name="props.name"
            :id="props.name" @blur="validate()" @change="handleFilesChange" :accept="props.accept"
            :multiple="props.multiple" class="text-sm sm:text-md py-2 px-2 bg-gray-100 border-[2px] border-b-[3px]
            border-b-gray-600 outline-none text-gray-700 w-full" />

        <!-- Default Input [text, number, email, password, range, ...etc] -->
        <input v-else v-model="value" :type="props.type" :name="props.name" :id="props.name" :disabled="props.hide"
            :placeholder="props.placeholder" :class="{ 'cursor-not-allowed text-[#939393df]': props.hide }"
            :maxlength="props.maxLen" :minlength="props.minLen" @input="handleInput"
            class="border-[2px] border-b-[3px] border-b-gray-600 text-sm sm:text-md p-2 bg-gray-100 outline-none text-gray-700 w-full" />

        <!-- Error Message -->
        <div v-show="errorMessage" class="text-red-500 text-sm">
            {{ errorMessage }}
        </div>
    </div>
</template>
