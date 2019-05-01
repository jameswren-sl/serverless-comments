import React from 'react'
import { Toast, ToastBody, ToastHeader } from 'reactstrap'

export default props => (
  <Toast className={props.isCurrentUser ? 'offset-sm-1' : ''}>
    <ToastHeader className={props.isCurrentUser ? 'text-primary' : ''}>{ props.username }</ToastHeader>
    <ToastBody>{ props.message }</ToastBody>
  </Toast>
)
