import axiosInstance from "./axiosConfig"

export const deleteCartItem = async (productId) => {
    const res = await axiosInstance.delete(`/cart/delete-item/${productId}`)
    return res.data
}

export const addToCart = async (productId, quantity) => {
    const payload = {
        productId: productId,
        quantity: quantity
    }
    const res = await axiosInstance.post("/cart/add-item", payload)
    return res.data
}

export const fetchUserCart = async () => {
    const res = await axiosInstance.get(`/cart/my-cart`)
    return res.data
}
