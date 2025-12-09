import axiosInstance from "./axiosConfig"


export const getProductsShowcase = async () => {
    const res = await axiosInstance.get("/products/show-case")
    return res.data
}

export const getProductById = async (id) => {
    const res = await axiosInstance.get(`/products/list/${id}`)
    return res.data
}

export const getProductsByCategory = async (id) => {
    const res = await axiosInstance.get(`/products/category/${id}`)
    return res.data
}

export const deleteProductById = async (id) => {
    const res = await axiosInstance.delete(`/products/delete/${id}`)
}

export const createProduct = async () => {
    const res = await axiosInstance.post("/products/save")
}

export const updateProductById = async (id) => {
    const res = await axiosInstance.put(`/products/update/${id}`)
}

export const searchProducts = async (query, page = 0, size = 10) => {
    const res = await axiosInstance.get(`/products/search`, {
        params: { query, page, size },
    })
    return res.data
}

export const listAllProducts = async (page = 0, size = 10, sortBy = "id", sortDir = "asc") => {
    const res = await axiosInstance.get(`/products/list`, {
        params: { page, size }
    })
    return res.data
}


export const getFilteredProducts = async (page = 0, size = 10, query, categoryIds, minPrice, maxPrice) => {
    const finalMinPrice = minPrice === "" ? null : minPrice
    const finalMaxPrice = maxPrice === "" ? null : maxPrice

    const res = await axiosInstance.get(`products/filtered`, {
        params: {
            page,
            size,
            query,
            categoryIds,
            minPrice: finalMinPrice,
            maxPrice: finalMaxPrice,
        }
    })

    return res.data
}
