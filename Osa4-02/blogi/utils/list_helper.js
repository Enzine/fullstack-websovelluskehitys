const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) return blogs.reduce((favorite, blog) => favorite.likes < blog.likes ? blog : favorite)
  return 0
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}