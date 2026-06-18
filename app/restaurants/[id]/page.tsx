'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { restaurants } from '../../data/restaurants';

/* ─── FULL MENU DATA (183 Items) ─── */
const menuData = {
  breakfast: [
    { en: 'Aloo Paratha', ar: 'براتا بطاطا', price: '3.00' },
    { en: 'Keema Pratha', ar: 'براتا لحم مفروم', price: '5.00' },
    { en: 'Sada Paratha', ar: 'براتا عادي', price: '1.00' },
    { en: 'Chana Paratha', ar: 'براتا حمص', price: '3.00' },
    { en: 'Keema', ar: 'لحم مفروم', price: '4.00' },
    { en: 'Daal', ar: 'عدس', price: '3.00' },
    { en: 'Vegetable', ar: 'خضار', price: '3.00' },
    { en: 'Nihari', ar: 'نهاري', price: '6.00' },
    { en: 'Haleem', ar: 'حليم', price: '5.00' },
    { en: 'Kaleji (Liver)', ar: 'كليجي (كبدة)', price: '5.00' },
  ],
  breads: [
    { en: 'Tandoori Roti', ar: 'تندوري روتي', price: '1.00' },
    { en: 'Rumani Roti', ar: 'خبز روماني', price: '1.00' },
    { en: 'Paratha', ar: 'باراتا', price: '1.00' },
    { en: 'Butter Naan', ar: 'زبدة نان', price: '3.00' },
    { en: 'Garlic Naan', ar: 'ثوم نان', price: '4.00' },
    { en: 'Roghni Naan', ar: 'روغني نان', price: '4.00' },
    { en: 'Keema Naan', ar: 'مفروم لحم نان', price: '5.00' },
  ],
  sandwich: [
    { en: 'Egg Sandwich', ar: 'ساندويتش بيض', price: '3/5' },
    { en: 'Chicken Tikka', ar: 'دجاج تكا', price: '12.00' },
    { en: 'Mutton Tikka', ar: 'لحم تكا', price: '12.00' },
    { en: 'Veg. Sandwich', ar: 'ساندويتش خضار', price: '5.00' },
    { en: 'Keema Sandwich', ar: 'ساندويتش كيما', price: '5.00' },
  ],
  soups: [
    { en: 'Chicken Corn Soup', ar: 'شوربة دجاج ذرة', price: '8.00' },
    { en: 'Chicken Hot N Sour', ar: 'دجاج حار و حامض', price: '8.00' },
    { en: 'Chicken Manchow', ar: 'شوربة دجاج مانشو', price: '8.00' },
    { en: 'Chicken Clear Soup', ar: 'شوربة دجاج صافية', price: '8.00' },
    { en: 'Chicken Noodles', ar: 'شوربة معكرونة دجاج', price: '8.00' },
    { en: 'Chicken Sweet Corn', ar: 'شوربة دجاج فرم حلوة', price: '8.00' },
    { en: 'Chicken Manchu Soup', ar: 'شوربة دجاج مانشو', price: '8.00' },
    { en: 'Mutton Soup', ar: 'شوربة لحم', price: '8.00' },
    { en: 'Mushroom Soup', ar: 'شوربة مشروم', price: '8.00' },
    { en: 'Tomato Soup', ar: 'شوربة طماطم', price: '8.00' },
    { en: 'Vegetable Soup', ar: 'شوربة خضار', price: '8.00' },
    { en: 'Veg. Hot n Sour', ar: 'شوربة خضار حار', price: '8.00' },
    { en: 'Tomato Sweet Corn', ar: 'شوربة طماطم رة', price: '8.00' },
  ],
  salad: [
    { en: 'Green Salad', ar: 'سلطة خضراء', price: '3/5' },
    { en: 'Tomato Salad', ar: 'سلطة طماطم', price: '5.00' },
    { en: 'Raita', ar: 'رايتا', price: '5.00' },
  ],
  grills: [
    { en: 'Chicken Tikka leg/chest', ar: 'دجاج تكا', price: '10/11' },
    { en: 'Chicken Malai Boti', ar: 'دجاج مالائي بوتي', price: '18.00' },
    { en: 'Chicken Boneless', ar: 'دجاج مسحب', price: '15.00' },
    { en: 'Chicken Kebab', ar: 'كباب دجاج', price: '15.00' },
    { en: 'Chickem Reshmi Kebab', ar: 'كباب دجاج ريشمي', price: '18.00' },
    { en: 'Mutton Tikka', ar: 'لحم تكا', price: '15.00' },
    { en: 'Mutton Kebab', ar: 'لحم كباب', price: '15.00' },
    { en: 'Fish Tikka', ar: 'سمك تكا', price: '30/100' },
    { en: 'Mix Grill', ar: 'مشاوي مشكل', price: '28/42' },
  ],
  seafood: [
    { en: 'Fish Fry', ar: 'سمك مقلي', price: '10/20' },
    { en: 'Fish Chilli', ar: 'سمك فلفل', price: '18.00' },
    { en: 'Prawns Masala', ar: 'روبيان ماسالا', price: '18.00' },
    { en: 'Prawns Chilli', ar: 'روبيان فلفل', price: '18.00' },
  ],
  chicken: [
    { en: 'Chicken Kurma', ar: 'دجاج كورما', price: '12.00' },
    { en: 'Chicken Kadai', ar: 'دجاج كاداي', price: '12.00' },
    { en: 'Chicken Pepper', ar: 'دجاج فلفل', price: '15.00' },
    { en: 'Chicken Mughali', ar: 'دجاج موغلائي', price: '15.00' },
    { en: 'Butter Chicken', ar: 'دجاج بالزبدة', price: '17.00' },
    { en: 'Chicken Tikka Masala', ar: 'دجاج تكا ماسالا', price: '17.00' },
    { en: 'Chicken Chilli', ar: 'دجاج حار', price: '17.00' },
    { en: 'Chicken Chana', ar: 'دجاج شانا', price: '12.00' },
    { en: 'Chicken Palak', ar: 'دجاج سبانج', price: '12.00' },
    { en: 'Chicken Bhindi', ar: 'دجاج بامية', price: '12.00' },
    { en: 'Chicken Fry', ar: 'دجاج مقلي', price: '10.00' },
    { en: 'Chicken Jelfrazi', ar: 'دجاج جلفريزي', price: '14.00' },
    { en: 'Chicken Ginger', ar: 'دجاج بالزنجبيل', price: '14.00' },
    { en: 'Ckn. Peshwari Kadai', ar: 'دجاج بشاوري كداي', price: '14.00' },
    { en: 'Chicken White Kurma', ar: 'دجاج أبيض كورما', price: '14.00' },
    { en: 'Chicken Nihari', ar: 'دجاج نهاري', price: '12.00' },
    { en: 'Chicken Haleem', ar: 'دجاج حليم', price: '12.00' },
    { en: 'Chicken Dopyaza', ar: 'دجاج دو بيازا', price: '14.00' },
    { en: 'Chicken Achari', ar: 'دجاج مخلل', price: '14.00' },
    { en: 'Chicken Kabab Masala', ar: 'دجاج كباب ماسالا', price: '18.00' },
    { en: 'Chicken Lollipop', ar: 'دجاج لولي بوب', price: '18.00' },
  ],
  mutton: [
    { en: 'Mutton Korma', ar: 'لحم كورما', price: '16.00' },
    { en: 'Mutton Kadai', ar: 'لحم كاداي', price: '16.00' },
    { en: 'Mutton Pepper', ar: 'لحم فلفل', price: '16.00' },
    { en: 'Mutton Tikka Masala', ar: 'لحم تكا ماسالا', price: '15.00' },
    { en: 'Mutton Palak', ar: 'لحم سبانج', price: '12.00' },
    { en: 'Mutton Bhindi', ar: 'لحم مامية', price: '12.00' },
    { en: 'Mutton Chana', ar: 'لحم حمص', price: '12.00' },
    { en: 'Mutton Daal', ar: 'لحم عدس', price: '12.00' },
    { en: 'Mutton Gobi', ar: 'لحم قرنبيط', price: '12.00' },
    { en: 'Mutton Karela', ar: 'لحم المر', price: '12.00' },
    { en: 'Mutton Aloo', ar: 'لحم بطاطا', price: '12.00' },
    { en: 'Mutton Chilli', ar: 'لحم فلفل حار', price: '15.00' },
    { en: 'Mutton Paya', ar: 'لحم بايا', price: '12.00' },
    { en: 'Mutton Keema', ar: 'لحم مفروم', price: '8.00' },
    { en: 'Mutton Brain Fry', ar: 'لحم مع فرائي', price: '12.00' },
    { en: 'Mutton Haleem', ar: 'لحم حليم', price: '12.00' },
    { en: 'Mutton Kaleji', ar: 'لحم كليجي (كبدة)', price: '9.00' },
    { en: 'Mutton Bhindi', ar: 'لحم بامية', price: '10.00' },
    { en: 'Mutton Nihari', ar: 'لحم نهاري', price: '12.00' },
    { en: 'Mutton Ginger', ar: 'لحم زنجبيل', price: '18.00' },
    { en: 'Mutton Jelfrazi', ar: 'لحم جلفريزي', price: '18.00' },
    { en: 'Mutton Achari', ar: 'لحم مخلل', price: '15.00' },
    { en: 'Mutton Kabab Masala', ar: 'لحم كباب ماسالا', price: '20.00' },
    { en: 'Mutton Peshwari Kadai', ar: 'لحم بشاوري ماسالا', price: '20.00' },
  ],
  veg: [
    { en: 'Veg. Korma', ar: 'كورما خضار', price: '10.00' },
    { en: 'Mutter Paneer', ar: 'بانير بازلا', price: '10.00' },
    { en: 'Palak Paneer', ar: 'بانير سبانج', price: '10.00' },
    { en: 'Gobhi Paneer', ar: 'بانير قرنبيط', price: '10.00' },
    { en: 'Paneer Tikka Masala', ar: 'بانير تكا ماسالا', price: '12.00' },
    { en: 'Paneer Butter Masala', ar: 'بانير ذبدة ماسالا', price: '12.00' },
    { en: 'Paneer Burji', ar: 'بانير بورجي', price: '13.00' },
    { en: 'Paneer Chilli', ar: 'بانير فلفل', price: '13.00' },
    { en: 'Mashroom Machurian', ar: 'بانير مانشوریان', price: '15.00' },
    { en: 'Aloo Jeera', ar: 'بطاطا بالكمون', price: '8.00' },
    { en: 'Dal Tadka', ar: 'عدس تدكا', price: '8.00' },
    { en: 'Paneer Manchurian', ar: 'بانير مانشوریان', price: '12.00' },
    { en: 'Mushroom Masala', ar: 'مشروم ماسالا', price: '10.00' },
    { en: 'Kadi Pakoda', ar: 'كاري بكورا', price: '8.00' },
    { en: 'Dal Fry (Special)', ar: 'عدس يقلي', price: '6.00' },
    { en: 'Dal Chana Fry', ar: 'عدس شانا يقلي', price: '6.00' },
    { en: 'Bhindi Fry', ar: 'بامية يقلي', price: '6.00' },
    { en: 'Palak Fry', ar: 'سبانج يقلي', price: '6.00' },
    { en: 'Chana Masala', ar: 'شانا ماسالا', price: '6.00' },
    { en: 'Gobhi Fry', ar: 'قرنبيط يقلي', price: '8.00' },
    { en: 'Aloo Mutter', ar: 'بطاطا بازلا', price: '7.00' },
    { en: 'Butter Gobhi', ar: 'قرنبيط بالذبدة', price: '8.00' },
    { en: 'Dal Makhani', ar: 'عدس بالذبدة', price: '8.00' },
    { en: 'Aloo Masala', ar: 'بطاطا ماسالا', price: '8.00' },
    { en: 'Palak Masala', ar: 'سبانج ماسالا', price: '6.00' },
    { en: 'Mix. Vegetables', ar: 'خضار مشكل', price: '6.00' },
    { en: 'Gobi Mahcnurian', ar: 'قرنبيط مانشوریان', price: '12.00' },
    { en: 'Veg. Manchurian', ar: 'خضار مانشوریان', price: '12.00' },
    { en: 'Karela Fry', ar: 'المريقلي', price: '8.00' },
  ],
  rice: [
    { en: 'Chi. Tikka Biryani', ar: 'برياني دجاج تكا خاص', price: '18.00' },
    { en: 'Chicken Biryani Special', ar: 'برياني دجاج الخاص', price: '12.00' },
    { en: 'Chicken Chilli Biryani', ar: 'برياني دجاج فلفل', price: '16.00' },
    { en: 'Chicken Pulao', ar: 'بلاؤ دجاج', price: '14.00' },
    { en: 'Mutton Biryani Special', ar: 'برياني لحم الخاص', price: '14.00' },
    { en: 'Mutton Pulao', ar: 'بلاؤ لحم', price: '16.00' },
    { en: 'Egg Biryani Special', ar: 'برياني بيض خاص', price: '11.00' },
    { en: 'Prawns Biryani', ar: 'برياني روبيان', price: '18.00' },
    { en: 'Veg. Biryani', ar: 'برياني خضار', price: '12.00' },
    { en: 'Veg. Pulao', ar: 'بلاؤ خضار', price: '13.00' },
    { en: 'Mushroom Pulao', ar: 'بلاؤ مشروم', price: '18.00' },
    { en: 'Fish Biryani Special', ar: 'برياني سمك الخاص', price: '18.00' },
    { en: 'Biryani Rice', ar: 'ارز برياني', price: '8.00' },
    { en: 'Jeera Rice', ar: 'ارز كمون', price: '8.00' },
    { en: 'Plain Rice', ar: 'ارز عادي', price: '5.00' },
    { en: 'Dal Khichdi', ar: 'ارز عدس', price: '12.00' },
    { en: 'Curd Rice', ar: 'ارز تخثر', price: '12.00' },
    { en: 'Chana Pulao', ar: 'بلاؤ حمص', price: '10.00' },
  ],
  egg: [
    { en: 'Egg Masala', ar: 'بيض ماسالا', price: '10.00' },
    { en: 'Egg Burji', ar: 'بيض بورجي', price: '8.00' },
    { en: 'Egg Aloo Masala', ar: 'بيض الو ماسالا', price: '10.00' },
    { en: 'Egg Kofta', ar: 'بيض كوفتا', price: '10.00' },
    { en: 'Omelete', ar: 'بيض عجة', price: '2/4' },
    { en: 'Egg Boiled (Single)', ar: 'بيض ساق', price: '2.00' },
  ],
  friedRice: [
    { en: 'Chicken Fried Rice', ar: 'ارز مقلي دجاج', price: '15.00' },
    { en: 'Ckn. Schezwn Fried Rice', ar: 'ارز دجاج شيزوان', price: '18.00' },
    { en: 'Ckn. Schezwan Triple Rice', ar: 'أرز تريبل شيزوان', price: '20.00' },
    { en: 'Garlic Chop Fried Rice', ar: 'أرز مقلي فرم بالثوم', price: '20.00' },
    { en: 'Mushroom Fried Rice', ar: 'ارز مقلي مشروم', price: '16.00' },
    { en: 'Chicken Chilli Fried', ar: 'ارز دجاج فلافل', price: '20.00' },
    { en: 'Mix Fried Rice', ar: 'ارز مقلي مشكل', price: '20.00' },
    { en: 'Hakka Fried Rice', ar: 'ارز هاكا مقلي', price: '20.00' },
    { en: 'Mutton Fried Rice', ar: 'ارز لحم مقلي', price: '15.00' },
    { en: 'Prawns Fried Rice', ar: 'ارز روبيان مقلي', price: '18.00' },
    { en: 'Garlic Chicken Fried Rice', ar: 'ارز دجاج بالثوم', price: '20.00' },
    { en: 'Ginger Chicken Fried Rice', ar: 'ارز دجاج بالزنجبيل', price: '20.00' },
    { en: 'Egg Fried Rice', ar: 'ارز مقلي بيض', price: '13.00' },
    { en: 'Veg. Fried Rice', ar: 'ارز مقلي خضار', price: '12.00' },
  ],
  noodles: [
    { en: 'Chicken Noodles', ar: 'معكرونة دجاج', price: '15.00' },
    { en: 'Mutton Noodles', ar: 'معكرونة لحم', price: '15.00' },
    { en: 'Hakka Ckn. Noodles', ar: 'معكرونة دجاج هاكا', price: '18.00' },
    { en: 'Schezwan Noodles', ar: 'معكرونة شيزوان', price: '18.00' },
    { en: 'Prawns Noodles', ar: 'معكرونة روبيان', price: '18.00' },
    { en: 'Mix Noodles', ar: 'معكرونة مشكل', price: '18.00' },
    { en: 'Garlic Noodles', ar: 'معكرونة بالثوم', price: '18.00' },
    { en: 'Ginger Noodles', ar: 'معكرونة زنجبيل', price: '18.00' },
    { en: 'Veg. Noodles', ar: 'معكرونة خضار', price: '12.00' },
    { en: 'Egg Noodles', ar: 'معكرونة بيض', price: '13.00' },
  ],
  chinese: [
    { en: 'Chicken Chilli Gravy', ar: 'مرق دجاج فلفل حار', price: '15.00' },
    { en: 'Prawns Garlic', ar: 'روبيان بالثوم', price: '15.00' },
    { en: 'Prawns Ginger', ar: 'روبيان بالزنجبيل', price: '18.00' },
    { en: 'Prawns Manchurian', ar: 'روبيان منشوریان', price: '18.00' },
    { en: 'Chicken Manchurian', ar: 'دجاج منشوريان', price: '15.00' },
    { en: 'Chicken 65', ar: 'دجاج 65', price: '15.00' },
    { en: 'Chicken Garlic', ar: 'دجاج بالثوم', price: '15.00' },
    { en: 'Pepper Chicken Dry', ar: 'دجاج فلفل جاف', price: '15.00' },
  ],
  sweets: [
    { en: 'Gulab Jamun', ar: 'غلاب جامون', price: '2.00' },
    { en: 'Phirni (kheer)', ar: 'فيرني (كهير)', price: '5.00' },
  ]
};

/* ── MAPPING CATEGORIES TO LOCAL IMAGES ── */
const menuCategories = [
  { id: 'breakfast', title: 'Breakfast Classics', items: menuData.breakfast, img: '/menu_in/breakfast.jpg' },
  { id: 'breads', title: 'Tandoori Breads', items: menuData.breads, img: '/menu_in/breads.jpg' },
  { id: 'sandwich', title: 'Sandwiches', items: menuData.sandwich, img: '/menu_in/sandwich.jpg' },
  { id: 'soups', title: 'Hot Soups', items: menuData.soups, img: '/menu_in/soups.jpg' },
  { id: 'salad', title: 'Fresh Salads', items: menuData.salad, img: '/menu_in/salad.jpg' },
  { id: 'grills', title: 'Signature Grills', items: menuData.grills, img: '/menu_in/grills.jpg' },
  { id: 'seafood', title: 'Ocean Catch', items: menuData.seafood, img: '/menu_in/seafood.jpg' },
  { id: 'chicken', title: 'Chicken Curries', items: menuData.chicken, img: '/menu_in/chicken.jpg' },
  { id: 'mutton', title: 'Mutton Curries', items: menuData.mutton, img: '/menu_in/mutton.jpg' },
  { id: 'veg', title: 'Vegetarian Wonders', items: menuData.veg, img: '/menu_in/veg.jpg' },
  { id: 'rice', title: 'Basmati Rice & Biryani', items: menuData.rice, img: '/menu_in/rice.jpg' },
  { id: 'egg', title: 'Egg Specials', items: menuData.egg, img: '/menu_in/egg.jpg' },
  { id: 'friedRice', title: 'Wok Fried Rice', items: menuData.friedRice, img: '/menu_in/friedRice.jpg' },
  { id: 'noodles', title: 'Wok Noodles', items: menuData.noodles, img: '/menu_in/noodles.jpg' },
  { id: 'chinese', title: 'Chinese Curries', items: menuData.chinese, img: '/menu_in/chinese.jpg' },
  { id: 'sweets', title: 'Sweet Endings', items: menuData.sweets, img: '/menu_in/sweets.jpg' }
];

/* ── Icons ── */
const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#EF4444' : 'none'} stroke={filled ? '#EF4444' : '#fca5a5'} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,display:'block'}}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const GoldDivider = () => (
  <div className="flex items-center justify-center my-6 opacity-80">
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
    <div className="mx-2 rotate-45 w-2 h-2 border border-[#D4AF37]"></div>
    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
  </div>
);

/* ── Individual Category Block Component ── */
const CategoryMenuBlock = ({ 
  title, 
  items, 
  imgSrc, 
  reverse = false 
}: { 
  title: string; 
  items: any[]; 
  imgSrc: string; 
  reverse?: boolean;
}) => {
  // Automatically split long lists (like Veg) into 2 columns so the image doesn't stretch too much!
  const isLongList = items.length > 12;

  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 mb-12 bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]`}>
      
      {/* Category Image Side */}
      <div className="w-full lg:w-5/12 min-h-[300px] lg:min-h-full relative rounded-2xl overflow-hidden shadow-lg group shrink-0">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        <h2 className="absolute bottom-6 left-6 text-3xl font-serif text-white tracking-widest drop-shadow-md">
          {title}
        </h2>
      </div>

      {/* Menu List Side */}
      <div className={`w-full ${isLongList ? 'lg:w-8/12' : 'lg:w-7/12'} flex flex-col justify-center py-4`}>
        <div className={`${isLongList ? 'columns-1 md:columns-2 gap-x-10' : 'flex flex-col'}`}>
          {items.map((item, idx) => (
            <div key={idx} className="flex items-end justify-between w-full relative group mb-5 break-inside-avoid">
              <div className="pr-3 bg-transparent z-10 transition-transform duration-300 group-hover:translate-x-1">
                <h4 className="font-sans tracking-widest uppercase text-[11px] md:text-xs font-bold leading-none text-[#111827]">
                  {item.en}
                </h4>
                <p className="text-[10px] md:text-[11px] mt-1.5 leading-none font-medium text-gray-500" dir="rtl">
                  {item.ar}
                </p>
              </div>
              <div className="flex-1 border-b-[2px] border-dotted border-gray-300 mb-2 z-0 opacity-60 mix-blend-multiply"></div>
              <div className="pl-3 bg-transparent z-10 font-sans tracking-widest font-bold text-sm text-[#D4AF37] mb-0.5 shrink-0">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

type NewReview = { author: string; rating: number; text: string; };

export default function RestaurantPage() {
  const params = useParams();
  const restaurantId = params.id as string;
  
  const restaurant = restaurants.find(r => r.id === restaurantId);

  const [reviews, setReviews]       = useState(restaurant?.reviews || []);
  const [showForm, setShowForm]     = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm]             = useState<NewReview>({ author: '', rating: 0, text: '' });
  const [submitted, setSubmitted]   = useState(false);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Restaurant Not Found</h1>
        <Link href="/" className="text-red-500 font-bold hover:underline">← Back to Home</Link>
      </div>
    );
  }

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  function handleSubmit() {
    if (!form.author.trim() || !form.rating || !form.text.trim()) return;
    const now = new Date();
    const date = now.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    setReviews((prev) => [{ ...form, date }, ...prev]);
    setForm({ author: '', rating: 0, text: '' });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-gray-900 selection:bg-[#D4AF37] selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.2]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <Navbar />

      {/* ── HERO BANNER ── */}
      <div className="relative h-[45vh] md:h-[55vh] w-full pt-20 z-10">
        <Image src={restaurant.cover} alt={restaurant.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full pb-12">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <Link href="/#restaurants" className="inline-flex items-center text-[#D4AF37] hover:text-white mb-6 text-sm font-bold tracking-widest uppercase transition-colors">
              ← Back to Locations
            </Link>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4 tracking-tight drop-shadow-lg">
              {restaurant.name}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-white/90">
              <div className="flex items-center gap-2 font-medium tracking-wide">
                <MapPinIcon />
                <span>{restaurant.address}</span>
              </div>
              <div className="hidden sm:block text-[#D4AF37]">•</div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(Number(avgRating))} />)}
                </div>
                <span className="font-semibold tracking-wide">{avgRating} <span className="text-white/60 font-normal">({reviews.length} reviews)</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] py-16 md:py-24 relative z-10">
        
        {/* ── THE GRAND MENU ── */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-wide">The Grand Menu</h2>
            <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">Authentic Culinary Excellence</p>
            <GoldDivider />
          </div>

          {restaurant.openingSoon ? (
             <div className="bg-white/60 backdrop-blur-md border border-[#D4AF37]/30 rounded-3xl p-16 text-center max-w-2xl mx-auto shadow-lg">
               <h3 className="text-3xl font-serif text-gray-900 mb-4">Preparing the Kitchen</h3>
               <p className="text-gray-600 leading-relaxed">Our chefs are actively crafting the menu for this exclusive location. Check back soon for our delicious offerings.</p>
             </div>
          ) : (
            <div className="max-w-[1200px] mx-auto">
              
              {/* Loop through all 16 categories and render them as blocks! */}
              {menuCategories.map((category, index) => (
                <CategoryMenuBlock 
                  key={category.id}
                  title={category.title}
                  items={category.items}
                  imgSrc={category.img}
                  reverse={index % 2 !== 0} // Alternates Image Left / Image Right automatically!
                />
              ))}

            </div>
          )}
        </div>

        {/* ── REVIEWS & INFO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1200px] mx-auto">
          
          {/* Reviews */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl font-serif text-gray-900">Guest Experiences</h2>
              <button
                onClick={() => setShowForm((v) => !v)}
                className={`text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-full transition-all shadow-sm ${
                  showForm ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-[#111827] text-white hover:bg-[#D4AF37]'
                }`}
              >
                {showForm ? 'Cancel' : 'Share Experience'}
              </button>
            </div>

            {submitted && (
              <div className="mb-6 flex items-center gap-3 px-5 py-4 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 rounded-2xl font-semibold shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Thank you for your kind words.
              </div>
            )}

            {showForm && (
              <div className="mb-8 p-6 md:p-8 rounded-3xl border border-gray-200 bg-white/60 backdrop-blur-md shadow-sm space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Name</label>
                  <input type="text" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white/80" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((i) => (
                      <button key={i} onMouseEnter={() => setHoverRating(i)} onMouseLeave={() => setHoverRating(0)} onClick={() => setForm((f) => ({ ...f, rating: i }))} className="transition-transform hover:scale-125 focus:outline-none">
                        <StarIcon filled={i <= (hoverRating || form.rating)} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Thoughts</label>
                  <textarea rows={4} value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white/80 resize-none" />
                </div>
                <button onClick={handleSubmit} disabled={!form.author.trim() || !form.rating || !form.text.trim()} className="w-full py-4 bg-[#111827] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] transition-colors text-xs disabled:opacity-40 shadow-md">
                  Submit
                </button>
              </div>
            )}

            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#111827] flex items-center justify-center text-[#D4AF37] font-serif text-xl shrink-0">
                        {r.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 tracking-wide">{r.author}</p>
                        <p className="text-gray-400 text-xs mt-1 tracking-widest uppercase">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {[1,2,3,4,5].map((j) => <StarIcon key={j} filled={j <= r.rating} />)}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-serif italic text-lg md:pl-16">"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-serif text-gray-900 mb-4">The Location</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-6 pb-6 border-b border-gray-200/50">
                  {restaurant.description}
                </p>
                <div className="flex items-start gap-3 text-sm text-gray-600 font-medium tracking-wide">
                  <div className="text-[#D4AF37] mt-0.5"><MapPinIcon /></div>
                  <span className="leading-relaxed">{restaurant.address}</span>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md p-3 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="w-full h-[300px] rounded-2xl overflow-hidden relative">
                  <iframe
                    src={restaurant.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for ${restaurant.name}`}
                    className="absolute inset-0 grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}