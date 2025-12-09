import axiosInstance from "./axiosConfig";

export const getCurrentUser = async () => {
    const res = await axiosInstance.get("auth/me")
    return res.data
}

export const updateUserEmail = async (email) => {
    const res = await axiosInstance.put("users/update-email", null, {
        params: { email: email }
    })
    return res.data
}