import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { stories } from '../data/stories'

function Story() {
  const { categoryName, storyId } = useParams()
  const navigate = useNavigate()
  const decodedCategory = decodeURIComponent(categoryName)
  const categoryStories = stories[decodedCategory] || []
  const story = categoryStories.find(s => s.id === storyId)

  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState([])
  const wordsPerPage = 300

  useEffect(() => {
    if (story) {
      const words = story.content.split(' ')
      const totalPages = Math.ceil(words.length / wordsPerPage)
      const pageArray = []

      for (let i = 0; i < totalPages; i++) {
        const start = i * wordsPerPage
        const end = start + wordsPerPage
        pageArray.push(words.slice(start, end).join(' '))
      }

      setPages(pageArray)
      setCurrentPage(1)
    }
  }, [story])

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Story not found.</p>
      </div>
    )
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleReadAgain = () => {
    setCurrentPage(1)
  }

  const handleGoBack = () => {
    navigate(`/category/${encodeURIComponent(decodedCategory)}`)
  }

  const isLastPage = currentPage === pages.length

  return (

    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8 px-4 flex items-center justify-center">
      <Link
        to={`/category/${encodeURIComponent(decodedCategory)}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
      <div className="w-full flex items-center justify-center">
        {/* Book-like Container */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-[95%] lg:w-[70vw] lg:max-w-[70vw] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-[80vh] lg:h-[80vh] min-h-[600px] overflow-hidden">
            {/* Left Page - Image */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 flex items-center justify-center border-r-2 border-amber-200 overflow-y-auto overflow-x-hidden">
              <div className="w-full h-full flex items-center justify-center animate-fade-in min-h-full">
                <img
                  src={story.image}
                  alt={story.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Right Page - Text */}
            <div className="bg-amber-50 p-8 md:p-12 flex flex-col overflow-hidden">
              <div className="mb-6 flex-shrink-0">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-serif">
                  {story.title}
                </h1>
                <p className="text-gray-600 italic">{decodedCategory}</p>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden mb-6 scrollbar-thin pr-2">
                <div className="text-gray-800 leading-relaxed text-lg font-serif animate-fade-in">
                  {(pages[currentPage - 1] || '')
                    .split('\n\n')
                    .map((para, idx) => (
                      <p key={idx} className="mb-4">
                        {para}
                      </p>
                    ))}
                </div>
              </div>

              {/* Pagination and Navigation */}
              <div className="mt-auto pt-6 border-t-2 border-amber-200">
                {!isLastPage ? (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all ${currentPage === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                        }`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>

                    <div className="text-gray-700 font-semibold text-lg">
                      {currentPage} / {pages.length}
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={currentPage === pages.length}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all ${currentPage === pages.length
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                        }`}
                    >
                      Next
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-gray-700 text-lg font-semibold mb-2">The End</p>
                    <div className="flex space-x-4">
                      <button
                        onClick={handleReadAgain}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all font-semibold"
                      >
                        Read Again
                      </button>
                      <button
                        onClick={handleGoBack}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all font-semibold"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Story

