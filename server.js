const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');

//
const {connectDB} = require('./src/commons');
const {userRoutes}  = require('./src/routes');

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 8888;

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(expressValidator());

app.get("/", (req, res) => res.send("It's working!"));

require('./src/routes')(app);

//listen port 
app.listen(port, function () {
    console.log("Your app running on port " + port);
})