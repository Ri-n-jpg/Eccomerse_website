import React from 'react'
import Hero from '../components/Hero';  // no curly braces for default export
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import Policy from '../components/Policy';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Policy />
      <Newsletter />
    </div>
  )
}

export default Home;
