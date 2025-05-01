import { ref } from 'vue';

const selectedImg = ref(null);
const lensStyles = {
  width: "150px",
  height: "150px",
  display: "none",
  background: "",
  backgroundPosition: "center",
  pointerEvents: "none",
};
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
const routeMapping2 = {
  "Shop": "all fashion",
  "women-fashion": "all women's fashion",
  "men-fashion": "all men's fashion",
  "bags-luggage": "all bags & luggage",
  "shoes-fashion": "all shoes",
  "accessories": "all accessories",
  "sport-wear": "all sport wear",
  "girls-wear": "all girls fashion",
  "boys-wear": "all boys fashion",
  "formal-wear": "all formal wear",
};
const StoreLinks = [
  { name: 'men-fashion', label: 'men\'s fashion' },
  { name: 'women-fashion', label: 'women\'s fashion' },
  { name: 'boys-wear', label: 'boys wear' },
  { name: 'girls-wear', label: 'girls wear' },
  { name: 'sport-wear', label: 'sport wear' },
  { name: 'bags-luggage', label: 'bags & luggage' },
  { name: 'shoes-fashion', label: 'shoes' },
  { name: 'formal-wear', label: 'formal wear' }
];
const handlePrice = (price, sale) => {
  if (sale === 0) return price.toFixed(2);
  return (price - price * (sale / 100)).toFixed(2);
};

const handleQuantity = (type, item, store) => {
  if (!store) {
    console.error('Vuex store is not provided to handleQuantity');
    return;
  }

  if (type) {
    if (item.orderQuantity === item.quantity + 1) return;
    item.orderQuantity++;
  } else {
    item.orderQuantity--;
    if (item.orderQuantity === 0) {
      store.dispatch('RemoveCartItem', item._id);
    }
  }
};
const handleSizeChange = (option) => {
  if (option === 'All' && (providedSizes.value?.length || providedSizes.value.find(v => v === 'All'))) { providedSizes.value = []; }
  else if (providedSizes.value.find(v => v === option)) {
    providedSizes.value = providedSizes.value.filter(v => v !== option && v !== 'All');
  }
  else if (option === 'All') { providedSizes.value = [...sizes]; }
  else providedSizes.value.push(option);
};

const handelColorChange = (option) => {
  if (option.value === '' && (providedColors.value.length ||
    providedColors.value.find(v => v.value === ''))) { providedColors.value = []; }
  else if (providedColors.value.find(v => v.color === option.color)) {
    providedColors.value = providedColors.value.filter(v => v.color !== option.color && v.color !== 'all');
  }
  else if (option.value === '') { providedColors.value = [...colors.value]; }

  else providedColors.value.push(option);
};

const handleStars = (rate) => { return 5 - Math.ceil(rate); };
const isHalf = (rate) => { return rate % 1 !== 0; };

export {
  handlePrice, handleQuantity, handleSizeChange,
  handelColorChange, handleStars, isHalf, routeMapping2, lensStyles,
  selectedImg, routeMapping, StoreLinks
}