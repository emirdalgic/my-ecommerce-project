import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteProductById, getFilteredProducts } from '../api/productService'
import { createCategory, getAllCategories, deleteCategoryById, renameCategoryById } from '../api/categoryService'
import SearchBar from '../components/SearchBar'

function AdminPage() {
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isLast, setIsLast] = useState(false)
    const [query, setQuery] = useState("")

    const [categories, setCategories] = useState([])
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState("")

    const [editingCategoryId, setEditingCategoryId] = useState(null)
    const [editingName, setEditingName] = useState("")

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProductById(id)
                setProducts(prev => prev.filter(p => p.id !== id))
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleSearch = (val) => {
        setCurrentPage(0)
        setQuery(val)
    }

    const openCategoryModal = async () => {
        setIsCategoryModalOpen(true)
        try {
            const data = await getAllCategories()
            setCategories(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return
        try {
            const res = await createCategory(newCategoryName)
            setCategories([...categories, res])
            setNewCategoryName("")
        } catch (error) {
            alert("Error occurred while adding category.")
            console.error(error)
        }
    }

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return
        try {
            await deleteCategoryById(id)
            setCategories(categories.filter(c => c.id !== id))
            alert("Category deleted.")
        } catch (error) {
            console.error("Delete error:", error)
            if (error.response && error.response.status === 500) {
                alert("THIS CATEGORY CANNOT BE DELETED!\nReason: There are products linked to this category. Please move them to another category first.")
            } else {
                alert("Category deletion failed.")
            }
        }
    }

    const startEditing = (category) => {
        setEditingCategoryId(category.id)
        setEditingName(category.name)
    }

    const cancelEditing = () => {
        setEditingCategoryId(null)
        setEditingName("")
    }

    const handleUpdateCategory = async (id) => {
        if (!editingName.trim()) return
        try {
            const res = await renameCategoryById(id, editingName)
            setCategories(categories.map(c => c.id === id ? res : c))
            cancelEditing()
        } catch (error) {
            alert("Update failed.")
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getFilteredProducts(currentPage, 12, query)
                setProducts(response.content)
                setTotalPages(response.totalPages)
                setIsLast(response.last)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProducts()
    }, [query, currentPage])

    return (
        <div className="container mx-auto p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <div className="flex gap-3">
                    <button
                        onClick={openCategoryModal}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow transition"
                    >
                        📂 Manage Categories
                    </button>
                    <button
                        onClick={() => navigate('/admin/product/new')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
                    >
                        + Add New Product
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <SearchBar value={query} onChange={handleSearch} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg shadow bg-white flex flex-col justify-between">
                            <div className="flex gap-4">
                                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-gray-600">${product.price}</p>
                                    <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                                        {product.category?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2 justify-end">
                                <Link
                                    to={`/admin/product/edit/${product.id}`}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 py-10">No products found.</div>
                )}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                >
                    Prev
                </button>
                <span className="text-gray-700 font-medium">Page {currentPage + 1} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={isLast}
                    className={`px-4 py-2 rounded ${isLast ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                >
                    Next
                </button>
            </div>

            {isCategoryModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h2 className="text-xl font-bold text-gray-800">Manage Categories</h2>
                            <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-500 hover:text-red-500 font-bold text-xl">&times;</button>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="New category name..."
                                className="flex-grow border border-gray-300 p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                            <button
                                onClick={handleCreateCategory}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Add
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-grow space-y-2 pr-2">
                            {categories.map((cat) => (
                                <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border hover:bg-gray-100">
                                    {editingCategoryId === cat.id ? (
                                        <div className="flex gap-2 w-full">
                                            <input
                                                type="text"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                className="flex-grow border p-1 rounded"
                                            />
                                            <button onClick={() => handleUpdateCategory(cat.id)} className="text-green-600 font-bold">✓</button>
                                            <button onClick={cancelEditing} className="text-red-500 font-bold">✕</button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="font-medium text-gray-700">{cat.name}</span>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => startEditing(cat)}
                                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(cat.id)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 text-right">
                            <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-500 underline text-sm">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminPage
