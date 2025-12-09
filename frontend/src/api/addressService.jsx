import axiosInstance from "./axiosConfig";

export const getUserAddresses = async () => {
    const res = await axiosInstance.get("/address/list")
    return res.data
}

export const saveAddress = async (data) => {
    const res = await axiosInstance.post("/address/save", data)
    return res.data
}

export const getAddressById = async (addressId) => {
    const res = await axiosInstance.get(`/address/list/${addressId}`)
    return res.data
}

export const updateAddress = async (data, addressId) => {
    const res = await axiosInstance.put(`/address/update/${addressId}`, data)
    return res.data
}

export const deleteAddress = async (addressId) => {
    const res = await axiosInstance.delete(`/address/delete/${addressId}`)
    return res.data
}