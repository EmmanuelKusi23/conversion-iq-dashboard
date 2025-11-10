'use client';

import { StrategyInsight, KPI } from '@/types';

const mockInsights: StrategyInsight[] = [
  {
    id: '1',
    title: 'Mobile Money Integration Opportunity',
    description: 'Data shows 78% of conversions happen on mobile. Consider prioritizing MTN MoMo payment flow optimization.',
    type: 'opportunity',
    priority: 'high',
    actionItems: [
      'A/B test simplified MoMo checkout flow',
      'Partner with MTN for co-marketing campaign',
      'Add MoMo promotional banners in-app',
    ],
    date: new Date('2025-01-28'),
  },
  {
    id: '2',
    title: 'Competitor Activity - FinTech Apps',
    description: 'Competitor "MoneyFlow" launched aggressive TikTok campaign targeting 18-25 age group with 40% higher spend.',
    type: 'threat',
    priority: 'high',
    actionItems: [
      'Increase TikTok budget by 25%',
      'Create counter-campaign with local influencers',
      'Monitor competitor creatives and messaging',
    ],
    date: new Date('2025-01-27'),
  },
  {
    id: '3',
    title: 'Retention Rate Trending Up',
    description: 'Day-7 retention improved from 32% to 41% after implementing push notifications and in-app rewards.',
    type: 'trend',
    priority: 'medium',
    actionItems: [
      'Double down on push notification strategy',
      'Expand rewards program to Day-14 users',
      'Create case study for client reporting',
    ],
    date: new Date('2025-01-25'),
  },
];

const mockKPIs: KPI[] = [
  { name: 'Market Share', value: 12.5, target: 15, trend: 'up', unit: '%' },
  { name: 'User Growth Rate', value: 24, target: 30, trend: 'up', unit: '%' },
  { name: 'Avg Session Time', value: 4.2, target: 5, trend: 'stable', unit: 'min' },
  { name: 'Churn Rate', value: 18, target: 15, trend: 'down', unit: '%' },
];

export default function StrategyAgent() {
  return (
    <div className="space-y-6">
      {/* Strategic KPIs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Strategic KPIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockKPIs.map((kpi) => (
            <div key={kpi.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">{kpi.name}</div>
                <div className="text-lg">
                  {kpi.trend === 'up' && '📈'}
                  {kpi.trend === 'down' && '📉'}
                  {kpi.trend === 'stable' && '➡️'}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {kpi.value}{kpi.unit}
              </div>
              <div className="text-xs text-gray-500">
                Target: {kpi.target}{kpi.unit}
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    kpi.value >= kpi.target ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Strategic Insights & Recommendations
        </h3>
        {mockInsights.map((insight) => {
          const colors = {
            opportunity: {
              bg: 'bg-green-50 dark:bg-green-900/20',
              border: 'border-green-200 dark:border-green-800',
              icon: '💡',
              text: 'text-green-900 dark:text-green-200',
            },
            threat: {
              bg: 'bg-red-50 dark:bg-red-900/20',
              border: 'border-red-200 dark:border-red-800',
              icon: '⚠️',
              text: 'text-red-900 dark:text-red-200',
            },
            trend: {
              bg: 'bg-blue-50 dark:bg-blue-900/20',
              border: 'border-blue-200 dark:border-blue-800',
              icon: '📊',
              text: 'text-blue-900 dark:text-blue-200',
            },
          };

          const style = colors[insight.type];

          return (
            <div
              key={insight.id}
              className={`${style.bg} border ${style.border} rounded-lg p-6`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{style.icon}</div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-semibold ${style.text}`}>
                        {insight.title}
                      </h4>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded uppercase ${
                          insight.priority === 'high'
                            ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                            : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                        }`}
                      >
                        {insight.priority}
                      </span>
                    </div>
                    <p className={`text-sm ${style.text} mb-3`}>
                      {insight.description}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {insight.date.toLocaleDateString()}
                </div>
              </div>
              <div className={`${style.text} ml-11`}>
                <div className="text-xs font-semibold uppercase mb-2">Action Items:</div>
                <ul className="space-y-1">
                  {insight.actionItems.map((item, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Market Intelligence */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Market Intelligence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              🇬🇭 Ghana FinTech Trends
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Mobile money usage up 34% YoY
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                Youth (18-25) adoption rate: 67%
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                Avg transaction value: GHS 125
              </li>
            </ul>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              📱 Platform Performance
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Meta Ads ROI:</span>
                <span className="font-semibold text-green-600">4.2x</span>
              </li>
              <li className="flex justify-between">
                <span>TikTok Engagement:</span>
                <span className="font-semibold text-blue-600">+42%</span>
              </li>
              <li className="flex justify-between">
                <span>Google Search CVR:</span>
                <span className="font-semibold text-purple-600">8.3%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
