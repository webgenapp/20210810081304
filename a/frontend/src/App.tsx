import React, { useEffect } from 'react'

import CreateAa from './aas/CreateAa'
import ListAa from './aas/ListAa'
import DetailAa from './aas/DetailAa'
import UpdateAa from './aas/UpdateAa'

import CreateUser from './users/CreateUser'
import ListUser from './users/ListUser'
import DetailUser from './users/DetailUser'
import UpdateUser from './users/UpdateUser'

import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'

import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom'

import { useQuery } from 'react-query'

import client, { fetchCSRFToken, hasCSRFToken } from './api'

function App() {
  const { data: user } = useQuery('user', () => client.get('/auth/me'), {
    retry: false,
  })

  useEffect(() => {
    if (!hasCSRFToken()) fetchCSRFToken()
  }, [])

  return (
    <Router>
      <nav>
        <ul className='flex'>
          <li>
            <Link to='/'>Home</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/login'>Login</Link>
            <br />
            <Link to='/register'>Register</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/aas'>Aas</Link>
            <br />
            <Link to='/aas/create'>Create a Aa</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/users'>Users</Link>
            <br />
            <Link to='/users/create'>Create a User</Link>
            <br />
          </li>
        </ul>
      </nav>
      <main>
        <Route path='/aas'>
          <h1>Aas</h1>
        </Route>

        <Route path='/users'>
          <h1>Users</h1>
        </Route>

        <Switch>
          {/* Aa routes */}
          <Route path='/aas/create' component={CreateAa} />
          <Route path='/aas/update/:id' component={UpdateAa} />
          <Route path='/aas/detail/:id' component={DetailAa} />
          <Route path='/aas' component={ListAa} />,{/* User routes */}
          <Route path='/users/create' component={CreateUser} />
          <Route path='/users/update/:id' component={UpdateUser} />
          <Route path='/users/detail/:id' component={DetailUser} />
          <Route path='/users' component={ListUser} />
          {/* auth routes */}
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
