import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import userService from './services/user-service'
import RegisterUser from './RegisterUser'
import Blog from './Blog'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: userService.getUser(),
      users: []
    }
  }

  async componentDidMount () {
    const users = await userService.listUsers()

    this.setState({
      users
    })

    userService.listenForNewUsers(user => {

      this.setState( {
        users: [...this.state.users, user]
      })
    })
  }
  
  register = async username => {
    const user = await userService.createUser(username)

    this.setState({
      user
    })
  }

  logout = () => {
    window.localStorage.removeItem('USER')
    this.setState({ user: null })
  }

  render () {
    return (
      <Container>
        <Row>
          <Col>Number of users: { this.state.users.length }</Col>
          <Col><Button onClick={this.logout} className="float-right">Logout</Button></Col>
        </Row>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            { this.state.user
              ? <Blog users={this.state.users} currentUser={this.state.user} />
              : <RegisterUser register={this.register} /> }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
