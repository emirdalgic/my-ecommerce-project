import React, { useEffect, useState } from 'react'
import { deleteAddress, getUserAddresses, saveAddress, updateAddress } from '../api/addressService'
import AddressCard from '../components/AddressCard'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../api/authService'

function AddressPage() {
  const navigate = useNavigate()

  const [addresses, setAddresses] = useState([])

  const [formState, setFormState] = useState({
    title: "",
    fullAddress: ""
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)


  useEffect(() => {
    if (!getCurrentUser()) {
      navigate("/login")
    }
    const fetchAddress = async () => {
      let response
      try {
        response = await getUserAddresses()
        console.log(response);
        setAddresses(response)
      } catch (error) {
        console.log(error);
      }
    }
    fetchAddress()
  }, [])


  const handleEditClick = (address) => {
    setFormState({
      title: address.title,
      fullAddress: address.fullAddress
    })
    setIsEditing(true)
    setEditingId(address.id)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isEditing) {
        const response = await updateAddress(formState, editingId)
        setAddresses(prev => prev.map(item => item.id === editingId ? response : item))
        console.log("updated");

      } else {
        const response = await saveAddress(formState)
        setAddresses(prev => prev.map(item => item.id === editingId ? response : item))
        console.log("saved");
        if (response && response.id) {
          setAddresses(prev => [...prev, response])
        }

      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return

    try {
      await deleteAddress(id)
      setAddresses(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.log(error);

    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingId(null)
    formState({
      title: "",
      fullAddress: ""
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Addresses</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="font-bold mb-2">{isEditing ? 'Edit the Address' : 'Add New Address'}</h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Address title"
            value={formState.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <textarea
            name="fullAddress"
            placeholder="Street Address"
            value={formState.fullAddress}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {isEditing ? 'Update' : 'Save'}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid gap-4">
        {addresses && addresses.length > 0 ? (
          addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          ))
        ) : (
          <p>You don't have a registered address yet.</p>
        )}
      </div>
    </div>
  )
}

export default AddressPage