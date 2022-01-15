import mongoose from 'mongoose'

import { initExpress } from './express.js'
import { PORT, MONGO_URI } from './config.js'

const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(MONGO_URI, mongoOptions).then(async () => {
  const app = initExpress()
  app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
})
