import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUserCart, addToCart, deleteCartItem } from "../../api/cartService.jsx"

const initialState = {
    cartItems: [],
    status: "idle",
    error: null
}

const getLocalCart = () => {
    const cart = localStorage.getItem("guestCart")
    return cart ? JSON.parse(cart) : []
}

const setLocalCart = (items) => {
    localStorage.setItem("guestCart", JSON.stringify(items))
}

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { getState, rejectWithValue }) => {
        const { auth } = getState()

        if (auth.isLoggedIn) {
            try {
                const res = await fetchUserCart()
                return res
            } catch (error) {
                return rejectWithValue(error.response?.data)
            }
        } else {
            const localItems = getLocalCart()
            return { cartItems: localItems }
        }
    }
)

export const addItemToCart = createAsyncThunk(
    "cart/addItemToCart",
    async ({ product, quantity }, { getState, rejectWithValue, dispatch }) => {
        const { auth, cart } = getState()

        if (auth.isLoggedIn) {
            try {
                const res = await addToCart(product.id, quantity)
                dispatch(fetchCart())

                return res
            } catch (error) {
                return rejectWithValue(error.response?.data)
            }
        } else {
            const currentItems = [...cart.cartItems]
            const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id)

            let updatedItems
            if (existingItemIndex >= 0) {
                updatedItems = currentItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            } else {
                updatedItems = [...currentItems, {
                    id: Date.now(),
                    product: product,
                    quantity: quantity
                }]
            }

            setLocalCart(updatedItems)
            return { cartItems: updatedItems }
        }
    }
)

export const removeCartItem = createAsyncThunk(
    "cart/delete",
    async (productId, { getState, rejectWithValue }) => {
        const { auth, cart } = getState()

        if (auth.isLoggedIn) {
            try {
                await deleteCartItem(productId)
            } catch (error) {
                return rejectWithValue(error)
            }
        } else {
            const updatedItems = cart.cartItems.filter(item => item.product.id !== productId)
            setLocalCart(updatedItems)
            return productId
        }
    }
)


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
            state.status = "idle"
            localStorage.removeItem("guestCart")
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(fetchCart.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.error = null
                if (action.payload && action.payload.cartItems) {
                    state.cartItems = action.payload.cartItems
                } else {
                    state.cartItems = Array.isArray(action.payload) ? action.payload : []
                }
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed"
                state.cartItems = []
                state.error = action.payload
            })

            .addCase(addItemToCart.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.error = null
                if (action.payload && action.payload.cartItems) {
                    state.cartItems = action.payload.cartItems
                }
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })

            .addCase(removeCartItem.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.error = null
                state.cartItems = state.cartItems.filter(
                    item => item.product.id !== action.payload
                )
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
    }
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer