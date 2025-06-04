"use client";

import React, { useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Activity,
  ShoppingCart,
  Eye,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodayStats,
  selectTotalStats,
  fetchContents,
} from "@/store/contentStore";
import type { RootState, AppDispatch } from "@/store/store";
import StatsCards from "@/components/StatsCards";
import AnalyticsChart from "@/components/AnalyticsChart";
import ActivityGaugeChart from "@/components/ActivityGaugeChart";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activities, status } = useSelector(
    (state: RootState) => state.content
  );
  const todayStats = useSelector(selectTodayStats);
  const totalStats = useSelector(selectTotalStats);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContents());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Users",
      value: "2,381",
      change: "+15.3%",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Conversion Rate",
      value: "12.5%",
      change: "+5.2%",
      icon: Target,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Page Views",
      value: "98,543",
      change: "+12.7%",
      icon: Eye,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 max-w-[2000px] mx-auto">
        {/* Header Stats */}
        <div className="flex flex-wrap -mx-2 sm:-mx-3">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/4 px-2 sm:px-3 mb-4 sm:mb-6"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 h-full">
                <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-400 text-sm font-medium truncate">
                        {stat.title}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-white mt-1 truncate">
                        {stat.value}
                      </p>
                      <p className="text-emerald-400 text-sm mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${stat.color} flex-shrink-0`}
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Large Chart */}
          <div className="flex-1 lg:flex-[2]">
            <Card className="bg-slate-800/50 border-slate-700/50 h-[300px] sm:h-[450px]">
              <CardHeader className="p-4 sm:p-6 border-b border-slate-700/50">
                <CardTitle className="text-slate-100 text-lg sm:text-xl">
                  Analytics Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-60px)] p-0 sm:p-6">
                <AnalyticsChart data={activities} />
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Side Stats */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:w-full">
          {/* Today's Activity Card */}
          <Card className="bg-slate-800/50 border-slate-700/50 flex-1 min-h-[280px] sm:min-h-[200px] w-full sm:w-1/2 mt-4 ">
            <CardHeader className="p-3 sm:p-4 border-b border-slate-700/50">
              <CardTitle className="text-slate-100 flex items-center gap-2 text-base sm:text-lg">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-3 flex flex-col h-[calc(100%-48px)]">
              <div className="flex-1 flex flex-col">
                <div className="flex-1 mb-3 sm:mb-4">
                  <ActivityGaugeChart
                    added={todayStats.added}
                    deleted={todayStats.deleted}
                    title="Activity Progress"
                    description="Shows the ratio of content added vs deleted"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3 bg-slate-800/30 rounded-lg p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">
                      Content Added
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-cyan-400">
                      {todayStats.added}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">
                      Content Deleted
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-red-400">
                      {todayStats.deleted}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="bg-slate-800/50 border-slate-700/50 h-[280px] sm:h-[610px] w-full sm:w-1/2 overflow-y-auto">
            <CardHeader className="p-3 sm:p-4 border-b border-slate-700/50 sticky top-0 bg-slate-800/50 z-10">
              <CardTitle className="text-slate-100 flex items-center gap-2 text-base sm:text-lg">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="grid grid-cols-1 gap-2 sm:gap-3 h-full">
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/20">
                      <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                    </div>
                    <span className="text-slate-200 text-sm font-medium">
                      Total Content
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-blue-400">
                    {totalStats.total}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/20">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    </div>
                    <span className="text-slate-200 text-sm font-medium">
                      Total Created
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-emerald-400">
                    {totalStats.totalAdded}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-red-500/20">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                    </div>
                    <span className="text-slate-200 text-sm font-medium">
                      Total Deleted
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-red-400">
                    {totalStats.totalDeleted}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/20">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                    </div>
                    <span className="text-slate-200 text-sm font-medium">
                      Active Users
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-purple-400">
                    2,381
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/20">
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                    </div>
                    <span className="text-slate-200 text-sm font-medium">
                      Total Orders
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-cyan-400">
                    1,245
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-lg border border-orange-500/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-orange-500/20">
                      <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                    </div>
                    <span className="text-slate-200 text-sm font-medium">
                      Revenue
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-orange-400">
                    $45,231
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Additional Charts Row */}
        <div className="flex flex-wrap -mx-2 sm:-mx-3">
          {/* Performance Card */}
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-4 sm:mb-6">
            <Card className="bg-slate-800/50 border-slate-700/50 h-[360px] sm:h-[400px]">
              <CardHeader className="p-4 sm:p-6 border-b border-slate-700/50">
                <CardTitle className="text-slate-100 text-base sm:text-lg">
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6 h-full flex flex-col justify-center">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm sm:text-base">
                      CPU Usage
                    </span>
                    <span className="text-cyan-400 font-semibold text-sm sm:text-base">
                      45%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm sm:text-base">
                      Memory
                    </span>
                    <span className="text-purple-400 font-semibold text-sm sm:text-base">
                      67%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                      style={{ width: "67%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm sm:text-base">
                      Storage
                    </span>
                    <span className="text-emerald-400 font-semibold text-sm sm:text-base">
                      23%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-full rounded-full"
                      style={{ width: "23%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Sources Card */}
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-4 sm:mb-6">
            <Card className="bg-slate-800/50 border-slate-700/50 h-[360px] sm:h-[400px]">
              <CardHeader className="p-4 sm:p-6 border-b border-slate-700/50">
                <CardTitle className="text-slate-100 text-base sm:text-lg">
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6 h-full flex flex-col justify-center">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm sm:text-base">
                      Direct
                    </span>
                    <span className="text-blue-400 font-semibold text-sm sm:text-base">
                      35%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm sm:text-base">
                      Social Media
                    </span>
                    <span className="text-purple-400 font-semibold text-sm sm:text-base">
                      28%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm sm:text-base">
                      Search Engine
                    </span>
                    <span className="text-emerald-400 font-semibold text-sm sm:text-base">
                      25%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm sm:text-base">
                      Email
                    </span>
                    <span className="text-orange-400 font-semibold text-sm sm:text-base">
                      12%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Card */}
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 mb-4 sm:mb-6">
            <Card className="bg-slate-800/50 border-slate-700/50 h-[360px] sm:h-[400px]">
              <CardHeader className="p-4 sm:p-6 border-b border-slate-700/50">
                <CardTitle className="text-slate-100 text-base sm:text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4 h-full">
                  <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-200 text-sm font-medium truncate">
                        New user registered
                      </p>
                      <p className="text-slate-400 text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-200 text-sm font-medium truncate">
                        Order completed
                      </p>
                      <p className="text-slate-400 text-xs">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-200 text-sm font-medium truncate">
                        Payment received
                      </p>
                      <p className="text-slate-400 text-xs">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-200 text-sm font-medium truncate">
                        System update
                      </p>
                      <p className="text-slate-400 text-xs">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
