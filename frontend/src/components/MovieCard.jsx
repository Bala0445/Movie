import React, { useState } from 'react'
import MoviePlayer from './MoviePlayer'

export default function MovieCard({ movie }){
  const [open, setOpen] = useState(false)
  return (
    <div className="movie-card">
      <img className="movie-thumb" src={movie.thumbnail} alt="thumb"/>
      <div className="movie-title">{movie.title}</div>
      <button className="btn-ghost" onClick={()=>setOpen(!open)}>{open? 'Close' : 'Watch'}</button>
      {open && <div style={{marginTop:12}}><MoviePlayer movie={movie} /></div>}
    </div>
  )
}
