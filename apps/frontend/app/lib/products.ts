export type LocalProduct = {
  id: string;
  handle: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  benefits: string[];
};

export const localProducts: LocalProduct[] = [
  {
    id: 'core-kit',
    handle: 'core-kit',
    title: 'Core Kit',
    price: 1310,
    originalPrice: 1379,
    image: '/3.png',
    description: 'Morning + Daytime Care. Kits are designed for maximum results and give you better value than individual products.',
    benefits: [
      'Pravahi Kwath (500ml)',
      'Diabetes Care Capsules (60)',
      '24×7 WhatsApp Support',
      'Daily Follow-ups'
    ]
  },
  {
    id: 'balanced-kit',
    handle: 'balanced-kit',
    title: 'Balanced Kit',
    price: 1670,
    originalPrice: 1757,
    image: '/2.png',
    description: 'Morning + Daytime + Night Care. Best Value.',
    benefits: [
      'Pravahi Kwath (500ml)',
      'Diabetes Care Capsules (60)',
      'Sleep Care Capsules (30)',
      '24×7 WhatsApp Support',
      'Daily Follow-ups'
    ]
  },
  {
    id: 'pravahi-kwath',
    handle: 'pravahi-kwath',
    title: 'Pravahi Kwath',
    price: 565,
    image: '/pravahi.png',
    description: '500ml Ayurvedic Herbal Juice for Morning Care.',
    benefits: [
      'Detoxifies body on empty stomach',
      'Balances fasting blood sugar',
      'Activates pancreas naturally'
    ]
  },
  {
    id: 'diabetes-care-capsules',
    handle: 'diabetes-care-capsules',
    title: 'Diabetes Care Capsules',
    price: 745,
    image: '/care.png',
    description: '60 Ayurvedic Capsules for Daytime Care.',
    benefits: [
      'Prevents post-meal sugar spikes',
      'Maintains energy all day',
      'Reduces sugar cravings'
    ]
  },
  {
    id: 'sleep-care-capsules',
    handle: 'sleep-care-capsules',
    title: 'Sleep Care Capsules',
    price: 360,
    image: '/sleep.png',
    description: '30 Ayurvedic Capsules for Night Care.',
    benefits: [
      'Promotes deep restful sleep',
      'Reduces stress & cortisol',
      'Better sleep = better sugar'
    ]
  }
];

export function getProductByHandle(handle: string): LocalProduct | undefined {
  return localProducts.find((p) => p.handle === handle);
}
