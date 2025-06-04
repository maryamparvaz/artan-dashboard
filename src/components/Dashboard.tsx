'use client'

import React, { useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  DollarSign,
  Activity,
  ShoppingCart,
  Eye,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodayStats, selectTotalStats, fetchContents } from '@/store/contentStore'
import type { RootState, AppDispatch } from '@/store/store'
import StatsCards from '@/components/StatsCards'
import AnalyticsChart from '@/components/AnalyticsChart'
import ActivityGaugeChart from '@/components/ActivityGaugeChart'

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { activities, status } = useSelector((state: RootState) => state.content)
  const todayStats = useSelector(selectTodayStats)
  const totalStats = useSelector(selectTotalStats)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContents())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    )
  }

  const statsData = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Active Users",
      value: "2,381",
      change: "+15.3%",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Conversion Rate",
      value: "12.5%",
      change: "+5.2%",
      icon: Target,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Page Views",
      value: "98,543",
      change: "+12.7%",
      icon: Eye,
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-emerald-400 text-sm mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart data={activities} />
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ActivityGaugeChart 
                  added={todayStats.added}
                  deleted={todayStats.deleted}
                  title="Activity Progress"
                  description="Shows the ratio of content added vs deleted"
                />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Content Added</span>
                    <span className="text-2xl font-bold text-cyan-400">{todayStats.added}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Content Deleted</span>
                    <span className="text-2xl font-bold text-red-400">{todayStats.deleted}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-200 font-medium">Net Change</span>
                      <span className={`text-xl font-bold ${
                        todayStats.added - todayStats.deleted >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {todayStats.added - todayStats.deleted > 0 ? '+' : ''}{todayStats.added - todayStats.deleted}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Content</span>
                  <span className="text-2xl font-bold text-blue-400">{totalStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Created</span>
                  <span className="text-xl font-bold text-emerald-400">{totalStats.totalAdded}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Deleted</span>
                  <span className="text-xl font-bold text-red-400">{totalStats.totalDeleted}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100 text-lg">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">CPU Usage</span>
                <span className="text-cyan-400 font-semibold">45%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Memory</span>
                <span className="text-purple-400 font-semibold">67%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '67%'}}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300">Storage</span>
                <span className="text-emerald-400 font-semibold">23%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full" style={{width: '23%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100 text-lg">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Direct</span>
                <span className="text-blue-400 font-semibold">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Social Media</span>
                <span className="text-purple-400 font-semibold">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Search Engine</span>
                <span className="text-emerald-400 font-semibold">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Email</span>
                <span className="text-orange-400 font-semibold">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100 text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">New user registered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">Order completed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">Payment received</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">System update</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
