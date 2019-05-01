import React, { Component } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'

export default class RegisterUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: ''
    }
  }

  handleChange = event => this.setState({ username: event.target.value })
  
  register = () => this.props.register(this.state.username)

  handleEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (this.state.message !== '') this.register()
    }
  }

  render () {
    return (
      <div>
        <h1>Register</h1>
        <Form inline>
          <FormGroup className="mr-2 mb-0">
            <Input
              type='text'
              name='username'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
            />
          </FormGroup>
          <Button onClick={this.register} disabled={this.state.username === ''}>Register</Button>
        </Form>
      </div>
    )
  }
}
