'use client';

import { useState } from 'react';
import { Agent, AgentType } from '@/types';
import AgentCard from './AgentCard';
import AgentPanel from './AgentPanel';
import Header from './Header';
import MobileNav from './MobileNav';

const agents: Agent[] = [
  {
    id: 'marketing',
    name: 'Marketing Agent',
    icon: '📈',
    description: 'Manage paid campaigns, creatives, and performance tracking',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    status: 'active',
  },
  {
    id: 'strategy',
    name: 'Strategy Agent',
    icon: '🧭',
    description: 'Align campaigns with business goals and market trends',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    status: 'active',
  },
  {
    id: 'operations',
    name: 'Operations Agent',
    icon: '⚙️',
    description: 'Coordinate workflows, SOPs, and team productivity',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    status: 'active',
  },
  {
    id: 'account',
    name: 'Account Management',
    icon: '🤝',
    description: 'Handle client onboarding, reporting, and retention',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    status: 'active',
  },
  {
    id: 'financial',
    name: 'Financial Operations',
    icon: '💰',
    description: 'Automate billing, payments, and financial tracking',
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    status: 'active',
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    icon: '📊',
    description: 'Centralize data collection and performance insights',
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    status: 'active',
  },
];

export default function DashboardLayout() {
  const [activeAgent, setActiveAgent] = useState<AgentType | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ghana Flag Accent */}
      <div className="ghana-accent" />

      {/* Header */}
      <Header
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onHomeClick={() => setActiveAgent(null)}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {!activeAgent ? (
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to Conversion IQ Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Your centralized command center for performative marketing operations in Ghana
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
                <div className="text-xs text-green-600">+3 this week</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg ROAS</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">3.8x</div>
                <div className="text-xs text-green-600">+0.4 from last month</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Clients</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
                <div className="text-xs text-gray-600">2 onboarding</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">GHS 45K</div>
                <div className="text-xs text-green-600">+12% MoM</div>
              </div>
            </div>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AgentCard
                    agent={agent}
                    onClick={() => setActiveAgent(agent.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <AgentPanel
            agentType={activeAgent}
            onClose={() => setActiveAgent(null)}
          />
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        agents={agents}
        activeAgent={activeAgent}
        onAgentSelect={(agentId) => {
          setActiveAgent(agentId);
          setIsMobileMenuOpen(false);
        }}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 Conversion IQ - Lean, Scalable Performative Marketing in Ghana</p>
          <p className="mt-1 text-xs">🇬🇭 Built for Ghana, Optimized for Performance</p>
        </div>
      </footer>
    </div>
  );
}
