'use client';

import { Agent, AgentType } from '@/types';

interface MobileNavProps {
  isOpen: boolean;
  agents: Agent[];
  activeAgent: AgentType | null;
  onAgentSelect: (agentId: AgentType) => void;
  onClose: () => void;
}

export default function MobileNav({
  isOpen,
  agents,
  activeAgent,
  onAgentSelect,
  onClose,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Slide-in Menu */}
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 md:hidden overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
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

        {/* Agents List */}
        <div className="p-4 space-y-2">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onAgentSelect(agent.id)}
              className={`w-full p-4 rounded-lg text-left transition-colors ${
                activeAgent === agent.id
                  ? 'bg-ciq-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{agent.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold">{agent.name}</div>
                  <div className="text-xs opacity-80">{agent.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
