import { useNavigate, Link } from 'react-router-dom'
import { stories, categoryImages } from '../data/stories.json'

function Home() {
  const navigate = useNavigate()
  const categories = Object.keys(stories)

  const getCategoryThumbnail = (category) => {
    // Use the dedicated category image if available
    if (categoryImages && categoryImages[category]) {
      return categoryImages[category]
    }
    // Fallback to default image if category image not found
    return '/images/categories/default.jpg'
  }

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/80 via-blue-50/80 to-indigo-50/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Story Verse
              </h1>
            </div>
            <div className="flex items-center">
              <Link
                to="/admin/login"
                className="group flex items-center space-x-2 px-5 py-2.5 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-lg hover:bg-white/50 hover:border-purple-400 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 active:scale-105"
              >
                <svg className="w-5 h-5 text-purple-700 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-purple-700 group-hover:text-purple-600 font-bold text-sm transition-all duration-300">Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-sky-600 to-violet-500 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-slide-down">
              Story Verse
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-purple-100 animate-slide-up">
              Discover captivating stories across genres
            </p>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Immerse yourself in worlds of adventure, mystery, romance, and more
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-50 to-transparent"></div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getCategoryThumbnail(category)}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg group-hover:text-yellow-300 transition-colors">
                    {category}
                  </h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-600">
                  {stories[category]?.length || 0} {stories[category]?.length === 1 ? 'story' : 'stories'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

