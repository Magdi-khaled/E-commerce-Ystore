import Visa from '@/assets/media/payment-methods/visa.webp';
import creditCard from '@/assets/media/payment-methods/creditCard.webp';
import PayPal from '@/assets/media/payment-methods/PayPal.webp';
import IphonePay from '@/assets/media/payment-methods/IphonePay.webp';
import Gpay from '@/assets/media/payment-methods/Gpay.webp';
const footerSections = [
    {
        title: "company",
        links: [
            { name: "about", path: "" },
            { name: "features", path: "User-Porfile" },
            { name: "works", path: "" },
            { name: "career", path: "" },
        ],
    },
    {
        title: "help",
        links: [
            { name: "custom support", path: "" },
            { name: "delivery details", path: "User-Orders" },
            { name: "terms & conditions", path: "" },
            { name: "privacy policy", path: "" },
        ],
    },
    {
        title: "faq",
        links: [
            { name: "account", path: "User-Profile" },
            { name: "manage deliveries", path: "User-Notifications" },
            { name: "orders", path: "User-Orders" },
            { name: "payments", path: "User-Payments" },
        ],
    },
    {
        title: "resources",
        links: [
            { name: "free eBooks", path: "" },
            { name: "development tutorial", path: "" },
            { name: "how to - blog", path: "" },
            { name: "youtube playlist", path: "" },
        ],
    },
];
const paylinks = [
    { src: Visa, alt: 'Visa' },
    { src: creditCard, alt: 'Credit Card' },
    { src: PayPal, alt: 'Paypal' },
    { src: IphonePay, alt: 'Apple Pay' },
    { src: Gpay, alt: 'Gpay' },
];
export {
    footerSections, paylinks
}