import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProductById } from '../api/productService';
import { getAllCategories } from '../api/categoryService';

const AdminProductForm = () => {
    const { productId } = useParams();

    const navigate = useNavigate();
    const isEditMode = Boolean(productId);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stockAmount: "",
        description: "",
        imageUrl: "",
        categoryId: "",
        images: []
    });

    const [categories, setCategories] = useState([]);
    const [newImageInput, setNewImageInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getProductById(productId)
                .then((data) => {
                    const extraImages = data.productImages
                        ? data.productImages.map((img) => img.imageUrl)
                        : [];

                    setFormData({
                        name: data.name,
                        price: data.price,
                        stockAmount: data.stockAmount,
                        description: data.description,
                        imageUrl: data.imageUrl,
                        categoryId: data.category?.id || "",
                        images: extraImages
                    });
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [productId, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddImage = () => {
        if (!newImageInput.trim()) return;

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, newImageInput]
        }));
        setNewImageInput("");
    };

    const handleRemoveImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            productImages: formData.images,
            categoryId: formData.categoryId
        };
        delete payload.images;

        try {
            if (isEditMode) {
                await updateProductById(productId, payload);
                alert("Product successfully updated!");
            } else {
                await createProduct(payload);
                alert("New product created!");
            }
            navigate("/admin");
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !formData.name)
        return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
                {isEditMode ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                        <option value="" disabled>
                            Select a Category
                        </option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <div className="flex gap-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock Amount
                        </label>
                        <input
                            type="number"
                            name="stockAmount"
                            value={formData.stockAmount}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
                    ></textarea>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Image Management
                    </h3>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Main Cover Image (URL)
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="flex-1 border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 outline-none"
                            />
                            {formData.imageUrl && (
                                <img
                                    src={formData.imageUrl}
                                    alt="Main"
                                    className="w-12 h-12 object-cover rounded border"
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Extra Product Images
                        </label>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newImageInput}
                                onChange={(e) => setNewImageInput(e.target.value)}
                                placeholder="Extra image URL..."
                                className="flex-1 border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 outline-none"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddImage();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleAddImage}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Add
                            </button>
                        </div>
                        {formData.images.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                {formData.images.map((imgUrl, index) => (
                                    <div
                                        key={index}
                                        className="relative group border rounded-lg overflow-hidden h-24 bg-white"
                                    >
                                        <img
                                            src={imgUrl}
                                            alt={`slide-${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400 italic">
                                No extra images added yet.
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 shadow-md"
                    >
                        {loading
                            ? "Processing..."
                            : isEditMode
                                ? "Save Changes"
                                : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductForm;
