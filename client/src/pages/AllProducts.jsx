import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {

    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchQuery]);


    return (
        <div className='mt-16 flex flex-col'>
            <div className='group flex flex-col transition-all items-center w-max'>
                <p className='text-2xl font-medium uppercase'>All Products</p>
                <div className='group-hover:w-full self-start transition-all w-11 h-0.5 bg-primary rounded-full'></div>
                {/* <div className='group-hover:w-full self-start blur-xs transition-all w-0 h-0.5 bg-primary shadow-xs shadow-primary rounded-full'></div>
                <p className="hidden text-2xl text-shadow-xs blur-xs text-shadow-black -skew-x-24 font-medium uppercase transition-all group-hover:block text-black group-hover:scale-y-[-1]">
                    All Products
                </p> */}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                    {filteredProducts.filter((product) => product.inStock).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
            </div>
        </div>
    )
}

export default AllProducts
