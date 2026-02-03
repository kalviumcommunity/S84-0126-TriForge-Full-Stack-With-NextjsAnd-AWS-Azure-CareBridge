'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface DoctorFileUploadProps {
  onUpload: (file: File, metadata: { title: string; description: string; recordType: string }) => Promise<void>
  isUploading?: boolean
  defaultTitle?: string
  defaultRecordType?: string
}

export default function DoctorFileUpload({ 
  onUpload, 
  isUploading = false, 
  defaultTitle = "Medical License Document",
  defaultRecordType = "MEDICAL_LICENSE"
}: DoctorFileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState(defaultTitle)
  const [description, setDescription] = useState('')
  const [recordType, setRecordType] = useState(defaultRecordType)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file || !title || !recordType) {
      alert('Please fill in all required fields and select a file')
      return
    }

    try {
      await onUpload(file, { title, description, recordType })
      // Reset form
      setFile(null)
      setTitle(defaultTitle)
      setDescription('')
      setRecordType(defaultRecordType)
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Upload Area */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Upload Document *
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-600 hover:border-slate-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
            className="hidden"
            id="doctor-file-upload"
            disabled={isUploading}
          />
          
          {file ? (
            <div className="space-y-2">
              <svg className="w-8 h-8 text-blue-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-blue-400 font-medium">{file.name}</p>
              <p className="text-slate-400 text-sm">{formatFileSize(file.size)}</p>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-slate-400 hover:text-white text-sm underline"
                disabled={isUploading}
              >
                Remove file
              </button>
            </div>
          ) : (
            <div>
              <svg className="w-8 h-8 text-slate-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-slate-400 text-sm mb-1">
                <label htmlFor="doctor-file-upload" className="cursor-pointer text-blue-400 hover:text-blue-300">
                  Click to upload
                </label>
                {' '}or drag and drop
              </p>
              <p className="text-slate-500 text-xs">PDF, JPG, PNG, DOC up to 10MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Document Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Medical License - State of California"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={isUploading}
        />
      </div>

      {/* Document Type */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Document Type *
        </label>
        <select
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={isUploading}
        >
          <option value="">Select document type</option>
          <option value="MEDICAL_LICENSE">Medical License</option>
          <option value="CERTIFICATE">Medical Certificate</option>
          <option value="QUALIFICATION">Educational Qualification</option>
          <option value="SPECIALIZATION">Specialization Certificate</option>
          <option value="OTHER">Other Professional Document</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional notes about this document..."
          rows={3}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isUploading}
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <motion.button
          whileHover={{ scale: isUploading ? 1 : 1.02 }}
          whileTap={{ scale: isUploading ? 1 : 0.98 }}
          type="submit"
          disabled={isUploading || !file || !title || !recordType}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            'Upload Document'
          )}
        </motion.button>
      </div>
    </form>
  )
}