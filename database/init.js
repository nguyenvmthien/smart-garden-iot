const db = require('../config/db'); // Import cấu hình cơ sở dữ liệu

const createTables = async () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createSensorDataTable = `
    CREATE TABLE IF NOT EXISTS sensor_data (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      sensor_type VARCHAR(50) NOT NULL,
      sensor_value FLOAT NOT NULL,
      recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  try {
    await db.query(createUsersTable);
    console.log('Table "users" created or already exists.');

    await db.query(createSensorDataTable);
    console.log('Table "sensor_data" created or already exists.');
  } catch (err) {
    console.error('Error creating tables:', err.message);
  } finally {
    db.end();
  }
};

createTables();
