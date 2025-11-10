import { NextResponse } from 'next/server';

// GET /api/invoices - Fetch all invoices
export async function GET() {
  try {
    const mockInvoices = [
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
    ];

    return NextResponse.json({
      success: true,
      data: mockInvoices,
      timestamp: new Date(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch invoices',
        timestamp: new Date(),
      },
      { status: 500 }
    );
  }
}

// POST /api/invoices - Create a new invoice
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: Integrate with Zoho Books or QuickBooks
    // TODO: Send invoice via email or WhatsApp Business API

    return NextResponse.json({
      success: true,
      data: { id: `INV-${Date.now()}`, ...body, status: 'draft' },
      timestamp: new Date(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create invoice',
        timestamp: new Date(),
      },
      { status: 500 }
    );
  }
}
