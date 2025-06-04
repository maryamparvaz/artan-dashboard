'use client'

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import ContentForm from '@/components/ContentForm'
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog'
import { useToast } from '@/hooks/use-toast'
import { fetchContents, addContent, updateContent, deleteContent } from '@/store/contentStore'
import type { Content } from '@/services/contentApi'

interface DeleteDialogState {
  isOpen: boolean
  contentId: number | null
  contentTitle: string
}

export default function ContentPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { contents, status, error } = useSelector((state: RootState) => state.content)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({ 
    isOpen: false, 
    contentId: null, 
    contentTitle: '' 
  })
  const { toast } = useToast()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContents())
    }
  }, [status, dispatch])

  const handleAddContent = async (data: { title: string; description: string }) => {
    try {
      await dispatch(addContent(data)).unwrap()
      setIsFormOpen(false)
      toast({
        title: "Success",
        description: "Content added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add content",
        variant: "destructive"
      })
    }
  }

  const handleEditContent = async (data: { title: string; description: string }) => {
    if (!editingContent) return
    try {
      await dispatch(updateContent({ id: editingContent.id, content: data })).unwrap()
      setEditingContent(null)
      toast({
        title: "Success", 
        description: "Content updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive"
      })
    }
  }

  const handleDeleteClick = (content: Content) => {
    setDeleteDialog({
      isOpen: true,
      contentId: content.id,
      contentTitle: content.title
    })
  }

  const handleDeleteConfirm = async () => {
    if (deleteDialog.contentId === null) return
    try {
      await dispatch(deleteContent(deleteDialog.contentId)).unwrap()
      setDeleteDialog({ isOpen: false, contentId: null, contentTitle: '' })
      toast({
        title: "Success",
        description: "Content deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive"
      })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, contentId: null, contentTitle: '' })
  }

  if (isFormOpen || editingContent) {
    return (
      <DashboardLayout>
        <ContentForm
          initialData={editingContent || undefined}
          onSubmit={editingContent ? handleEditContent : handleAddContent}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingContent(null)
          }}
          isEditing={!!editingContent}
        />
      </DashboardLayout>
    )
  }

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  if (status === 'failed') {
    return (
      <DashboardLayout>
        <div className="text-center p-8">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <Button 
            onClick={() => dispatch(fetchContents())}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            Try Again
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 ">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Content Management
            </h1>
            <p className="text-slate-400 mt-2">Manage your content items</p>
          </div>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Content
          </Button>
        </div>

        {/* Content List */}
        <div className="grid gap-4">
          {contents.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-8 text-center">
                <p className="text-slate-400 text-lg mb-4">No content found</p>
                <Button 
                  onClick={() => setIsFormOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Content
                </Button>
              </CardContent>
            </Card>
          ) : (
            contents.map((content) => (
              <Card key={content.id} className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-slate-100 text-xl mb-2">
                        {content.title}
                      </CardTitle>
                      {content.description && (
                        <p className="text-slate-300 text-sm">
                          {content.description}
                        </p>
                      )}
                      <p className="text-slate-400 text-xs mt-2">
                        Created: {content.createdDate}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingContent(content)}
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteClick(content)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title={deleteDialog.contentTitle}
        />
      </div>
    </DashboardLayout>
  )
} 