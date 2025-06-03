'use client'

import React from 'react'
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  ShoppingCart,
  MessageSquare,
  Calendar,
  HelpCircle,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const RightSidebar = () => {
  const pathname = usePathname()
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/', active: pathname === '/' },
    { icon: FileText, label: 'Content', href: '/content', active: pathname === '/content' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics', active: pathname === '/analytics' },
    { icon: Users, label: 'Users', href: '/users', active: pathname === '/users' },
    { icon: ShoppingCart, label: 'Orders', href: '/orders', active: pathname === '/orders' },
    { icon: MessageSquare, label: 'Messages', href: '/messages', active: pathname === '/messages' },
    { icon: Calendar, label: 'Calendar', href: '/calendar', active: pathname === '/calendar' },
    { icon: Settings, label: 'Settings', href: '/settings', active: pathname === '/settings' },
  ]

  const bottomItems = [
    { icon: HelpCircle, label: 'Help', href: '/help' },
    { icon: LogOut, label: 'Logout', href: '/logout' },
  ]

  return (
    <aside className="w-64 bg-slate-900/95 backdrop-blur-sm border-l border-slate-700/50 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CC</span>
          </div>
          <span className="text-white font-semibold text-lg">Content Compass</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Button
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-12 ${
                  item.active 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">JD</span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">John Doe</p>
            <p className="text-slate-400 text-xs">Administrator</p>
          </div>
        </div>
        
        <div className="space-y-1">
          {bottomItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-10 text-slate-300 hover:text-white hover:bg-slate-800/50"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar
