# Short Story Web App

A beautiful, animated React web application for reading short stories across multiple genres.

## Features

- **17 Story Categories**: Historical, Horror, Real-life, Fanfiction, Slice of Life, Magical Realism, Western, Drama, Comedy, Adventure, Romance, Crime, Detective, Thriller, Mystery, Science Fiction, and Fantasy
- **Hero Section**: Eye-catching landing page with animated elements
- **Category Grid**: 3x4 grid layout displaying all categories with thumbnails
- **Category Pages**: Browse stories within each category
- **Book-like Reading Experience**: Immersive two-page layout with images and text
- **Pagination**: Navigate through story pages with forward/backward arrows
- **Smooth Animations**: Dynamic transitions and hover effects throughout

## Installation

1. Navigate to the project directory:
```bash
cd D:\short-story-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

## Build for Production

```bash
npm run build
```

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Vite

## Project Structure

```
short-story-app/
├── src/
│   ├── components/
│   │   ├── Home.jsx          # Home page with hero and categories
│   │   ├── Category.jsx      # Category page showing stories
│   │   └── Story.jsx         # Story reading page with book UI
│   ├── data/
│   │   └── stories.js        # Story data for all categories
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles and animations
├── index.html
├── package.json
└── README.md
```

## Usage

1. **Home Page**: Browse all available story categories in a beautiful grid layout
2. **Category Page**: Click on any category to see stories in that genre
3. **Story Page**: Click on a story to read it in a book-like interface
   - Use arrow buttons to navigate between pages
   - View pagination indicator (current page / total pages)
   - When finished, choose to "Read Again" or "Go Back" to the category

Enjoy reading!

