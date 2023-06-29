//declaring server requirements 

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
const morgan = require('morgan');
const { config } = require('dotenv');
const  MONGO_URI = 'mongodb+srv://vibhorrawat95:test@cluster0.upmydnz.mongodb.net/?retryWrites=true&w=majority';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.use(cors());

// Router Middleware
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter, commentRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', userRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use((error, req, res, next) => {
  //console.error(error);
  res.status(error.status || 500);
  res.json({
    error: {
      name: error.name,
      message: error.message
    }
  });
})

// DB Config
mongoose.connect(MONGO_URI, { useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex:true,
 })

  .then(console.log(`Database Connected!`))
  .catch((err) => console.log(err));


app.listen(PORT, () => {
  console.log(`Server started running at port -> ${PORT}`)
})