import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount } = useAppContext();

    const logout = async () => {
        setUser(null);
        navigate('/');
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to={'/'} onClick={() => setOpen(false)}>
                <img className='h-9 hover:scale-125 transition-all hover:drop-shadow-primary hover:drop-shadow-2xl' src={assets.logo} alt='Logo' />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to={'/'} className={'group flex flex-col items-center w-max'}>
                    Home
                    <div className='group-hover:w-full self-center transition-all w-0 h-0.5 bg-primary rounded-full'></div>
                </NavLink>
                <NavLink to={'/products'} className={'group flex flex-col items-center w-max'}>
                    All Products
                    <div className='group-hover:w-full self-center transition-all w-0 h-0.5 bg-primary rounded-full'></div>
                </NavLink>
                <NavLink to={'/'} className={'group flex flex-col items-center w-max'}>
                    Contact
                    <div className='group-hover:w-full self-center transition-all w-0 h-0.5 bg-primary rounded-full'></div>
                </NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border transition-all hover:shadow-primary hover:shadow-lg hover:scale-105 border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='Search' className='w-4 h-4' />
                </div>

                <div onClick={() => navigate("/cart")} className="relative cursor-pointer transition-all hover:drop-shadow-2xl hover:drop-shadow-primary">
                    <img src={assets.cart_icon} alt='Cart' className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {!user ? (<button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary border border-primary hover:border-primary-dull hover:bg-primary-dull transition-all text-white rounded-full hover:shadow-2xl hover:shadow-primary active:bg-white active:text-primary active:text-shadow-md active:text-shadow-primary active:border-1 active:border-primary active:shadow-2xl active:shadow-primary active:scale-85">
                    Login
                </button>) :
                    (
                        <div className='relative group'>
                            <img src={assets.profile_icon} className='w-10' alt="Profile" />
                            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40 '>
                                <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer active:bg-primary/40 transition-all'>My Orders</li>
                                <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer active:bg-primary/40 transition-all'>Logout</li>
                            </ul>
                        </div>
                    )
                }
            </div>

            <div className='flex items-center gap-6 sm:hidden'>
                {/* Cart for mobile */}
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt='Cart' className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt='Menu' />
                </button>
            </div>


            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-10`}>
                    <NavLink to={'/'} onClick={() => setOpen(false)} className="block">Home</NavLink>
                    <NavLink to={'/products'} onClick={() => setOpen(false)} className="block">All Products</NavLink>
                    {user &&
                        <NavLink to={'/products'} onClick={() => setOpen(false)} className="block">My Orders</NavLink>
                    }
                    <NavLink to={'/'} className="block">Contact</NavLink>

                    <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                        <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                        <img src={assets.search_icon} alt='Search' className='w-4 h-4' />
                    </div>

                    {!user ? (
                        <button onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>) : (
                        <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>)}

                </div>
            )
            }

        </nav >
    );
};

export default Navbar