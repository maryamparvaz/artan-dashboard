'use client'

import React from 'react'
import { Bell, User, Settings, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import RightSidebar from '@/components/RightSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center justify-between">
            {/* Left side - Title */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                Analytics Dashboard
              </h1>
              <p className="text-slate-400 text-sm mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Right side - Search, Notifications, Profile */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-9 bg-slate-800/50 border-slate-700/50 w-[200px] focus:w-[300px] transition-all duration-300"
                />
              </div>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5 text-slate-400" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-slate-800 border-slate-700">
                  <DropdownMenuLabel className="text-slate-200">Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">New content added</p>
                      <p className="text-sm text-slate-400">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Content updated</p>
                      <p className="text-sm text-slate-400">1 hour ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">System update</p>
                      <p className="text-sm text-slate-400">3 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                  <DropdownMenuLabel className="text-slate-200">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-red-400 hover:bg-slate-700/50 cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <RightSidebar />
      </div>
    </div>
  )
}

export default DashboardLayout
