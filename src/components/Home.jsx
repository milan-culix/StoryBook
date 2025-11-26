import { useNavigate } from 'react-router-dom'
import { categories, stories } from '../data/stories.json'

function Home() {
  const navigate = useNavigate()

  const getCategoryThumbnail = (category) => {
    const categoryStories = stories[category]
    if (categoryStories && categoryStories.length > 0) {
      return categoryStories[0].image
    }
    return 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
  }

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-slide-down">
              Tales & Stories
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

