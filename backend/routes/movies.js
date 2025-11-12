import express from 'express'
import {
  getMovies,
  getMovie,
  savePosition,
  postComment,
  toggleLike
} from '../controllers/movieController.js'

const router = express.Router()

// Public endpoints (no auth required)
router.get('/', getMovies)
router.get('/:id', getMovie)

// Save position (keeps auth optional — if you have auth middleware, you can add later)
router.post('/:id/position', savePosition)

// **Allow posting comments without authentication**
router.post('/:id/comment', postComment)

// Allow toggling likes without authentication (optional)
router.post('/comment/:commentId/like', toggleLike)

export default router
