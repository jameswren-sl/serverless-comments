import React, { Component } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'

export default class SendBox extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      message: ''
    }
  }

  send = () => {
    this.props.onSend(this.state.message)
    this.setState({ message: '' })
  }

  handleChange = event => this.setState({ message: event.target.value })

  handleEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (this.state.message !== '') this.send()
    }
  }

  render () {
    return (
      <div>
        <Form inline>
          <FormGroup className="mr-2 mb-0" style={{ flex: '1 1 auto' }}>
            <Input
              type='text'
              name='message'
              placeholder='Post a comment'
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
              style={{ width: '100%' }}
            />
          </FormGroup>
          <Button onClick={this.send} disabled={this.state.message === ''}>Send</Button>
        </Form>
      </div>
    )
  }
}
