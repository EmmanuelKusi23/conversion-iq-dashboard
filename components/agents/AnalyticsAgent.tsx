'use client';

import { Metric } from '@/types';

const mockMetrics: Metric[] = [
  { name: 'Total Conversions', value: 629, change: 18.5, period: 'monthly' },
  { name: 'Avg CPA', value: 12.4, change: -8.2, period: 'monthly' },
  { name: 'Click-Through Rate', value: 4.2, change: 12.3, period: 'monthly' },
  { name: 'Cost Per Click', value: 2.8, change: -5.4, period: 'monthly' },
];

// Mock chart data
const dailyROASData = [
  { date: 'Jan 20', value: 3.8 },
  { date: 'Jan 21', value: 4.1 },
  { date: 'Jan 22', value: 3.9 },
  { date: 'Jan 23', value: 4.5 },
  { date: 'Jan 24', value: 4.2 },
  { date: 'Jan 25', value: 4.8 },
  { date: 'Jan 26', value: 4.3 },
  { date: 'Jan 27', value: 4.6 },
];

const platformPerformance = [
  { platform: 'Meta', installs: 35200, spend: 8500, roas: 4.2, color: 'bg-blue-500' },
  { platform: 'Google', installs: 28400, spend: 6200, roas: 5.1, color: 'bg-red-500' },
  { platform: 'TikTok', installs: 19800, spend: 4800, roas: 3.6, color: 'bg-purple-500' },
];

const retentionData = [
  { day: 'Day 1', rate: 72 },
  { day: 'Day 3', rate: 58 },
  { day: 'Day 7', rate: 41 },
  { day: 'Day 14', rate: 32 },
  { day: 'Day 30', rate: 24 },
];

export default function AnalyticsAgent() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockMetrics.map((metric) => (
          <div key={metric.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.name}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {metric.name.includes('Rate') ? `${metric.value}%` : metric.value}
            </div>
            <div className={`text-xs font-medium flex items-center ${
              metric.change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="mr-1">{metric.change > 0 ? '↑' : '↓'}</span>
              {Math.abs(metric.change)}% vs last month
            </div>
          </div>
        ))}
      </div>

      {/* ROAS Trend Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            ROAS Trend (Last 7 Days)
          </h3>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Avg:</span>
            <span className="font-bold text-green-600">4.3x</span>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between space-x-2">
          {dailyROASData.map((data, idx) => {
            const maxValue = 5;
            const height = (data.value / maxValue) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t relative" style={{ height: '200px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-ciq-primary to-ciq-secondary rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ height: `${height}%` }}
                  />
                  <div className="absolute -top-6 left-0 right-0 text-center text-xs font-semibold text-gray-900 dark:text-white">
                    {data.value}x
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">{data.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Platform Performance Comparison
        </h3>
        <div className="space-y-6">
          {platformPerformance.map((platform) => {
            const totalInstalls = platformPerformance.reduce((sum, p) => sum + p.installs, 0);
            const percentage = (platform.installs / totalInstalls) * 100;

            return (
              <div key={platform.platform}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${platform.color} rounded-full`} />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {platform.platform}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {platform.installs.toLocaleString()} installs
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                  <div
                    className={`${platform.color} h-3 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Spend: GHS {platform.spend.toLocaleString()}</span>
                  <span className="font-semibold text-green-600">ROAS: {platform.roas}x</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Retention Cohort */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          User Retention Curve
        </h3>
        <div className="space-y-3">
          {retentionData.map((data) => (
            <div key={data.day}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">{data.day}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{data.rate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${data.rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Funnel Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Conversion Funnel
        </h3>
        <div className="space-y-4">
          {[
            { stage: 'Ad Impressions', count: 1500000, percentage: 100 },
            { stage: 'Ad Clicks', count: 63000, percentage: 4.2 },
            { stage: 'Landing Page Visits', count: 58000, percentage: 92.1 },
            { stage: 'App Installs', count: 12500, percentage: 21.6 },
            { stage: 'First Transaction', count: 4200, percentage: 33.6 },
          ].map((stage, idx) => (
            <div key={stage.stage} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-ciq-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{stage.stage}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {stage.count.toLocaleString()}
                  </div>
                  {idx > 0 && (
                    <div className="text-xs text-gray-500">{stage.percentage}% conversion</div>
                  )}
                </div>
              </div>
              {idx < 4 && (
                <div className="ml-4 border-l-2 border-gray-300 dark:border-gray-600 h-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Anomaly Detection */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">🔍</div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              Anomaly Detected
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
              Unusual spike in CTR (+34%) detected on Jan 26 for TikTok campaigns. Investigation shows
              new UGC creative is performing exceptionally well.
            </p>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Connected Data Sources
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {['Firebase', 'Meta Ads Manager', 'Google Analytics', 'AppsFlyer', 'Looker Studio', 'BigQuery'].map((source) => (
            <div key={source} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{source}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
