"use client"
import React from 'react'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LayoutProps {
  children: React.ReactNode
  showProfileButton?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, showProfileButton = true }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark">
      <header className="bg-slate-800/90 backdrop-blur-sm shadow-2xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Content Management System
              </h1>
            </div>
            {showProfileButton && (
              <a href="/admin">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2 bg-purple-600/20 border-purple-400/50 text-purple-100 hover:bg-purple-500/30 hover:border-purple-300 transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  Admin Panel
                </Button>
              </a>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout
