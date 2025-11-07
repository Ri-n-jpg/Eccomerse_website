import React from 'react'
import Title from '../components/Title';
import {assets} from '../assets/assets';
import NewsletterBox from '../components/Newsletter';
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to ShopEase, your ultimate destination for effortless shopping. Discover thousands of products across fashion, electronics, home essentials, and more — all in one place. We’re here to make your shopping experience smooth, secure, and satisfying, with great deals and fast delivery right to your doorstep.</p>
<p>At StyleStreet, we believe fashion is more than just clothing — it’s confidence, creativity, and comfort. Explore the latest trends, timeless classics, and everything in between. Whether you’re dressing up for a special occasion or keeping it casual, we’ve got you covered with styles that define you.</p>
<b className='text-gray-800'>Our Mission</b>
<p>Step into the future with TechCart — your go-to hub for cutting-edge gadgets and electronics. We bring you the latest innovations, trusted brands, and top-rated products designed to enhance your everyday life. Experience technology made simple, accessible, and affordable.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2 ={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>“Shop Smart. Live Better.”</p>
        </div>
        <div className='border px-10 md:px-16 py-8 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>“Your One-Stop Destination for Everything You Love.”</p>
        </div>
        <div className='border px-10 md:px-16 py-8 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>“Where Style Meets Savings.”</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About