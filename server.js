const express = require('express');
const express = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json());
app.use(express.urlendedcode({ extended: true}));
app.use(express.static('public'));

mongoose.connect(
    process.env.MONGODB_URI || '',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
