const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (likes, item) => {
    return {likes: likes.likes + item.likes}
  }

  return blogs.length === 0
    ? 0
    : blogs.length === 1
    ? blogs[0].likes
    : blogs.reduce(reducer).likes
}

module.exports = {
  dummy,
  totalLikes
}

