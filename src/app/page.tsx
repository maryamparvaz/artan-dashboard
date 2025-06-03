'use client'

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Dashboard from "@/components/Dashboard"
import DashboardLayout from "@/components/DashboardLayout"

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Dashboard />
        </TooltipProvider>
      </DashboardLayout>
    </QueryClientProvider>
  )
} 