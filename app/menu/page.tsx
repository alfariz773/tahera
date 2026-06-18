'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

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

/* ─── BOOK CONFIGURATION & PAGES ─── */
const menuPages = [
  {
    id: 0,
    title: "Cover",
    isCover: true,
  },
  {
    id: 1,
    title: "Morning Classics",
    left: { title: "Breakfast", items: menuData.breakfast, img: "/menu_in/breakfast.jpg" },
    right: { title: "Egg Specials", items: menuData.egg, subCategory: { title: "Sandwiches", items: menuData.sandwich } }
  },
  {
    id: 2,
    title: "Starters & Breads",
    left: { title: "Hot Soups", items: menuData.soups, subCategory: { title: "Fresh Salads", items: menuData.salad } },
    right: { title: "Tandoori Breads", items: menuData.breads, img: "/menu_in/breads.jpg" }
  },
  {
    id: 3,
    title: "From the Fire",
    left: { title: "Signature Grills", items: menuData.grills, img: "/menu_in/grills.jpg" },
    right: { title: "Ocean Catch", items: menuData.seafood, subCategory: { title: "Sweet Endings", items: menuData.sweets } }
  },
  {
    id: 4,
    title: "Poultry & Meat",
    left: { title: "Chicken Curries", items: menuData.chicken },
    right: { title: "Mutton Curries", items: menuData.mutton }
  },
  {
    id: 5,
    title: "Earth & Harvest",
    left: { title: "Vegetarian Wonders", items: menuData.veg.slice(0, 15) },
    right: { title: "Vegetarian Cont.", items: menuData.veg.slice(15), img: "/menu_in/veg.jpg" }
  },
  {
    id: 6,
    title: "Royal Grains",
    left: { title: "Basmati Rice & Biryani", items: menuData.rice, img: "/menu_in/rice.jpg" },
    right: { title: "Wok Fried Rice", items: menuData.friedRice }
  },
  {
    id: 7,
    title: "Wok Classics",
    left: { title: "Wok Noodles", items: menuData.noodles },
    right: { title: "Chinese Curries", items: menuData.chinese, img: "/menu_in/chinese.jpg" }
  }
];

/* ─── UI COMPONENTS ─── */
const GoldDivider = () => (
  <div className="flex items-center justify-center my-6 opacity-80">
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
    <div className="mx-2 rotate-45 w-2 h-2 border border-[#D4AF37]"></div>
    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
  </div>
);

const MenuList = ({ title, items }: { title: string, items: any[] }) => {
  return (
    <div className="mb-8 relative z-10 w-full">
      <h3 className="text-2xl font-serif italic tracking-wide text-[#D4AF37] mb-6 text-center">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-end justify-between w-full relative group">
            <div className="pr-3 bg-white z-10 transition-transform duration-300 group-hover:translate-x-1">
              <h4 className="font-sans tracking-widest uppercase text-[11px] md:text-xs font-bold leading-none text-[#111827]">
                {item.en}
              </h4>
              <p className="text-[10px] md:text-[11px] mt-1.5 leading-none font-medium text-gray-500" dir="rtl">
                {item.ar}
              </p>
            </div>
            <div className="flex-1 border-b-[2px] border-dotted border-gray-300 mb-2 z-0 absolute left-0 w-full opacity-60"></div>
            <div className="pl-3 bg-white z-10 font-sans tracking-widest font-bold text-sm text-[#D4AF37]">
              {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function MenuValet() {
  const [pageIndex, setPageIndex] = useState(0);
  const [flipStep, setFlipStep] = useState<'idle'|'next-1'|'next-2'|'prev-1'|'prev-2'>('idle');

  // Page Flip Logic
  const turnPage = (targetIndex: number) => {
    if (flipStep !== 'idle' || targetIndex === pageIndex) return;

    const isNext = targetIndex > pageIndex;

    if (isNext) {
        setFlipStep('next-1');
        setTimeout(() => {
            setPageIndex(targetIndex); 
            setFlipStep('next-2');
            setTimeout(() => setFlipStep('idle'), 350);
        }, 350);
    } else {
        setFlipStep('prev-1');
        setTimeout(() => {
            setPageIndex(targetIndex); 
            setFlipStep('prev-2');
            setTimeout(() => setFlipStep('idle'), 350);
        }, 350);
    }
  }

  const page = menuPages[pageIndex];

  return (
    <div className="min-h-screen bg-white font-sans pb-12 selection:bg-[#D4AF37] selection:text-white flex flex-col relative overflow-hidden">
      
      {/* CSS For 3D Page Flips */}
      <style dangerouslySetInnerHTML={{__html: `
        .book-perspective { perspective: 2500px; }
        
        /* Desktop 3D Flips */
        @keyframes flipOutLeft {
          from { transform: rotateY(0deg); opacity: 1; }
          to { transform: rotateY(-90deg); opacity: 0; }
        }
        @keyframes flipInLeft {
          from { transform: rotateY(90deg); opacity: 0; }
          to { transform: rotateY(0deg); opacity: 1; }
        }
        @keyframes flipOutRight {
          from { transform: rotateY(0deg); opacity: 1; }
          to { transform: rotateY(90deg); opacity: 0; }
        }
        @keyframes flipInRight {
          from { transform: rotateY(-90deg); opacity: 0; }
          to { transform: rotateY(0deg); opacity: 1; }
        }

        .flip-next-1-right { animation: flipOutLeft 0.35s ease-in forwards; transform-origin: left; }
        .flip-next-2-left  { animation: flipInLeft 0.35s ease-out forwards; transform-origin: right; }
        .flip-prev-1-left  { animation: flipOutRight 0.35s ease-in forwards; transform-origin: right; }
        .flip-prev-2-right { animation: flipInRight 0.35s ease-out forwards; transform-origin: left; }

        /* Mobile Card Flips */
        @keyframes flipOutMobile {
          from { transform: rotateY(0deg); opacity: 1; }
          to { transform: rotateY(-90deg); opacity: 0; }
        }
        @keyframes flipInMobile {
          from { transform: rotateY(90deg); opacity: 0; }
          to { transform: rotateY(0deg); opacity: 1; }
        }
        .mobile-flip-out { animation: flipOutMobile 0.35s ease-in forwards; transform-origin: center; }
        .mobile-flip-in { animation: flipInMobile 0.35s ease-out forwards; transform-origin: center; }

        /* Custom Scrollbar for Inner Pages */
        .page-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .page-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .page-scroll::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 4px;
        }
        .page-scroll::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}} />

      <Navbar />

      <div className="relative z-10 pt-28 md:pt-36 px-6 md:px-16 flex-1 flex flex-col items-center max-w-[1400px] mx-auto w-full">
        
        {/* ── THE 3D MENU BOOK SPREAD ── */}
        <main className="w-full max-w-[1100px] book-perspective relative mx-auto mt-4 md:mt-8">
          
          {/* ── ARROW CONTROLS ── */}
          <button
            onClick={() => turnPage(pageIndex - 1)}
            disabled={pageIndex === 0 || flipStep !== 'idle'}
            className={`absolute top-1/2 -left-4 md:-left-14 -translate-y-1/2 z-50 p-3 md:p-4 bg-white border border-gray-200 text-[#111827] rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:border-[#D4AF37] ${pageIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
            aria-label="Previous Page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <button
            onClick={() => turnPage(pageIndex + 1)}
            disabled={pageIndex === menuPages.length - 1 || flipStep !== 'idle'}
            className={`absolute top-1/2 -right-4 md:-right-14 -translate-y-1/2 z-50 p-3 md:p-4 bg-white border border-gray-200 text-[#111827] rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:border-[#D4AF37] ${pageIndex === menuPages.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
            aria-label="Next Page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* The Book Binding Cover */}
          <div className="bg-gray-100 rounded-xl shadow-xl border border-gray-300 p-2 md:p-3 w-full flex flex-col lg:flex-row h-[75vh] min-h-[600px] max-h-[800px] relative">
            
            {/* Center Spine Shadow (Desktop only) */}
            <div className="hidden lg:block absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/5 via-black/10 to-black/5 z-50 pointer-events-none rounded-full"></div>

            {page.isCover ? (
              /* ── ULTRA-PREMIUM COVER PAGE DESIGN ── */
              <div className={`w-full flex flex-col items-center justify-center text-center p-12 bg-white relative h-full rounded-lg shadow-sm border border-gray-200 overflow-hidden
                ${(flipStep === 'next-1' || flipStep === 'prev-1') ? 'mobile-flip-out' : ''} ${(flipStep === 'next-2' || flipStep === 'prev-2') ? 'mobile-flip-in' : ''}
              `}>
                <div className="absolute inset-4 border-[3px] border-[#D4AF37]/40 pointer-events-none rounded-lg"></div>
                <div className="absolute inset-6 border border-[#D4AF37]/20 pointer-events-none rounded-md"></div>
                
                <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm border-2 border-[#D4AF37] p-1 relative z-10">
                   <Image 
                     src="/logo.jpeg" 
                     alt="Tahera Logo" 
                     width={160} 
                     height={160} 
                     className="object-cover rounded-full" 
                     priority
                   />
                </div>
                
                <h3 className="text-xs text-[#D4AF37] tracking-[0.5em] uppercase mb-4 font-bold z-10 opacity-80">
                  EST. 1989
                </h3>
                <h1 className="text-6xl md:text-8xl font-serif text-[#111827] mb-2 tracking-widest z-10">
                  Tahera
                </h1>
                <h2 className="text-xl font-serif italic text-[#D4AF37] mb-6 z-10">
                  Premium Restaurant
                </h2>
                
                <GoldDivider />
                
                <button 
                  onClick={() => turnPage(1)}
                  className="mt-8 px-12 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-sm hover:bg-[#D4AF37] hover:text-white transition-all duration-300 z-10 rounded-full shadow-sm hover:shadow-md"
                >
                  Open Menu
                </button>
              </div>
            ) : (
              /* TWO-PAGE SPREAD DESIGN */
              <>
                {/* ── LEFT PAGE (or Top Mobile Page) ── */}
                <div className={`w-full lg:w-1/2 p-6 md:p-10 relative flex flex-col justify-start bg-white rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none border-r border-gray-200 overflow-y-auto page-scroll h-full
                  ${flipStep === 'prev-1' ? 'flip-prev-1-left' : ''}
                  ${flipStep === 'next-2' ? 'flip-next-2-left' : ''}
                  lg:flex hidden
                `}>
                  {page.left?.img && (
                    <div className="relative w-full h-48 md:h-56 mb-8 overflow-hidden rounded-md shadow-sm border border-gray-100 shrink-0">
                      <Image src={page.left.img} alt={page.left.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  )}
                  {page.left && <MenuList title={page.left.title} items={page.left.items} />}
                  {page.left?.subCategory && (
                    <>
                      <GoldDivider />
                      <MenuList title={page.left.subCategory.title} items={page.left.subCategory.items} />
                    </>
                  )}
                </div>

                {/* ── RIGHT PAGE (or Bottom Mobile Page) ── */}
                <div className={`w-full lg:w-1/2 p-6 md:p-10 relative flex flex-col justify-start bg-white rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none overflow-y-auto page-scroll h-full
                  ${flipStep === 'next-1' ? 'flip-next-1-right' : ''}
                  ${flipStep === 'prev-2' ? 'flip-prev-2-right' : ''}
                  lg:flex hidden
                `}>
                  {page.right?.img && (
                    <div className="relative w-full h-48 md:h-56 mb-8 overflow-hidden rounded-md shadow-sm border border-gray-100 shrink-0">
                      <Image src={page.right.img} alt={page.right.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  )}
                  {page.right && <MenuList title={page.right.title} items={page.right.items} />}
                  {page.right?.subCategory && (
                    <>
                      <GoldDivider />
                      <MenuList title={page.right.subCategory.title} items={page.right.subCategory.items} />
                    </>
                  )}
                </div>

                {/* ── MOBILE FULL PAGE RENDERER ── */}
                <div className={`flex lg:hidden flex-col w-full bg-white p-6 rounded-lg h-full overflow-y-auto page-scroll
                  ${(flipStep === 'next-1' || flipStep === 'prev-1') ? 'mobile-flip-out' : ''}
                  ${(flipStep === 'next-2' || flipStep === 'prev-2') ? 'mobile-flip-in' : ''}
                `}>
                  {page.left?.img && (
                    <div className="relative w-full h-48 mb-8 overflow-hidden rounded-md shadow-sm border border-gray-100 shrink-0">
                      <Image src={page.left.img} alt={page.left.title} fill sizes="100vw" className="object-cover" />
                    </div>
                  )}
                  {page.left && <MenuList title={page.left.title} items={page.left.items} />}
                  {page.left?.subCategory && <MenuList title={page.left.subCategory.title} items={page.left.subCategory.items} />}
                  
                  <GoldDivider />
                  
                  {page.right?.img && (
                    <div className="relative w-full h-48 mb-8 overflow-hidden rounded-md shadow-sm border border-gray-100 shrink-0">
                      <Image src={page.right.img} alt={page.right.title} fill sizes="100vw" className="object-cover" />
                    </div>
                  )}
                  {page.right && <MenuList title={page.right.title} items={page.right.items} />}
                  {page.right?.subCategory && <MenuList title={page.right.subCategory.title} items={page.right.subCategory.items} />}
                </div>

              </>
            )}
            
          </div>
          
          {/* Pagination Indicator */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-gray-500 tracking-[0.3em] font-bold text-xs uppercase">
            Page {pageIndex + 1} of {menuPages.length}
          </div>

        </main>
        
      </div>
    </div>
  );
}