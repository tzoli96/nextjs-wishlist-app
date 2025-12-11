# Wishlist App

A modern wishlist application built with Next.js 16, TypeScript, Tailwind CSS, and Zustand for state management.

## Features

- Browse products from the Fake Store API
- Add/remove products to/from wishlist
- View detailed product information
- Responsive design (mobile-first)
- LocalStorage persistence for wishlist
- Smooth animations and transitions
- Modern minimalist design

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persist middleware
- **API**: Fake Store API

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wishlist
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
wishlist/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Home page (product list)
│   ├── loading.tsx          # Loading state
│   ├── globals.css          # Global styles
│   ├── product/
│   │   └── [id]/
│   │       ├── page.tsx     # Product details page
│   │       └── not-found.tsx
│   └── wishlist/
│       └── page.tsx         # Wishlist page
├── components/              # React components
│   ├── Navigation.tsx       # Header navigation
│   ├── ProductCard.tsx      # Product card component
│   └── WishlistButton.tsx   # Wishlist toggle button
├── store/                   # Zustand store
│   └── useWishlistStore.ts  # Wishlist state management
├── types/                   # TypeScript types
│   └── product.ts           # Product interface
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## Pages

### 1. Product List (/)
- Displays all products in a responsive grid
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns
- Each card shows: image, title, price, rating, wishlist button

### 2. Product Details (/product/[id])
- Shows detailed product information
- Image, title, description, price, category, rating
- Add/remove from wishlist button
- Back to products link

### 3. Wishlist (/wishlist)
- Lists all saved products
- Remove button for each item
- Empty state with message and link back to products
- Persistent across sessions (localStorage)

## Features Details

### State Management
- Zustand store with localStorage persistence
- Automatic state hydration
- Type-safe store operations

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized for all screen sizes

### Animations
- Smooth hover effects
- Fade transitions
- Scale transformations
- Color transitions

## API Endpoints Used

- `GET https://fakestoreapi.com/products` - Fetch all products
- `GET https://fakestoreapi.com/products/{id}` - Fetch single product

## Development

Run linting:
```bash
npm run lint
```

## Deployment

This app is ready to be deployed on Vercel:

1. Push your code to GitHub
2. Import the repository to Vercel
3. Deploy with default settings

Or use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

## Author

Created for the Wishlist App coding challenge

## License

MIT
