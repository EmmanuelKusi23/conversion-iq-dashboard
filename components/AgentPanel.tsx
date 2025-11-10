'use client';

import { AgentType } from '@/types';
import MarketingAgent from './agents/MarketingAgent';
import StrategyAgent from './agents/StrategyAgent';
import OperationsAgent from './agents/OperationsAgent';
import AccountAgent from './agents/AccountAgent';
import FinancialAgent from './agents/FinancialAgent';
import AnalyticsAgent from './agents/AnalyticsAgent';

interface AgentPanelProps {
  agentType: AgentType;
  onClose: () => void;
}

const agentTitles: Record<AgentType, string> = {
  marketing: 'Marketing Agent',
  strategy: 'Strategy Agent',
  operations: 'Operations Agent',
  account: 'Account Management Agent',
  financial: 'Financial Operations Agent',
  analytics: 'Analytics Agent',
};

export default function AgentPanel({ agentType, onClose }: AgentPanelProps) {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {agentTitles[agentType]}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time monitoring and management
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Agent Content */}
      <div className="space-y-6">
        {agentType === 'marketing' && <MarketingAgent />}
        {agentType === 'strategy' && <StrategyAgent />}
        {agentType === 'operations' && <OperationsAgent />}
        {agentType === 'account' && <AccountAgent />}
        {agentType === 'financial' && <FinancialAgent />}
        {agentType === 'analytics' && <AnalyticsAgent />}
      </div>
    </div>
  );
}
