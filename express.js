import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import itemRoutes from './routes/api/item.js'
import userRoutes from './routes/api/user.js'
import taskRoutes from './routes/api/tasks/task.js'
import taskGroupRoutes from './routes/api/tasks/task-group.js'
import { config } from './passport.js'

function initExpress () {
  const app = express()

  app.use(cors())
  app.use(morgan('tiny'))
  app.use(bodyParser.json())
  app.use(cookieParser())

  // Passport
  app.use(passport.initialize())
  config(passport)

  app.use('/api/user', userRoutes)
  app.use('/api/item', itemRoutes)
  app.use('/api/task', taskRoutes)
  app.use('/api/task-group', taskGroupRoutes)

  app.set({
    'Content-Security-Policy':
      "default-src 'self';" +
      "script-src 'self' https://polyfill.io https://unpkg.com;" +
      "img-src 'self';" +
      "font-src 'self' data: https://fonts.gstatic.com https://www.slant.co https://use.fontawesome.com;" +
      "style-src 'self' https://fonts.googleapis.com https://unpkg.com;" +
      "frame-ancestors 'none';"
  })

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
      res.sendFile('client/dist/index.html', { root: '.' })
    })
  }

  return app
}

export { initExpress }
