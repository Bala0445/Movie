import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Movie from './models/Movie.js'
import User from './models/User.js'
import bcrypt from 'bcryptjs'

dotenv.config()

const sampleVideo = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'

const movieTitles = [
  "Avatar", "Inception", "Interstellar", "Avengers: Endgame", "The Dark Knight",
  "Iron Man", "Doctor Strange", "Black Panther", "Oppenheimer", "Dune",
  "Spider-Man: No Way Home", "Guardians of the Galaxy", "Shang-Chi", "Eternals",
  "The Batman", "The Flash", "Wonder Woman", "Aquaman", "Justice League",
  "Captain Marvel", "Thor: Ragnarok", "Ant-Man", "Venom", "Deadpool",
  "The Matrix", "The Godfather", "Joker", "Pulp Fiction", "The Shawshank Redemption",
  "The Lion King", "Titanic", "The Avengers", "Civil War", "Infinity War",
  "Black Widow", "The Incredible Hulk", "Man of Steel", "The Suicide Squad",
  "The Wolverine", "Logan", "The Amazing Spider-Man", "Doctor Strange 2",
  "Guardians Vol. 3", "No Time To Die", "Tenet", "John Wick", "Dune 2",
  "The Marvels", "The Flashpoint", "The Penguin", "The Boys: Rise"
];

const movies = movieTitles.map((title, i) => ({
  title,
  description: `This is the description for ${title}.`,
  videoUrl: sampleVideo,
  thumbnail: `https://picsum.photos/seed/movie${i+1}/300/170`
}));


async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  await Movie.deleteMany({})
  await Movie.insertMany(movies)

  // create test user
  const hashed = await bcrypt.hash('password123', 10)
  await User.deleteMany({})
  await User.create({ username: 'testuser', email: 'test@movie.com', password: hashed })

  console.log('Seed complete')
  process.exit(0)
}

run().catch(err => console.error(err))