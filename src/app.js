
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import express from 'express';
import bodyParser from 'body-parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
    res.render('index', { 
        pageTitle: 'Contact Form',
        currentYear: new Date().getFullYear()
    });
});

app.post('/submit', (req, res) => {
    const { username, email, message } = req.body;
    

    if (!username || !email || !message) {
        return res.status(400).send('Missing required fields');
    }
    
    res.render('submission', {
        username,
        email,
        message,
        pageTitle: 'Thank You!',
        currentYear: new Date().getFullYear()
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(PORT, () => {
    console.log(`Server running → http://localhost:${PORT}`);
});


