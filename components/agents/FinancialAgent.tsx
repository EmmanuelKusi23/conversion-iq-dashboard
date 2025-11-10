'use client';

import { Invoice, Payment, GhanaCompliance } from '@/types';

const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    clientId: '1',
    clientName: 'SwiftPay',
    amount: 12000,
    currency: 'GHS',
    status: 'paid',
    dueDate: new Date('2025-01-31'),
    paidDate: new Date('2025-01-28'),
    type: 'monthly',
  },
  {
    id: 'INV-002',
    clientId: '2',
    clientName: 'EduConnect Ghana',
    amount: 8500,
    currency: 'GHS',
    status: 'sent',
    dueDate: new Date('2025-02-05'),
    type: 'monthly',
  },
  {
    id: 'INV-003',
    clientId: '1',
    clientName: 'SwiftPay',
    amount: 5400,
    currency: 'GHS',
    status: 'paid',
    dueDate: new Date('2025-01-25'),
    paidDate: new Date('2025-01-24'),
    type: 'success-fee',
  },
  {
    id: 'INV-004',
    clientId: '4',
    clientName: 'HealthHub GH',
    amount: 6800,
    currency: 'GHS',
    status: 'overdue',
    dueDate: new Date('2025-01-27'),
    type: 'monthly',
  },
];

const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    invoiceId: 'INV-001',
    amount: 12000,
    method: 'MTN MoMo',
    status: 'completed',
    date: new Date('2025-01-28'),
    reference: 'MM-20250128-001',
  },
  {
    id: 'PAY-002',
    invoiceId: 'INV-003',
    amount: 5400,
    method: 'Bank Transfer',
    status: 'completed',
    date: new Date('2025-01-24'),
    reference: 'BT-20250124-002',
  },
];

const mockCompliance: GhanaCompliance = {
  gra: {
    lastFiling: new Date('2025-01-15'),
    nextDue: new Date('2025-02-15'),
    status: 'compliant',
  },
  ssnit: {
    lastContribution: new Date('2025-01-10'),
    amount: 2400,
    status: 'compliant',
  },
  registrarGeneral: {
    lastRenewal: new Date('2024-12-01'),
    nextDue: new Date('2025-12-01'),
    status: 'active',
  },
};

export default function FinancialAgent() {
  const totalRevenue = mockInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = mockInvoices
    .filter(i => i.status === 'sent')
    .reduce((sum, i) => sum + i.amount, 0);
  const overdueAmount = mockInvoices
    .filter(i => i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            GHS {totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">This month</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            GHS {pendingAmount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">Awaiting payment</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overdue</div>
          <div className="text-2xl font-bold text-red-600">
            GHS {overdueAmount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">Action required</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Invoices</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockInvoices.length}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {mockInvoices.filter(i => i.status === 'paid').length} paid
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invoices</h3>
            <button className="px-4 py-2 bg-ciq-primary hover:bg-ciq-primary/90 text-white rounded-lg text-sm font-medium transition-colors">
              Create Invoice
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Invoice ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockInvoices.map((invoice) => {
                const statusColors = {
                  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
                  sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
                  paid: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
                  overdue: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
                };

                return (
                  <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-4 font-mono text-sm text-gray-900 dark:text-white">
                      {invoice.id}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {invoice.clientName}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {invoice.currency} {invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {invoice.type.replace('-', ' ')}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      {invoice.dueDate.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${statusColors[invoice.status]}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="text-ciq-primary hover:text-ciq-primary/80 text-sm font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ghana Payment Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🇬🇭 Ghana Payment Methods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">📱</div>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">MTN MoMo</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {mockPayments.filter(p => p.method === 'MTN MoMo').length} transactions
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">📱</div>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Vodafone Cash</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Integrated</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">🏦</div>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Bank Transfer</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {mockPayments.filter(p => p.method === 'Bank Transfer').length} transactions
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">💳</div>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Card Payments</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Via Flutterwave</p>
          </div>
        </div>
      </div>

      {/* Ghana Compliance Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🇬🇭 Ghana Compliance Status
        </h3>
        <div className="space-y-4">
          {/* GRA */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Ghana Revenue Authority (GRA)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last filing: {mockCompliance.gra.lastFiling.toLocaleDateString()}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium capitalize">
                {mockCompliance.gra.status}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Next due: {mockCompliance.gra.nextDue.toLocaleDateString()}
            </div>
          </div>

          {/* SSNIT */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  SSNIT Contributions
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last: GHS {mockCompliance.ssnit.amount.toLocaleString()} on{' '}
                  {mockCompliance.ssnit.lastContribution.toLocaleDateString()}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium capitalize">
                {mockCompliance.ssnit.status}
              </span>
            </div>
          </div>

          {/* Registrar General */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Registrar General&apos;s Department
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last renewal: {mockCompliance.registrarGeneral.lastRenewal.toLocaleDateString()}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium capitalize">
                {mockCompliance.registrarGeneral.status}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Next renewal: {mockCompliance.registrarGeneral.nextDue.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
