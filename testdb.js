const db = require('./config/db');

(async () => {
    try {
        const result = await db.query(`
        DROP TABLE users;
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