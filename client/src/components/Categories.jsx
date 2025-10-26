import React, { useContext } from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Categories = () => {

    const { navigate } = useAppContext();

    return (
        <div className='mt-16'>
            <div className='group w-fit'>
                <p className='text-2xl md:text-3xl font-medium'>Categories</p>
                <div className='group-hover:w-full self-start transition-all w-5 h-0.5 bg-primary rounded-full'></div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>

                {categories.map((category, index) => (
                    <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center' style={{ background: category.bgColor }} onClick={() => {
                        navigate(`/products/${category.path.toLowerCase()}`);
                        scrollTo(0, 0);
                    }}>
                        <img src={category.image} className='group-hover:scale-108 transition-max-w-28' alt={category.text} />
                        <div className='group flex flex-col items-center'>
                            <p className='text-sm font-medium'>{category.text}</p>
                            <div className='group-hover:w-full self-center transition-all w-0 h-0.5 bg-primary rounded-full'></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories
