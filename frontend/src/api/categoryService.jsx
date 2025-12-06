import React from 'react'
import axiosInstance from './axiosConfig'

export const getAllCategories=async()=>{
    const res = await axiosInstance.get("/categories/list")
    return res.data
}

export const getCategoryById=async(id)=>{
    const res = await axiosInstance.get(`/categories/list/${id}`)
    return res.data
}