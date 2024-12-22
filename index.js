const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes');
const Hbs = require('express-handlebars');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', Hbs.engine({
    extname: 'hbs',
    helpers: {
        formatDate: (date) => {
            const newDate = new Date(date);
            newDate.setHours(newDate.getHours() + 7);
            return newDate.toLocaleString('en-GB', { hour12: false });
        },
    }
}));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cau hinh doc ghi cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});