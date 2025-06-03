'use client'

import React from 'react'
import { ArrowLeft, BarChart3, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import AnalyticsChart from '@/components/AnalyticsChart'
import StatsCards from '@/components/StatsCards'
import { useSelector } from 'react-redux'
import { selectTodayStats, selectTotalStats } from '@/store/contentStore'
import type { RootState } from '@/store/store'

export default function AdminPage() {
  const activities = useSelector((state: RootState) => state.content.activities)
  const todayStats = useSelector(selectTodayStats)
  const totalStats = useSelector(selectTotalStats)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-700/50">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-cyan-400" />
                Admin Panel
              </h1>
              <p className="text-slate-300 mt-1">Content management system statistics and reports</p>
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0 shadow-2xl shadow-cyan-500/25">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
                <p className="text-cyan-100">Welcome to the content management system admin panel. Here you can view comprehensive system statistics and reports.</p>
              </div>
              <Users className="w-16 h-16 text-cyan-200" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <StatsCards todayStats={todayStats} totalStats={totalStats} />

        {/* Analytics Chart */}
        <AnalyticsChart data={activities} />

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-2xl shadow-emerald-500/10 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Content Added:</span>
                  <span className="font-bold text-emerald-400 text-lg">{todayStats.added}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Content Deleted:</span>
                  <span className="font-bold text-red-400 text-lg">{todayStats.deleted}</span>
                </div>
                <div className="border-t border-slate-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200 font-medium">Net Change:</span>
                    <span className={`font-bold text-lg ${
                      todayStats.added - todayStats.deleted >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {todayStats.added - todayStats.deleted > 0 ? '+' : ''}{todayStats.added - todayStats.deleted}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl shadow-violet-500/10 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Overall Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Current Total Content:</span>
                  <span className="font-bold text-blue-400 text-lg">{totalStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Created:</span>
                  <span className="font-bold text-emerald-400 text-lg">{totalStats.totalAdded}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Deleted:</span>
                  <span className="font-bold text-red-400 text-lg">{totalStats.totalDeleted}</span>
                </div>
                <div className="border-t border-slate-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200 font-medium">Retention Rate:</span>
                    <span className="font-bold text-lg text-violet-400">
                      {totalStats.totalAdded > 0 
                        ? Math.round((totalStats.total / totalStats.totalAdded) * 100) 
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 