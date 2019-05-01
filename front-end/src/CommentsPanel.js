import React, { Component } from 'react'
import blogService from './services/blog-service'
import Comment from './Comment'
import SendBox from './SendBox'

export default class CommentsPanel extends Component {
  constructor (props) {
    super(props)

    this.container = null

    this.state = {
      blog: {
        blogId: '',
        comments: []
      }
    }
  }

  async componentDidMount () {
    const blog = await blogService.getBlog(this.props.blogId)

    blogService.listenForNewPosts(this.props.blogId, comment => {
      if (comment.userId === this.props.currentUser.userId) return

      this.setState(state => ({
        blog: {
          comments: [...state.blog.comments, comment]
        }
      }))
      
      this.scrollToBottom()
    })

    this.setState({
      blog
    })

    this.scrollToBottom()
  }

  scrollToBottom = () => this.container.scrollTop = this.container.scrollHeight

  getUserNameForId = userId => {
    const user = this.props.users.find(user => user.userId === userId)
    return user && user.username
  }

  send = async message => {
    const post = await blogService.postMessage(this.props.blogId, message)

    this.setState(state => ({
      blog: {
        comments: [...state.blog.comments, post]
      }
    }))

    this.scrollToBottom()
  }

  render () { 
    return (
      <div>        
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }} className="mb-2" ref={ref => this.container = ref}>
          { this.state.blog.comments
              .map(comment => (
                <Comment
                  key={comment.commentId}
                  isCurrentUser={this.props.currentUser.userId === comment.userId}
                  username={this.getUserNameForId(comment.userId)}
                  message={comment.message}
                />))
          }
        </div>
        <SendBox onSend={this.send} />
      </div>
    )
  }
}
