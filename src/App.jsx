import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Category from './components/Category'
import Story from './components/Story'
import ProtectedAdmin from './components/ProtectedAdmin'
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/story/:categoryName/:storyId" element={<Story />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
      </Routes>
    </Router>
  )
}

export default App

