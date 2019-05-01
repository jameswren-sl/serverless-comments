import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'

const createUser = gql`mutation createUser($username: String!) {
  createUser(username: $username) {
    userId
    username
  }
}`

const listUsers = gql`query listUsers($nextToken: String) {
  listUsers(nextToken: $nextToken) {
    items {
      userId
      username
    }
    nextToken
  }
}`

const onCreateUserQuery = gql`subscription onCreateUser {
  onCreateUser {
    userId
    username
  }
}`

const userService = {
  getUser () {
    const user = window.localStorage.getItem('USER')
    if (!user) return null

    return JSON.parse(user)
  },

  async createUser (username) {
    const response = await API.graphql(graphqlOperation(createUser, { username }))
    console.log('Mutation', 'Create user')

    const user = {
      username,
      userId: response.data.createUser.userId
    }

    window.localStorage.setItem('USER', JSON.stringify(user))

    return user
  },

  async listUsers () {
    const usersResponse = await API.graphql(graphqlOperation(listUsers))
    console.log('Query', 'List users')

    const allUsers = usersResponse.data.listUsers.items

    let nextToken = usersResponse.data.listUsers.nextToken
    while (nextToken) {
      const response = await API.graphql(graphqlOperation(listUsers, { nextToken }))
      allUsers.push(...response.data.listUsers.items)
      nextToken = response.data.listUsers.nextToken
    }

    return allUsers
  },

  listenForNewUsers (onCreateUser) {
    API.graphql(graphqlOperation(onCreateUserQuery)).subscribe({
      next: data => {
        console.log('Subscription', 'New user')
        onCreateUser(data.value.data.onCreateUser)
      },
      error: (err) => console.error(err)
    })
  }
}

export default userService
