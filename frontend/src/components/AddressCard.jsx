import React from 'react'

function AddressCard({ address, onDelete, onEdit }) {
    return (
        <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg">{address.title}</h3>
                <p className="text-gray-600">{address.fullAddress}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(address)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                </button>
                <button
                    onClick={() => onDelete(address.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default AddressCard