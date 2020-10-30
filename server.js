import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
//import path from 'path'
import passport from 'passport'

import { PORT, MONGO_URI } from './config.js'
import itemRoutes from './routes/api/item.js'
import userRoutes from './routes/api/user.js'

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cookieParser());

const mongo_options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}
mongoose.connect(MONGO_URI, mongo_options)
  .then(() => console.log('MongoDB database Connected...'))
  .catch((err) => console.log(err))

// Passport
app.use(passport.initialize());
import temp from "./passport.js";
const { config } = temp;
config(passport);

app.use('/api/user', userRoutes)
app.use('/api/item', itemRoutes)

app.set({
  "Content-Security-Policy":
    "default-src 'self';" + 
    "script-src 'self' https://polyfill.io https://unpkg.com;" + 
    "img-src 'self';" + 
    "font-src 'self' data: https://fonts.gstatic.com https://www.slant.co https://use.fontawesome.com;" + 
    "style-src 'self' https://fonts.googleapis.com https://unpkg.com;" + 
    "frame-ancestors 'none';"
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile('client/dist/index.html', { root: '.' })
  })
}

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
