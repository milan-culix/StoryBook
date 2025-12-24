import { useParams, useNavigate, Link } from 'react-router-dom'
import { stories, categoryImages } from '../data/stories.json'

function Category() {
  const { categoryName } = useParams()
  const navigate = useNavigate()
  const decodedCategory = decodeURIComponent(categoryName)
  const categoryStories = stories[decodedCategory] || []
  const categoryImage = categoryImages?.[decodedCategory] || '/images/categories/default.png'

  const handleStoryClick = (storyId) => {
    navigate(`/story/${encodeURIComponent(decodedCategory)}/${storyId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{decodedCategory}</h1>
          <p className="text-gray-600">{categoryStories.length} {categoryStories.length === 1 ? 'story' : 'stories'} available</p>
        </div>

        {/* Stories Grid */}
        {categoryStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryStories.map((story, index) => (
              <div
                key={story.id}
                onClick={() => handleStoryClick(story.id)}
                className="group bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = categoryImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {story.content.substring(0, 150)}...
                  </p>
                  <button className="text-blue-600 font-semibold group-hover:text-blue-800 transition-colors">
                    Read Story →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No stories available in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Category

