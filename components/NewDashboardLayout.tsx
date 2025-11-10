'use client';

import { useState } from 'react';
import { ViewType, Agent, TeamMember, CalendarEvent, ZoomMeeting, Activity } from '@/types';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import Calendar from './Calendar';
import Team from './Team';
import AgentPanel from './AgentPanel';
import InviteMemberModal from './modals/InviteMemberModal';
import ZoomMeetingModal from './modals/ZoomMeetingModal';

// Mock data
const mockAgents: Agent[] = [
  {
    id: 'marketing',
    name: 'Marketing Agent',
    icon: '📈',
    description: 'Manage paid campaigns, creatives, and performance tracking across Meta, Google, and TikTok',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    status: 'active',
  },
  {
    id: 'strategy',
    name: 'Strategy Agent',
    icon: '🧭',
    description: 'Align campaigns with business goals, analyze trends, and drive strategic decisions',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    status: 'active',
  },
  {
    id: 'operations',
    name: 'Operations Agent',
    icon: '⚙️',
    description: 'Coordinate workflows, manage SOPs, and optimize team productivity',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    status: 'active',
  },
  {
    id: 'account',
    name: 'Account Management',
    icon: '🤝',
    description: 'Handle client onboarding, reporting, retention, and relationship management',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    status: 'active',
  },
  {
    id: 'financial',
    name: 'Financial Operations',
    icon: '💰',
    description: 'Automate billing, payments, invoicing, and Ghana compliance tracking',
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    status: 'active',
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    icon: '📊',
    description: 'Centralize data collection, visualize performance, and generate insights',
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    status: 'active',
  },
];

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Kwame Mensah',
    email: 'kwame@conversioniq.gh',
    role: 'admin',
    department: 'marketing',
    status: 'active',
    joinedDate: new Date('2024-01-15'),
    lastActive: new Date(),
  },
  {
    id: '2',
    name: 'Ama Adjei',
    email: 'ama@conversioniq.gh',
    role: 'member',
    department: 'financial',
    status: 'active',
    joinedDate: new Date('2024-02-01'),
    lastActive: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
  },
  {
    id: '3',
    name: 'Kofi Asante',
    email: 'kofi@conversioniq.gh',
    role: 'member',
    department: 'strategy',
    status: 'active',
    joinedDate: new Date('2024-03-10'),
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: '4',
    name: 'Abena Osei',
    email: 'abena@conversioniq.gh',
    role: 'member',
    department: 'account',
    status: 'invited',
    joinedDate: new Date('2025-01-05'),
  },
];

const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'SwiftPay Campaign Launch',
    description: 'Launch new Meta Ads campaign for SwiftPay',
    type: 'campaign-launch',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    assignedTo: ['1', '2'],
    agentId: 'marketing',
    priority: 'high',
    status: 'upcoming',
    reminders: [60, 1440],
  },
  {
    id: '2',
    title: 'Monthly Client Reports Due',
    type: 'report-due',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    assignedTo: ['3'],
    agentId: 'account',
    priority: 'high',
    status: 'upcoming',
    reminders: [1440],
  },
  {
    id: '3',
    title: 'GRA Tax Filing',
    description: 'Submit monthly GRA tax returns',
    type: 'compliance',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8), // 8 days from now
    assignedTo: ['2'],
    agentId: 'financial',
    priority: 'high',
    status: 'upcoming',
    reminders: [2880, 1440],
  },
];

const mockZoomMeetings: ZoomMeeting[] = [
  {
    id: '1',
    topic: 'Weekly Team Sync',
    description: 'Review campaign performance and discuss upcoming launches',
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    duration: 30,
    joinUrl: 'https://zoom.us/j/1234567890',
    password: 'CIQ2025',
    hostId: '1',
    participants: ['1', '2', '3'],
    agendaItems: ['Campaign performance review', 'Q1 planning', 'New client onboarding'],
    status: 'scheduled',
  },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'campaign',
    userId: '1',
    userName: 'Kwame Mensah',
    action: 'launched',
    target: 'SwiftPay Meta Campaign',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    agentId: 'marketing',
  },
  {
    id: '2',
    type: 'invoice',
    userId: '2',
    userName: 'Ama Adjei',
    action: 'created invoice for',
    target: 'EduConnect Ghana',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    agentId: 'financial',
  },
  {
    id: '3',
    type: 'comment',
    userId: '3',
    userName: 'Kofi Asante',
    action: 'commented on',
    target: 'Q1 Strategy Report',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    agentId: 'strategy',
  },
  {
    id: '4',
    type: 'edit',
    userId: '1',
    userName: 'Kwame Mensah',
    action: 'updated',
    target: 'TikTok Campaign Budget',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    agentId: 'marketing',
  },
  {
    id: '5',
    type: 'invite',
    userId: '1',
    userName: 'Kwame Mensah',
    action: 'invited',
    target: 'Abena Osei',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
  },
];

export default function NewDashboardLayout() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [zoomMeetings, setZoomMeetings] = useState<ZoomMeeting[]>(mockZoomMeetings);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);
  const [isZoomMeetingModalOpen, setIsZoomMeetingModalOpen] = useState(false);

  const handleInviteMember = (data: Partial<TeamMember>) => {
    const newMember: TeamMember = {
      id: String(Date.now()),
      name: data.name!,
      email: data.email!,
      role: data.role!,
      department: data.department!,
      status: 'invited',
      joinedDate: new Date(),
    };
    setTeamMembers([...teamMembers, newMember]);

    const newActivity: Activity = {
      id: String(Date.now()),
      type: 'invite',
      userId: '1',
      userName: 'You',
      action: 'invited',
      target: newMember.name,
      timestamp: new Date(),
    };
    setActivities([newActivity, ...activities]);
  };

  const handleScheduleZoom = (data: Partial<ZoomMeeting>) => {
    const newMeeting: ZoomMeeting = {
      id: String(Date.now()),
      topic: data.topic!,
      description: data.description,
      startTime: data.startTime!,
      duration: data.duration!,
      joinUrl: data.joinUrl!,
      password: data.password,
      hostId: data.hostId!,
      participants: data.participants || [],
      agendaItems: data.agendaItems?.filter(item => item.trim() !== ''),
      status: data.status!,
    };
    setZoomMeetings([...zoomMeetings, newMeeting]);

    const newActivity: Activity = {
      id: String(Date.now()),
      type: 'meeting',
      userId: '1',
      userName: 'You',
      action: 'scheduled',
      target: newMeeting.topic,
      timestamp: new Date(),
    };
    setActivities([newActivity, ...activities]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Ghana Flag Accent */}
      <div className="fixed top-0 left-0 right-0 ghana-accent z-50" />

      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onInviteMember={() => setIsInviteMemberModalOpen(true)}
        teamMembers={teamMembers}
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 pt-5 overflow-auto">
        <div className="max-w-[1800px] mx-auto p-8">
          {currentView === 'dashboard' && (
            <DashboardHome
              agents={mockAgents}
              activities={activities}
              onAgentClick={(agentId) => setCurrentView(agentId as ViewType)}
            />
          )}

          {currentView === 'calendar' && (
            <Calendar
              events={calendarEvents}
              zoomMeetings={zoomMeetings}
              onCreateEvent={() => console.log('Create event')}
              onScheduleZoom={() => setIsZoomMeetingModalOpen(true)}
              onEventClick={(event) => console.log('Event clicked:', event)}
            />
          )}

          {currentView === 'team' && (
            <Team
              members={teamMembers}
              activities={activities}
              onInviteMember={() => setIsInviteMemberModalOpen(true)}
              onRemoveMember={(id) => setTeamMembers(teamMembers.filter(m => m.id !== id))}
              onUpdateRole={(id, role) => {
                setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, role } : m));
              }}
            />
          )}

          {['marketing', 'strategy', 'operations', 'account', 'financial', 'analytics'].includes(currentView) && (
            <AgentPanel
              agentType={currentView as any}
              onClose={() => setCurrentView('dashboard')}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <InviteMemberModal
        isOpen={isInviteMemberModalOpen}
        onClose={() => setIsInviteMemberModalOpen(false)}
        onInvite={handleInviteMember}
      />

      <ZoomMeetingModal
        isOpen={isZoomMeetingModalOpen}
        onClose={() => setIsZoomMeetingModalOpen(false)}
        onSchedule={handleScheduleZoom}
      />
    </div>
  );
}
