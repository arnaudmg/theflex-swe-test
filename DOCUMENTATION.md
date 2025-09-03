# The Flex - Review Management System Documentation

## Tech Stack

### Core Technologies

- **Next.js 15.5.2** - React framework with App Router for server-side rendering and API routes
- **React 19.1.0** - Frontend library with latest features including concurrent rendering
- **TypeScript 5** - Type-safe development with strict configuration
- **Tailwind CSS 4** - Utility-first CSS framework for responsive design

### Development Tools

- **ESLint 9** - Code linting with Next.js configuration
- **Lucide React 0.542.0** - Icon library for consistent UI elements
- **PostCSS** - CSS processing with Tailwind integration

### Architecture

- **App Router** - Next.js 13+ routing system with nested layouts
- **API Routes** - Server-side endpoints for data management
- **Client Components** - Interactive React components with hooks
- **TypeScript Interfaces** - Strongly typed data models

## Key Design and Logic Decisions

### 1. Review Management Architecture

- **Centralized API**: Single `/api/reviews/hostaway` endpoint handles all review operations
- **Mock Data Strategy**: Uses comprehensive mock data (35+ reviews) with realistic guest names and scenarios
- **Status Management**: In-memory Map for review status changes (pending/approved/rejected)
- **Data Normalization**: Converts raw Hostaway data to standardized `NormalizedReview` format

### 2. Component Architecture

- **Dashboard-First Design**: Primary interface focuses on review management workflow
- **Property Pages**: Dynamic routing with slug-based property identification
- **Modal System**: Reusable modals for amenities and gallery views
- **Responsive Grid**: XL breakpoint grid layout (821px + 395px) for optimal content distribution

### 3. User Experience Decisions

- **Backlog Mode**: Specialized view for pending reviews with purple accent
- **Real-time Updates**: Optimistic UI updates with API confirmation
- **Export Functionality**: CSV export with filtered data
- **Email Integration**: Direct mailto links for guest contact
- **French Localization**: Primary language set to French with appropriate date formatting

### 4. Data Flow

- **Single Source of Truth**: All reviews fetched from one API endpoint
- **Client-side Filtering**: Advanced filtering and sorting without server round-trips
- **Property-specific Views**: Filter reviews by property name for public display
- **Statistics Calculation**: Real-time stats computation from filtered data

## API Behaviors

### GET /api/reviews/hostaway

**Purpose**: Retrieve all reviews with optional filtering
**Parameters**:

- `accountId` (optional): Defaults to `HOSTAWAY_ACCOUNT_ID` environment variable or "61148"
- `apiKey` (optional): Defaults to `HOSTAWAY_API_KEY` environment variable

**Response Format**:

```json
{
  "status": "success",
  "data": [NormalizedReview[]],
  "meta": {
    "total": number,
    "accountId": string,
    "fetchedAt": string
  }
}
```

**Key Features**:

- Sorts reviews by submission date (newest first)
- Calculates average category ratings
- Converts string dates to Date objects
- Includes review status from in-memory changes

### POST /api/reviews/hostaway

**Purpose**: Update review status (approve/reject/pending)
**Request Body**:

```json
{
  "reviewId": number,
  "status": "pending" | "approved" | "rejected"
}
```

**Response Format**:

```json
{
  "status": "success",
  "message": string,
  "data": {
    "reviewId": number,
    "status": string
  }
}
```

**Validation**:

- Requires both `reviewId` and `status`
- Validates status against allowed values
- Returns 400 for invalid requests
- Stores changes in memory Map for persistence

### Error Handling

- Comprehensive try-catch blocks with detailed error messages
- HTTP status codes (400, 500) for different error types
- Console logging for debugging
- Graceful fallbacks for network failures

## Google Reviews Findings

### Current Integration

- **Google Maps Embed**: Property details page includes embedded Google Maps iframe
- **Location**: 10 Rue de Rivoli, Paris (hardcoded coordinates)
- **No Google Reviews API**: No integration with Google My Business or Google Reviews API

### Missing Google Reviews Features

- No Google Reviews data fetching or display
- No Google My Business integration
- No cross-platform review aggregation
- No Google-specific review management

### Potential Enhancements

- Integrate Google My Business API for review fetching
- Add Google Reviews alongside Hostaway reviews
- Implement review aggregation across platforms
- Add Google-specific review response functionality

## Technical Implementation Notes

### Image Handling

- Next.js Image component with remote patterns for Hostaway S3
- Optimized loading with lazy loading and proper sizing
- Gallery modal system for full-screen image viewing

### State Management

- React hooks for local state management
- No external state management library (Redux/Zustand)
- Props drilling for component communication
- useEffect for data fetching and side effects

### Performance Considerations

- Client-side filtering and sorting for responsiveness
- Memoized calculations with useMemo
- Optimistic UI updates for better perceived performance
- Lazy loading for images and modals

### Security

- API keys stored in environment variables (`.env.local`)
- No authentication system implemented
- CORS handling through Next.js API routes
- Input validation on API endpoints

This system provides a solid foundation for review management with room for expansion into multi-platform review aggregation and enhanced Google integration.
