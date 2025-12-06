import axiosInstance from "./axiosConfig";

export const getCurrentUser = async () => {
    const res = await axiosInstance.get("auth/me")
    return res.data
}