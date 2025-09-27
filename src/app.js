const express = require('express');
const cors = require('cors');
const { loggerMiddleware } = require('./utils/logger');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(loggerMiddleware);
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Backend API is running" });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "OK", time: new Date() });
});

module.exports = app;