const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app.js');

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected');
          app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error', err));