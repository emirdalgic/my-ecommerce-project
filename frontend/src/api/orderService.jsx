import axiosInstance from "./axiosConfig"

export const getUserOrders = async (page = 0, size = 10) => {
    const res = await axiosInstance.get("orders/my-orders", {
        params: { page, size }
    })
    return res.data
}


export const saveOrder = async (addressId) => {
    const res = await axiosInstance.post(`orders/save/${addressId}`)
    return res.data
}