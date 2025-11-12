import Movie from '../models/Movie.js'
import Comment from '../models/Comment.js'
import User from '../models/User.js'

// GET /api/movies?q=...
export const getMovies = async (req, res) => {
  try {
    const { q } = req.query
    const query = q ? { title: { $regex: q, $options: 'i' } } : {}
    const movies = await Movie.find(query).limit(200)
    res.json(movies)
  } catch (err) {
    console.error('getMovies error', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET /api/movies/:id
export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).json({ message: 'Not found' })
    const comments = await Comment.find({ movie: movie._id }).sort({ createdAt: -1 })
    res.json({ movie, comments })
  } catch (err) {
    console.error('getMovie error', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/movies/:id/position
export const savePosition = async (req, res) => {
  try {
    const { position } = req.body
    const movieId = req.params.id

    // If user info present (optional), try saving; otherwise ignore and return success
    // (keeps API tolerant when not logged)
    const tokenUser = req.user // if using auth middleware
    if (tokenUser) {
      const user = await User.findById(tokenUser._id)
      if (user) {
        const existing = user.watchPositions.find(w => w.movie.toString() === movieId)
        if (existing) existing.position = position
        else user.watchPositions.push({ movie: movieId, position })
        await user.save()
      }
    }
    res.json({ message: 'Saved' })
  } catch (err) {
    console.error('savePosition error', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/movies/:id/comment
// **Public**: anyone can post a comment. If request contains username or token, use that; else store as "Anonymous".
export const postComment = async (req, res) => {
  try {
    const { text, username } = req.body
    if (!text || !text.trim()) return res.status(400).json({ message: 'Text required' })

    const movieId = req.params.id
    const movie = await Movie.findById(movieId)
    if (!movie) return res.status(404).json({ message: 'Movie not found' })

    // If auth middleware sets req.user, prefer that username
    let commenter = 'Anonymous'
    if (req.user && req.user.username) commenter = req.user.username
    if (username) commenter = username // allow client-provided username (if you want)

    const comment = await Comment.create({
      movie: movieId,
      user: req.user ? req.user._id : null,
      username: commenter,
      text: text.trim(),
      likes: 0,
      likedBy: []
    })

    res.status(201).json(comment)
  } catch (err) {
    console.error('postComment error', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/movies/comment/:commentId/like
// Allow likes without login (toggle by client IP/userless). If you want to require auth later, add middleware.
export const toggleLike = async (req, res) => {
  try {
    const commentId = req.params.commentId
    const comment = await Comment.findById(commentId)
    if (!comment) return res.status(404).json({ message: 'Not found' })

    // keep simple: increment likes (no user dedupe) so anyone can like multiple times if desired
    comment.likes = (comment.likes || 0) + 1
    await comment.save()
    res.json({ likes: comment.likes })
  } catch (err) {
    console.error('toggleLike error', err)
    res.status(500).json({ message: 'Server error' })
  }
}
