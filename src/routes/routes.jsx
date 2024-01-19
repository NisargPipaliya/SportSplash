import React from 'react'
import { createBrowserRouter} from 'react-router-dom'
import App from '../App'
import { Home, Signin, Signup, CreateTournament, Tournament } from '../pages'
import { Protected} from '../components'

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path : '/signin',
          element :(
            <Protected authentication = {false}>
              <Signin/>
            </Protected>
          )
        },
        {
          path : '/signup',
          element :(
            <Protected authentication = {false}>
              <Signup/> 
            </Protected>
          )
        },
        {
          path : '/create-tournament',
          element : (
            <Protected authentication>
                <CreateTournament/>
            </Protected>
          )
        },
        {
          path : '/tournament/:id',
          element : (
            <Protected authentication = {false}>
                <Tournament/>
            </Protected>
          ),
          children : (
            [
              {
                path : '',
                element : <h1>hello</h1>
              },
              {
                path : 'matches',
                element : <h1>matches</h1>
              },
              {
                path : 'teams',
                element : <h1>teams</h1>
              },
              {
                path : 'prizes',
                element : <h1>prizes</h1>
              },
              {
                path : 'rules',
                element : <h1>hello</h1>
              },
              {
                path : 'contact',
                element : <h1>hello</h1>
              }
            ]
          )
        }
        
      ]
    }
  ])

  export default router;