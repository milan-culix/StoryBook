import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import storiesData from '../data/stories.json'

function Admin() {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    sessionStorage.removeItem('adminUsername')
    navigate('/admin/login')
  }
  const [stories, setStories] = useState(storiesData.stories)
  // Extract categories from categoryImages or stories keys
  const initialCategories = storiesData.categoryImages 
    ? Object.keys(storiesData.categoryImages)
    : Object.keys(storiesData.stories || {})
  const [categories, setCategories] = useState(initialCategories)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    content: ''
  })

  const [editingStory, setEditingStory] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  // Load stories from API
  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stories')
      if (response.ok) {
        const data = await response.json()
        setStories(data.stories)
        // Extract categories from categoryImages or stories keys
        const loadedCategories = data.categoryImages 
          ? Object.keys(data.categoryImages)
          : (data.categories || Object.keys(data.stories || {}))
        setCategories(loadedCategories)
      } else {
        // Fallback to local data if API fails
        console.warn('API not available, using local data')
      }
    } catch (error) {
      console.error('Error loading stories:', error)
      // Fallback to local data
    } finally {
      setLoading(false)
    }
  }

  const saveStories = async (updatedStories) => {
    try {
      setSaving(true)
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categories: categories,
          stories: updatedStories
        })
      })

      if (response.ok) {
        const result = await response.json()
        return true
      } else {
        throw new Error('Failed to save stories')
      }
    } catch (error) {
      console.error('Error saving stories:', error)
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateStoryId = (category, title) => {
    const baseId = `${category.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}`
    let id = baseId
    let counter = 1
    
    // Check if ID already exists
    while (stories[category]?.some(s => s.id === id)) {
      id = `${baseId}-${counter}`
      counter++
    }
    
    return id
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.category || !formData.image || !formData.content) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    const newStory = {
      id: editingStory ? editingStory.id : generateStoryId(formData.category, formData.title),
      title: formData.title,
      category: formData.category,
      image: formData.image,
      content: formData.content
    }

    const updatedStories = { ...stories }
    if (!updatedStories[formData.category]) {
      updatedStories[formData.category] = []
    }
    
    if (editingStory) {
      // Update existing story
      const categoryStories = [...updatedStories[formData.category]]
      const index = categoryStories.findIndex(s => s.id === editingStory.id)
      if (index !== -1) {
        categoryStories[index] = newStory
        updatedStories[formData.category] = categoryStories
      }
    } else {
      // Add new story
      updatedStories[formData.category] = [...updatedStories[formData.category], newStory]
    }

    // Save to file via API
    const saved = await saveStories(updatedStories)
    
    if (saved) {
      setStories(updatedStories)
      // Reset form
      setFormData({
        title: '',
        category: '',
        image: '',
        content: ''
      })
      setEditingStory(null)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  const handleEdit = (story, category) => {
    setFormData({
      title: story.title,
      category: category,
      image: story.image,
      content: story.content
    })
    setEditingStory({ ...story, originalCategory: category })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (storyId, category) => {
    const updatedStories = { ...stories }
    updatedStories[category] = updatedStories[category].filter(s => s.id !== storyId)
    
    // Save to file via API
    const saved = await saveStories(updatedStories)
    
    if (saved) {
      setStories(updatedStories)
      setShowDeleteConfirm(null)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  const handleDownload = () => {
    const updatedData = {
      categories: categories,
      stories: stories
    }
    
    const dataStr = JSON.stringify(updatedData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'stories.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    alert('JSON file download થઈ ગયું છે! હવે આ file ને src/data/stories.json માં replace કરો. (JSON file downloaded! Now replace this file in src/data/stories.json)')
  }

  const getTotalStories = () => {
    return Object.values(stories).reduce((total, categoryStories) => total + categoryStories.length, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Admin Panel</h1>
              <p className="text-gray-600">Total Stories: {getTotalStories()}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all font-semibold shadow-lg"
                title="Download backup of current stories"
              >
                📥 Download Backup
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all font-semibold shadow-lg"
                title="Logout from admin panel"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in">
            <span className="block sm:inline">✅ Story {editingStory ? 'updated' : 'added'} successfully! File saved automatically.</span>
          </div>
        )}

        {/* Error Message */}
        {showError && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-fade-in">
            <span className="block sm:inline">❌ Error saving story. Please check if backend server is running.</span>
          </div>
        )}

        {/* Loading/Saving Indicator */}
        {(loading || saving) && (
          <div className="mb-6 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative animate-fade-in">
            <span className="block sm:inline">
              {loading ? '⏳ Loading stories...' : '💾 Saving to file...'}
            </span>
          </div>
        )}

        {/* Add/Edit Story Form */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingStory ? 'Edit Story' : 'Add New Story'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter story title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://images.unsplash.com/..."
                required
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your story here..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Characters: {formData.content.length}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all font-semibold ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {saving ? '💾 Saving...' : (editingStory ? 'Update Story' : 'Add Story')}
              </button>
              {editingStory && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      title: '',
                      category: '',
                      image: '',
                      content: ''
                    })
                    setEditingStory(null)
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Stories List */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">All Stories</h2>
          {categories.map(category => {
            const categoryStories = stories[category] || []
            if (categoryStories.length === 0) return null

            return (
              <div key={category} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                  {category} ({categoryStories.length})
                </h3>
                <div className="space-y-4">
                  {categoryStories.map(story => (
                    <div
                      key={story.id}
                      className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{story.title}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {story.content.substring(0, 150)}...
                        </p>
                        <p className="text-xs text-gray-500">ID: {story.id}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(story, category)}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm({ storyId: story.id, category, title: story.title })}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{showDeleteConfirm.title}"? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDelete(showDeleteConfirm.storyId, showDeleteConfirm.category)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin

