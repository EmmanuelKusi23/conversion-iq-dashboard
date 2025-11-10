'use client';

import { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
  const statusColors = {
    active: 'bg-green-500',
    idle: 'bg-gray-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div
      onClick={onClick}
      className="agent-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl border border-gray-200 dark:border-gray-700"
    >
      {/* Header with Icon and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className={`${agent.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
          {agent.icon}
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 ${statusColors[agent.status]} rounded-full`} />
          <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
            {agent.status}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {agent.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {agent.description}
      </p>

      {/* Action Button */}
      <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium text-sm">
        Open Agent →
      </button>
    </div>
  );
}
