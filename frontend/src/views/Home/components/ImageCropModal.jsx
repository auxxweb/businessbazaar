
import { useState, useCallback } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { motion } from "framer-motion"
import { X } from "lucide-react"

export default function ImageCropperModal({ image, onCropComplete, onClose }) {
  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 })
  const [completedCrop, setCompletedCrop] = useState(null)

  const onCropChange = (newCrop) => {
    setCrop(newCrop)
  }

  const getCroppedImg = useCallback(() => {
    if (!completedCrop || !image) return

    const canvas = document.createElement("canvas")
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = completedCrop.width
    canvas.height = completedCrop.height
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    )

    canvas.toBlob((blob) => {
      if (!blob) return
      onCropComplete(blob)
    }, "image/jpeg")
  }, [completedCrop, image, onCropComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Crop Image</h2>
        <ReactCrop crop={crop} onChange={onCropChange} onComplete={(c) => setCompletedCrop(c)} aspect={1}>
          <img src={URL.createObjectURL(image) || "/placeholder.svg"} alt="Crop me" />
        </ReactCrop>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={getCroppedImg}
          >
            Crop and Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

