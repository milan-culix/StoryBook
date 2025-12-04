import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

const storiesFilePath = path.join(__dirname, 'src', 'data', 'stories.json')

// Get all stories
app.get('/api/stories', async (req, res) => {
  try {
    const data = await fs.readFile(storiesFilePath, 'utf-8')
    const stories = JSON.parse(data)
    res.json(stories)
  } catch (error) {
    console.error('Error reading stories:', error)
    res.status(500).json({ error: 'Failed to read stories' })
  }
})

// Save stories
app.post('/api/stories', async (req, res) => {
  try {
    const { categories, stories } = req.body
    
    if (!categories || !stories) {
      return res.status(400).json({ error: 'Categories and stories are required' })
    }

    const dataToSave = {
      categories,
      stories
    }

    // Write to file
    await fs.writeFile(storiesFilePath, JSON.stringify(dataToSave, null, 2), 'utf-8')
    
    res.json({ success: true, message: 'Stories saved successfully' })
  } catch (error) {
    console.error('Error saving stories:', error)
    res.status(500).json({ error: 'Failed to save stories' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
  console.log(`📝 Stories file: ${storiesFilePath}`)
})

