'use client';

import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';

export default function Products({ products }) {
  const { addToCart } = useContext(CartContext);
  const [sortOrder, setsortOrder] = useState('none');
  const [filterOrder, setfilterOrder] = useState('none');
  const [filteredProduct, setfilteredProduct] = useState(products);

  console.log(products);
  

    // ======Sort-Products====== 
   const sortProducts = (order) => {
    const sortedProducts = [...products]?.sort((a, b) => {
      if (order === 'lowToHigh') {
        return a?.price - b?.price;
      } else if (order === 'highToLow') {
        return b?.price - a?.price;
      }
      return 0;
    });
    setfilteredProduct(sortedProducts);
  };

  // ======Filter Category====== 
  const selectCategory = (cat) => {
    if (cat === 'none') {
      setfilteredProduct(products); // Show all products if no category is selected
    } else {
      setfilteredProduct(products?.filter(product=>product?.category=== cat))
    }
  }
  
//======Sort-Order Selection====== 
  const handleSortChange = (e) => {
    const order = e.target.value;
    setsortOrder(order); 
    sortProducts(order); 
  };

//======filter-Order Selection====== 
  const handlefilterChange = (e) => {
    const order = e.target.value;
    setfilterOrder(order); 
    selectCategory(order); 
  };

  const handleDragStart = (e, product) => {
    
    // Store product info in the drag data transfer object
    e.dataTransfer.setData('product', JSON.stringify(product)); 
  };


  return (
    <>
    <div className='w-[85%] m-auto flex justify-between '>
    <div>
      {/* ======Sort-Select======  */}
       <form className='sort-select'>
        <select 
          as="select" 
          value={sortOrder} 
          onChange={handleSortChange} 
          className='select-control custom-select' 
          style={{textAlign:'center',fontWeight:'bold'}}
        >
           <option value="none">Sort by price  </option>
           <option value="lowToHigh">Low to High</option>
           <option value="highToLow">High to Low</option>
        </select>
      </form>
    </div>

    <div>
      {/* ======category select======  */}
       <form className='sort-select'>
        <select 
          as="select" 
          value={filterOrder} 
          onChange={handlefilterChange} 
          className='select-control custom-select' 
          style={{textAlign:'center',fontWeight:'bold'}}
        >
           <option value="none">Select category </option>
           <option value="men's clothing">Men's Clothing</option>
           <option value="women's clothing">Women's Clothing</option>
           <option value="jewelery">Jewellery</option>
           <option value="electronics">Electronics</option>
        </select>
      </form>
    </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {filteredProduct.map((product) => (
        <div key={product.id}
             className="border-gray-600 p-4 rounded shadow text-center"
             onDragStart={(e) => handleDragStart(e, product)}
             draggable
        >
          <Link href={`/products/${product.id}`}>
          <img src={product.image} alt={product.title} className="h-40 object-contain w-full mb-2" />
          <h2 className="w-[80%} text-lg font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-500">${product.price}</p>
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="mt-2 bg-black text-white px-4 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
    </>
  );
}
