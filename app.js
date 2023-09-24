require("./db")
require("express-async-errors")

const express = require('express');

require('dotenv').config();
const morgan = require('morgan');
const postRouter = require('./routers/post')
const userRouter = require('./routers/user')

const cors = require('cors')

// const bodyParser = require('body-parser')

const app = express();

//Server CORS
//app.use(cors({ origin: ['https://stately-raindrop-46ef06.netlify.app'] }));

//DEV CORS
app.use(cors()); 

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/book/", postRouter);
app.use("/api/user/", userRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Port is listening on " + PORT)
})
