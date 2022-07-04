const mongoose = require('mongoose'); // Allows connect to MongoDB

const URI = 'mongodb://localhost/notes-db-app';

mongoose.connect(URI,
   err => {
       if(err) throw err;
       console.log('Connected to MongoDB')
   }
);