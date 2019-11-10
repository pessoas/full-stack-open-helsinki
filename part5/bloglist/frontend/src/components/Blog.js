import React from 'react'
const Blog = ({ blog }) => {
  return (
  <li><a href={blog.url}>{blog.title}</a> - {blog.author}</li>
  )
}

export default Blog