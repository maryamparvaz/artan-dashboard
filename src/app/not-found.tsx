'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const pathname = usePathname()

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    )
  }, [pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-slate-300 mb-4">Oops! Page not found</p>
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 underline">
          Return to Home
        </Link>
      </div>
    </div>
  )
} 