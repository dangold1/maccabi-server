require('dotenv').config();
const { PORT = 8080 } = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const infoRoutes = require('./routes/info.routes');
const userAuthMiddleware = require('./middlewares/userAuth.middleware');

//----------------------------------Middlewares Router-------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Enter app routes
app.use('/api/auth', authRoutes);

// Information routes
app.use('/api/info', infoRoutes);

// Auth middleware
app.use(userAuthMiddleware);


//----------------------------------Run Server---------------------------------------------

app.listen(PORT, () => {
    console.log("server is running! =>", { PORT });
});

