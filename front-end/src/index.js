import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

Amplify.configure({
  aws_appsync_graphqlEndpoint: 'ENDPOINT FROM CLOUDFORMATION OUTPUT',
  aws_appsync_region: 'REGION THAT APPSYNC WAS CREATED IN',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'API KEY FROM CLOUDFORMATION OUTPUT'
})

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
