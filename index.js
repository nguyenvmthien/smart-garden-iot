const db = require('./config/db');

(async () => {
    try {
        const result = await db.query(`
        SELECT *
        FROM sensor_data;
      `);
        console.log('Existing tables:', result.rows);
    } catch (err) {
        console.error('Error fetching tables:', err.message);
    } finally {
        db.end(); // Close the database connection
    }
})();

// SELECT table_name
// FROM information_schema.tables
// WHERE table_schema = 'public';

// const express = require('express');
// const app = express();
// const port = 3000;
// const route = require('./routes');
// const Hbs = require('express-handlebars');
// const path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

// app.engine('hbs', Hbs.engine({ extname: 'hbs' }));
// app.set('view engine', 'hbs');

// app.set('views', path.join(__dirname, 'views'));

// route(app);

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });