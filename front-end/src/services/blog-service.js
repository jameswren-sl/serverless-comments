import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'
import userService from './user-service'

const getBlog = gql`query getBlog($blogId: String!) {
  getBlog(blogId: $blogId) {
    blogId
    comments {
      commentId
      userId
      posted
      message
    }
  }
}`

const createBlog = gql`mutation createBlog ($blogId: String!) {
  createBlog(blogId: $blogId) {
    blogId
    comments {
      commentId
      userId
      posted
      message
    }
  }
}`

const postMessage = gql`mutation postComment($blogId: String!, $userId: String!, $message: String!) {
  postComment(blogId: $blogId, userId: $userId, message: $message) {
    commentId
    blogId
    userId
    posted
    message
  }
}`

const onPostCommentQuery = gql`subscription onPostComment($blogId: String!) {
  onPostComment(blogId: $blogId) {
    commentId
    blogId
    userId
    posted
    message
  }
}`

const blogService = {
  async getBlog (id) {
    const response = await API.graphql(graphqlOperation(getBlog, { blogId: id }))
    console.log('Query', 'Get blog')

    let blog = response.data.getBlog

    if (!blog) {
      blog = (await API.graphql(graphqlOperation(createBlog, { blogId: id }))).data.createBlog
      console.log('Mutation', 'Create blog')
    }

    return blog
  },

  async postMessage (blogId, message) {
    const post = (await API.graphql(graphqlOperation(postMessage, { blogId, userId: userService.getUser().userId, message }))).data.postComment
    console.log('Mutation', 'Post message')

    return post
  },

  listenForNewPosts (blogId, onNewPost) {
    API.graphql(graphqlOperation(onPostCommentQuery, { blogId })).subscribe({
      next: data => {
        console.log('Subscription', 'New message')
        onNewPost(data.value.data.onPostComment)
      },
      error: (err) => console.error(err)
    })
  }
}

export default blogService
