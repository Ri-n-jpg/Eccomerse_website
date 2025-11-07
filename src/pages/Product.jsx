import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext); // ✅ include currency
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState('');
  const [size,setSize]=useState('');

  // Fetch product data
  const fetchProductData = () => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProduct(found);
      setImage(found.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  return product?(
<div>
  <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100' >
<div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
  <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
    <div className='flex sm:flex-col overflow-x-auto  sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
   {
    product.image.map((item,index)=>(
      <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
    ))
   }</div>
   <div className='w-full sm:w-[80%]'>
    <img className='w-full h-auto' src={image} alt="" />
   </div>
    </div>
    <div className='flex-1'>
      <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
      <div className='flex items-center gap-1 mt-2'>
        <img src={assets.star_icon} alt="" className='w-3 5' />
        <img src={assets.star_icon} alt="" className='w-3 5' />
        <img src={assets.star_icon} alt="" className='w-3 5' />
        <img src={assets.star_icon} alt="" className='w-3 5' />
        <img src={assets.star_dull_icon} alt=""  className='w-3 5'/>
      </div>
      <p className='mt-5 text-3xl font-medium'>{currency}{product.price}</p>
      <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
      <div className='flex flex-col gap-4 my-8'>
         <p>Select size</p>
            <div className="flex gap-2">
              {product  && product.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}

        </div>
      </div>
      <button onClick={()=>addToCart(product._id,size)} className=' bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
      <hr className='mt-8 sm:w-4/5'/>
      <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
        <p>100% Original Product.</p>
        <p>Cash on delivery is available on this product.</p>
        <p>Easy return and exchange policy within 7 days</p>
      </div>
    </div>

  </div>
  <div className='mt-20'>
    <div className='flex'>
      <b className='border px-5 py-3 text-sm'>Description</b>
      <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
    </div>
    <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet enim minima a et incidunt laudantium beatae error perferendis blanditiis unde similique sapiente quos repellat vel laboriosam, placeat assumenda numquam veritatis?
    </div>
  </div>
</div>
<RelatedProduct category={product.category} subCategory={product.subCategory} />
  </div>
  ):<div className="opacity-0"></div>
};

export default Product;
