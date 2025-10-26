import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";

const Cart = () => {

    const { products, currency, cartItems, removeFromCart, getCartCount, updateCartItem, getCartAmount, navigate } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState(dummyAddress);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState("COD");
    const [editCartQuantity, seteditCartQuantity] = useState(1);

    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            product.quantity = cartItems[key];
            tempArray.push(product);
        }
        setCartArray(tempArray);
    }

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    const placeOrder = async () => {

    };


    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2.5fr_1fr_0.5fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (

                    <div key={index} className="grid grid-cols-[2.5fr_1fr_0.5fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => {
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0)
                            }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex flex-col items-start'>
                                        <p className="font-medium">Qty:
                                            <span className="font-medium text-primary-dull"> { }
                                                {
                                                    ((product.quantity <= 0) ? 0 : product.quantity)
                                                }
                                            </span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-primary-dull">Change Quantity: </span>
                                            <input defaultValue={1} type="number" min={1} onChange={e => { seteditCartQuantity(Number(e.target.value)) }} placeholder="1" className="font-medium text-gray-500 black/60 outline-none border border-black/20 rounded-lg self- p-1 w-16" />

                                            <button className="border border-primary bg-primary font-light m-0.5 p-1 rounded-lg text-white hover:bg-primary-dull active:bg-white active:text-primary-dull active:border-primary-dull transition-all" onClick={e => {
                                                const value = editCartQuantity;
                                                if (!isNaN(value) && value > 0) {
                                                    updateCartItem(product._id, cartItems[product._id] + value);
                                                }
                                                
                                            }}>Add</button>
                                            <button className="border border-gray-900 bg-gray-900 font-light m-0.5 p-1 rounded-lg text-white hover:bg-gray-600 hover:border-gray-600 active:bg-white active:text-gray-900 active:border-gray-900 transition-all" onClick={e => {
                                                const value = editCartQuantity;
                                                
                                                if (!isNaN(value) && value > 0 && product.quantity >= value) {
                                                    updateCartItem(product._id, cartItems[product._id] - value);
                                                }


                                            }}>Remove</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center"> {((product.offerPrice * product.quantity) <= 0) ? currency + 0 : currency + (product.offerPrice * product.quantity)}</p>
                        <button className="cursor-pointer mx-auto">
                            <img onClick={() => removeFromCart(product._id)} src={assets.remove_icon} alt="remove" className="inline-block w-6 h-6" />
                        </button>
                    </div>)
                )}

                <button className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img src={assets.arrow_right_icon_colored} alt="green arrow" className="group-hover:-translate-x-0.5 group-active:-translate-x-2 transition-all" />
                    <p onClick={() => { navigate('/products'); scrollTo(0, 0) }}>
                        Continue Shopping
                    </p>
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border rounded-lg border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border rounded-lg border-gray-300 text-sm w-full">
                                {addresses.map((address, index) => (
                                    <p onClick={() => { setSelectedAddress(address); setShowAddress(false) }} className="text-gray-500 p-2 hover:bg-gray-100">
                                        {address.street},{address.city}.{address.state}, {address.country}
                                    </p>
                                ))}
                                <p onClick={() => { navigate('/add-address') }} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{Number((getCartAmount() * 0.02).toFixed(2))}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartAmount() + Number((getCartAmount() * 0.02).toFixed(2))}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 border cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull active:bg-white active:text-primary active:border-1 active:border-primary transition-all rounded-lg">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null
}

export default Cart;