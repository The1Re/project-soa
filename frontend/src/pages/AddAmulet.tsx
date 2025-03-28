import React, { useState } from 'react'
import api from '../services/api'
import { Amulet } from '../models/Amulet'

export default function AddAmulet() {
  const [formData, setFormData] = useState<Omit<Amulet, 'id'>>({
    name: '',
    templeName: '',
    price: 0,
    type: '',
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    setIsError(false)

    try {
    
      const A = await api.get('/amulets', )
    console.log('ส่งข้อมูลไปยัง API:', A)


      setMessage('ลงขายพระเครื่องสำเร็จ!')
      setFormData({ name: '', templeName: '', price: 0, type: '' })
      setImagePreview(null)
    } catch (error) {
      console.error(error)
      setMessage('เกิดข้อผิดพลาดในการลงขาย')
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded mb-10">
      <h2 className="text-2xl font-bold mb-4 text-center">ลงขายพระเครื่อง</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">ชื่อพระเครื่อง</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">วัด</label>
          <input
            type="text"
            name="templeName"
            value={formData.templeName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">ประเภท</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">ราคา (บาท)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            min="0"
          />
        </div>

        {/* กล่องรูปภาพ */}
        <div>
          <label className="block font-medium mb-1">รูปภาพพระเครื่อง</label>
          <div className="w-40 h-40 border-2 border-dashed border-gray-300 flex items-center justify-center rounded cursor-pointer relative overflow-hidden">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <span className="text-4xl text-gray-400">+</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'กำลังลงขาย...' : 'ลงขาย'}
        </button>
        {message && (
          <p className={`text-center text-sm mt-2 ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
