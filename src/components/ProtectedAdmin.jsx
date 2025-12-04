import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Admin from './Admin'

function ProtectedAdmin() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated')
    
    if (!isAuthenticated || isAuthenticated !== 'true') {
      // Redirect to login if not authenticated
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  // Check authentication before rendering
  const isAuthenticated = sessionStorage.getItem('adminAuthenticated')
  
  if (!isAuthenticated || isAuthenticated !== 'true') {
    return null // Will redirect in useEffect
  }

  return <Admin />
}

export default ProtectedAdmin

