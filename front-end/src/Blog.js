import React from 'react'
import CommentsPanel from './CommentsPanel'

export default props => (
  <div>
    <h1>Hello, World Blog</h1>
    <p>The shortest ever blog post.</p>
    <p>But check out the comments...</p>
    <CommentsPanel blogId='example-blog' users={props.users} currentUser={props.currentUser} />
  </div>
)
