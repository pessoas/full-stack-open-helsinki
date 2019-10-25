const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (likes, item) => {
    return { likes: likes.likes + item.likes }
  }

  return blogs.length === 0
    ? 0
    : blogs.length === 1
      ? blogs[0].likes
      : blogs.reduce(reducer).likes
}

const favouriteBlog = blogs => {
  const reducer = (max, item) => {
    return (max.likes > item.likes)
      ? max
      : item
  }

  const favourite = blogs.reduce(reducer, 0)

  const returner = {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes
  }

  return blogs.length === 0
    ? null
    : returner
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
