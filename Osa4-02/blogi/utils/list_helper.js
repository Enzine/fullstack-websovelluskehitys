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

let mostBlogs = (blogs) => {
  mostBlogs = blogs.reduce((blogsByAuthor, blog) => { 
    if (blog.author in blogsByAuthor) { 
      blogsByAuthor[blog.author]++ 
    } else { 
      blogsByAuthor[blog.author] = 1 
    } 
    return blogsByAuthor
  }, {})
  const key = Object.keys(mostBlogs).sort((a,b) => mostBlogs[b]-mmostBlogs[a])[0]
  const value = mostBlogs[key]
  return { author: key, blogs: value }
}

let mostLikes = (blogs) => {
  mostLikes = blogs.reduce((likesByAuthor, blog) => { 
    if (blog.author in likesByAuthor) { 
      likesByAuthor[blog.author] += blog.likes
    } else { 
      likesByAuthor[blog.author] = blog.likes 
    } 
    return likesByAuthor
  }, {})
  const key = Object.keys(mostLikes).sort((a,b) => mostLikes[b]-mmostLikes[a])[0]
  const value = mostLikes[key]
  return { author: key, likes: value }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}