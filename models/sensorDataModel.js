const db = require('../config/db');

const SensorDataModel = {
  // Lấy tất cả dữ liệu cảm biến
  getAllSensorData: async () => {
    const query = 'SELECT * FROM sensor_data';
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      throw new Error('Error fetching sensor data: ' + err.message);
    }
  },

  // Lấy dữ liệu cảm biến theo ID người dùng
  getSensorDataByUsername: async (username) => {
    const query = 'SELECT DISTINCT temperature, humidity, brightness, water_level, recorded_at FROM sensor_data WHERE username = $1 ORDER BY recorded_at DESC';
    try {
      const result = await db.query(query, [username]);
      return result.rows;
    } catch (err) {
      throw new Error('Error fetching sensor data for user: ' + err.message);
    }
  },

  getSensorDataFromDateToDate: async (username, fromDate, toDate) => {
    console.log(fromDate, toDate);
    const query = `
      SELECT DISTINCT  recorded_at, temperature, humidity, brightness, water_level 
      FROM sensor_data 
      WHERE username = $1 
        AND recorded_at >= $2 AND recorded_at <= $3 
      ORDER BY recorded_at DESC
      `;
    try {
      const result = await db.query(query, [username, fromDate, toDate]);
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      throw new Error('Error fetching sensor data for user: ' + err.message);
    }
  },

  // Thêm dữ liệu cảm biến mới
  createSensorData: async (username, temperature, humidity, brightness, waterLevel) => {
    const query = `
      INSERT INTO sensor_data (username, temperature, humidity, brightness, water_level)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    try {
      const result = await db.query(query, [username, temperature, humidity, brightness, waterLevel]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error adding sensor data: ' + err.message);
    }
  },
};

module.exports = SensorDataModel;
