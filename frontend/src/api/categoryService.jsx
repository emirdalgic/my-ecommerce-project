import React from 'react'
import axiosInstance from './axiosConfig'

export const getAllCategories = async () => {
    const res = await axiosInstance.get("/categories/list")
    return res.data
}

export const getCategoryById = async (id) => {
    const res = await axiosInstance.get(`/categories/list/${id}`)
    return res.data
}


export const createCategory = async (categoryName) => {
    const res = await axiosInstance.post("/categories/save", null, {
        params: { name: categoryName }
    })
    return res.data
}

export const renameCategoryById = async (id, categoryName) => {
    const res = await axiosInstance.put(`/categories/update/${id}`, null, {
        params: { name: categoryName }
    })
    return res.data
}

export const deleteCategoryById = async (id) => {
    const res = await axiosInstance.delete(`/categories/delete/${id}`)
    return res.data
}