import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeCartItem, fetchCart } from '../redux/features/cartSlice'

const getCleanImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150?text=No+Image";
    return url.replace(/['"]+/g, '').trim();
}

function MiniCart({ onClose }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems } = useSelector((state) => state.cart)
    const { isLoggedIn } = useSelector((state) => state.auth)

    const calculateTotal = () => {
        return cartItems?.reduce((total, item) => {
            return total + (item.quantity * item.product?.price)
        }, 0).toFixed(2)
    }

    const removeItem = (e, productId) => {
        e.stopPropagation()
        dispatch(removeCartItem(productId))
            .then(() => dispatch(fetchCart()))
    }

    const handleCheckout = () => {
        onClose();
        if (!isLoggedIn) {
            navigate("/login", { state: { from: "/checkout" } })
        } else {
            navigate("/checkout")
        }
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border border-gray-100 p-6 z-50 text-center">
                <p className="text-gray-500 mb-4">Your cart is empty.</p>
                <Link
                    to="/"
                    onClick={onClose}
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden animation-fade-in">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <span className="font-bold text-gray-700">Shopping Cart ({cartItems.length})</span>
                <Link to="/cart" onClick={onClose} className="text-xs text-blue-600 hover:underline">
                    View Full Cart
                </Link>
            </div>

            <div className="max-h-80 overflow-y-auto p-4 space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start">
                        <div className="w-16 h-16 border rounded bg-gray-50 flex-shrink-0">
                            <img
                                src={getCleanImageUrl(item.product?.imageUrl)}
                                alt={item.product?.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-800 truncate">{item.product?.name}</h4>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                <span className="text-sm font-bold text-blue-600">${item.product?.price}</span>
                            </div>
                        </div>
                        <button
                            onClick={(e) => removeItem(e, item.product.id)}
                            className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-xl font-bold text-gray-900">${calculateTotal()}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default MiniCart