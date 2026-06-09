 

# CHUBB APAC

Policy Overview Dashboard - Frontend Developer


## STORY

Chubb's APAC operations team manages insurance policies across multiple regions. They currently rely on spreadsheets and need a web-based dashboard to view, filter, and act on policy data. Your task is to build the Policy Overview Dashboard — a single-page application that demonstrates production-quality frontend engineering. 

The dashboard will consume policy data from a lightweight local API (JSON Server or a simple mock server).

## Data Source

Use a lightweight mock backend to serve policy data. Provide a seed dataset of 200+ policy records matching this schema: 

| **Field** | **Type** | **Notes** |
| --- | --- | --- |
| **id** | UUID | Primary key |
| **policyNumber** | String | Unique; format: POL-XXXXXX; pattern: ``^POL-\\d{6}$`` |
| **policyholderName** | String | Realistic APAC names |
| **lineOfBusiness** | Enum | Property; Casualty; A&H; Marine |
| **status** | Enum | Active; Expired; Pending; Cancelled |
| **premiumAmount** | Decimal | Range: 1,000–5,000,000 |
| **currency** | String | USD; SGD; HKD; AUD; JPY; THB |
| **effectiveDate** | Date | ISO 8601 date |
| **expiryDate** | Date | ISO 8601 date |
| **region** | String | Singapore; Hong Kong; Australia; Japan; Thailand; Indonesia; Malaysia; Philippines |
| **underwriter** | String | Free text |
| **flaggedForReview** | Boolean | Default: false |

# Requirement

## Core Features 

### Policy Table View 

Paginated, sortable table displaying policy records 

Server-side filtering by status, line of business, date range, and region 

Free-text search across policy number, policyholder name, and underwriter 

Configurable page size with sensible defaults 

### Bulk Actions 

Multi-select policies via checkboxes 

"Flag for Review" bulk action on selected policies 

Clear visual feedback on action success/failure 

Summary Statistics Panel 

Counts by policy status (Active, Expired, Pending, Cancelled) 

Total premium by line of business 

Count of policies expiring within 30 days 

Should update when filters are applied 

### State Management 

Loading states for all async operations (skeleton screens or loading indicators, not just spinners) 

Empty states when no data matches filters 

Error states with meaningful messages and retry options 

Optimistic updates where appropriate (e.g., flagging for review) 