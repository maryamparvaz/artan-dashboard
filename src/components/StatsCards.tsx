"use client"
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, FileText, Plus, Minus } from 'lucide-react'

interface StatsCardsProps {
  todayStats: { added: number; deleted: number }
  totalStats: { total: number; totalAdded: number; totalDeleted: number }
}

const StatsCards: React.FC<StatsCardsProps> = ({ todayStats, totalStats }) => {
  const statsData = [
    {
      title: 'افزوده شده امروز',
      value: todayStats.added,
      icon: Plus,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    {
      title: 'حذف شده امروز',
      value: todayStats.deleted,
      icon: Minus,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-100'
    },
    {
      title: 'مجموع محتوا',
      value: totalStats.total,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'کل افزوده شده',
      value: totalStats.totalAdded,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      iconBg: 'bg-indigo-100'
    },
    {
      title: 'کل حذف شده',
      value: totalStats.totalDeleted,
      icon: TrendingDown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {statsData.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.iconBg} p-3 rounded-full`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default StatsCards
