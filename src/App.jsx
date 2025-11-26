import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Category from './components/Category'
import Story from './components/Story'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/story/:categoryName/:storyId" element={<Story />} />
      </Routes>
    </Router>
  )
}

export default App

