"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Content } from '@/store/contentStore'

interface ContentFormProps {
  initialData?: Partial<Content>
  onSubmit: (data: { title: string; description: string }) => void
  onCancel: () => void
  isEditing?: boolean
}

interface FormErrors {
  title?: string;
  description?: string;
}

const ContentForm: React.FC<ContentFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }
    
    if (description && description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    onSubmit({ 
      title: title.trim(), 
      description: description.trim() 
    })
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: undefined }))
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: undefined }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-slate-800/50 border-slate-700/50 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-slate-700/50">
          <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {isEditing ? 'Edit Content' : 'Add New Content'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-200 mb-2">
                Title <span className="text-red-400">*</span>
                <span className="text-slate-400 text-xs ml-2">
                  ({title.length}/100 characters)
                </span>
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                className={`bg-slate-700/50 border-slate-600 text-slate-100 focus:border-cyan-400 ${
                  errors.title ? 'border-red-500' : ''
                }`}
                placeholder="Enter content title"
                maxLength={100}
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-200 mb-2">
                Description
                <span className="text-slate-400 text-xs ml-2">
                  ({description.length}/500 characters)
                </span>
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className={`bg-slate-700/50 border-slate-600 text-slate-100 focus:border-cyan-400 min-h-[120px] ${
                  errors.description ? 'border-red-500' : ''
                }`}
                placeholder="Enter content description (optional)"
                maxLength={500}
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isEditing ? 'Save Changes' : 'Add Content'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContentForm
