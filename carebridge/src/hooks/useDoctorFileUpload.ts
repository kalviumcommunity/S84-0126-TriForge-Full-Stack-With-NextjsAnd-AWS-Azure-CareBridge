'use client'

import { useState } from 'react'

interface UploadMetadata {
    title: string
    description: string
    recordType: string
}

interface UseDoctorFileUploadReturn {
    uploadFile: (file: File, metadata: UploadMetadata) => Promise<any>
    isUploading: boolean
    error: string | null
    success: boolean
}

export function useDoctorFileUpload(): UseDoctorFileUploadReturn {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const uploadFile = async (file: File, metadata: UploadMetadata) => {
        setIsUploading(true)
        setError(null)
        setSuccess(false)

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('No authentication token found')
            }

            // Create FormData
            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', metadata.title)
            formData.append('description', metadata.description)
            formData.append('recordType', metadata.recordType)

            // Upload to doctor-specific API endpoint
            const response = await fetch('/api/doctor/documents', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Upload failed')
            }

            setSuccess(true)
            return result
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Upload failed'
            setError(errorMessage)
            throw err
        } finally {
            setIsUploading(false)
        }
    }

    return {
        uploadFile,
        isUploading,
        error,
        success
    }
}