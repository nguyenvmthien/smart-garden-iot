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
  getSensorDataByUserId: async (userId) => {
    const query = 'SELECT * FROM sensor_data WHERE user_id = $1';
    try {
      const result = await db.query(query, [userId]);
      return result.rows;
    } catch (err) {
      throw new Error('Error fetching sensor data for user: ' + err.message);
    }
  },

  // Lấy dữ liệu cảm biến theo loại
  getSensorDataByType: async (userId, sensorType) => {
    const query = `
      SELECT * FROM sensor_data 
      WHERE user_id = $1 AND sensor_type = $2
    `;
    try {
      const result = await db.query(query, [userId, sensorType]);
      return result.rows;
    } catch (err) {
      throw new Error('Error fetching sensor data by type: ' + err.message);
    }
  },

  // Thêm dữ liệu cảm biến mới
  createSensorData: async (userId, sensorType, sensorValue) => {
    const query = `
      INSERT INTO sensor_data (user_id, sensor_type, sensor_value)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    try {
      const result = await db.query(query, [userId, sensorType, sensorValue]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error adding sensor data: ' + err.message);
    }
  },

  // Xóa dữ liệu cảm biến theo ID
  deleteSensorDataById: async (id) => {
    const query = 'DELETE FROM sensor_data WHERE id = $1 RETURNING *';
    try {
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error deleting sensor data: ' + err.message);
    }
  },
};

module.exports = SensorDataModel;
