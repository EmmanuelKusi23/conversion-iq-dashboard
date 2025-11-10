# Conversion IQ Dashboard - API Documentation

This document describes the REST API endpoints available in the Conversion IQ Dashboard.

## Base URL

```
Development: http://localhost:3000/api
Production: https://dashboard.conversion-iq.com/api
```

## Authentication

All API endpoints require authentication (to be implemented with NextAuth.js).

Include the session token in the Authorization header:

```
Authorization: Bearer YOUR_SESSION_TOKEN
```

---

## Endpoints

### Health Check

#### GET /api/health

Check the health status of the application.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-28T12:00:00.000Z",
  "version": "1.0.0",
  "uptime": 3600,
  "environment": "production"
}
```

---

## Campaigns (Marketing Agent)

### GET /api/campaigns

Fetch all campaigns.

**Query Parameters:**
- `platform` (optional): Filter by platform (Meta, Google, TikTok)
- `status` (optional): Filter by status (active, paused, ended)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "SwiftPay App Install Campaign",
      "platform": "Meta",
      "status": "active",
      "budget": 5000,
      "spent": 3200,
      "roas": 4.2,
      "cpa": 12.5,
      "ctr": 3.8,
      "conversions": 256,
      "startDate": "2025-01-15T00:00:00.000Z"
    }
  ],
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### POST /api/campaigns

Create a new campaign.

**Request Body:**
```json
{
  "name": "New Campaign",
  "platform": "Meta",
  "budget": 10000,
  "startDate": "2025-02-01"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new-campaign-id",
    "name": "New Campaign",
    "status": "draft"
  },
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

---

## Clients (Account Management Agent)

### GET /api/clients

Fetch all clients.

**Query Parameters:**
- `status` (optional): Filter by status (active, onboarding, churned)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "SwiftPay",
      "industry": "FinTech",
      "status": "active",
      "monthlyRevenue": 12000,
      "startDate": "2024-09-01T00:00:00.000Z",
      "kpis": {
        "installs": 45200,
        "retention": 41,
        "clv": 87.5
      },
      "nextReportDate": "2025-02-05T00:00:00.000Z"
    }
  ],
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### POST /api/clients

Create a new client.

**Request Body:**
```json
{
  "name": "New Client Co.",
  "industry": "FinTech",
  "monthlyRevenue": 8000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new-client-id",
    "name": "New Client Co.",
    "status": "onboarding"
  },
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

---

## Invoices (Financial Operations Agent)

### GET /api/invoices

Fetch all invoices.

**Query Parameters:**
- `clientId` (optional): Filter by client
- `status` (optional): Filter by status (draft, sent, paid, overdue)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "INV-001",
      "clientId": "1",
      "clientName": "SwiftPay",
      "amount": 12000,
      "currency": "GHS",
      "status": "paid",
      "dueDate": "2025-01-31T00:00:00.000Z",
      "paidDate": "2025-01-28T00:00:00.000Z",
      "type": "monthly"
    }
  ],
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### POST /api/invoices

Create a new invoice.

**Request Body:**
```json
{
  "clientId": "1",
  "amount": 12000,
  "currency": "GHS",
  "dueDate": "2025-02-28",
  "type": "monthly"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "INV-123",
    "status": "draft",
    "amount": 12000
  },
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

---

## Payments (Financial Operations Agent)

### GET /api/payments

Fetch all payments.

**Query Parameters:**
- `invoiceId` (optional): Filter by invoice

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "PAY-001",
      "invoiceId": "INV-001",
      "amount": 12000,
      "method": "MTN MoMo",
      "status": "completed",
      "date": "2025-01-28T00:00:00.000Z",
      "reference": "MM-20250128-001"
    }
  ],
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### POST /api/payments

Process a new payment.

**Request Body:**
```json
{
  "invoiceId": "INV-001",
  "amount": 12000,
  "method": "MTN MoMo",
  "phoneNumber": "0244123456"
}
```

**Payment Methods:**
- `MTN MoMo`
- `Vodafone Cash`
- `AirtelTigo`
- `Bank Transfer`
- `Card`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "PAY-123",
    "status": "pending",
    "reference": "MM-1706443200000"
  },
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

---

## Tasks (Operations Agent)

### GET /api/tasks

Fetch all tasks.

**Query Parameters:**
- `status` (optional): Filter by status (todo, in-progress, completed, blocked)
- `assignee` (optional): Filter by assignee

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Review SwiftPay campaign creatives",
      "description": "Review and approve 5 new UGC videos",
      "assignee": "Creative Team",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2025-02-01T00:00:00.000Z",
      "tags": ["marketing", "creative", "urgent"]
    }
  ],
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### POST /api/tasks

Create a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "assignee": "Team Member",
  "priority": "high",
  "dueDate": "2025-02-05",
  "tags": ["marketing"]
}
```

### PATCH /api/tasks

Update task status.

**Request Body:**
```json
{
  "id": "1",
  "status": "completed"
}
```

---

## Analytics (Analytics Agent)

### GET /api/analytics

Fetch analytics data.

**Query Parameters:**
- `startDate` (optional): Start date for data range
- `endDate` (optional): End date for data range
- `metric` (optional): Specific metric to fetch

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "name": "Total Conversions",
        "value": 629,
        "change": 18.5,
        "period": "monthly"
      }
    ],
    "roasTrend": [
      {
        "date": "2025-01-20",
        "value": 3.8
      }
    ],
    "platformPerformance": [
      {
        "platform": "Meta",
        "installs": 35200,
        "spend": 8500,
        "roas": 4.2
      }
    ],
    "retention": [
      {
        "day": "Day 1",
        "rate": 72
      }
    ]
  },
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### POST /api/analytics/anomaly

Detect anomalies in metrics.

**Request Body:**
```json
{
  "metric": "CTR",
  "threshold": 30
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "anomaliesDetected": true,
    "details": [
      {
        "metric": "CTR",
        "date": "2025-01-26",
        "expectedValue": 4.2,
        "actualValue": 5.6,
        "deviation": 33.3,
        "severity": "high"
      }
    ]
  },
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

---

## Error Responses

All endpoints return standard error responses:

```json
{
  "success": false,
  "error": "Error message describing what went wrong",
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Free Tier**: 100 requests per 15 minutes
- **Authenticated**: 1000 requests per 15 minutes

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1706443200
```

---

## Webhooks

Configure webhooks to receive real-time notifications:

### Supported Events

- `campaign.created`
- `campaign.updated`
- `payment.received`
- `invoice.overdue`
- `task.completed`
- `anomaly.detected`

### Webhook Payload

```json
{
  "event": "payment.received",
  "timestamp": "2025-01-28T12:00:00.000Z",
  "data": {
    "paymentId": "PAY-001",
    "amount": 12000,
    "clientId": "1"
  }
}
```

---

## External API Integrations

### Meta Ads API

```typescript
// Sync campaigns from Meta Ads
POST /api/integrations/meta/sync

// Response:
{
  "success": true,
  "campaignsSynced": 12,
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### Google Ads API

```typescript
// Sync campaigns from Google Ads
POST /api/integrations/google/sync
```

### Flutterwave Payment API

```typescript
// Initialize payment
POST /api/integrations/flutterwave/initialize

// Verify payment
GET /api/integrations/flutterwave/verify/:reference
```

---

## SDK / Client Libraries

Coming soon:
- JavaScript/TypeScript SDK
- Python SDK
- PHP SDK

---

## Support

For API support or questions, contact the Conversion IQ development team.

**API Version**: 1.0.0
**Last Updated**: January 2025
