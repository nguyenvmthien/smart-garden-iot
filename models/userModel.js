const db = require('../config/db');
const bcrypt = require('bcrypt');

const UserModel = {
    // Kiểm tra thông tin đăng nhập
    login: async (username, password) => {
        const query = 'SELECT * FROM users WHERE username = $1';
        try {
            const result = await db.query(query, [username]);
            if (result.rows.length === 0) {
                return { error: 'User not found!' };
            }

            const user = result.rows[0];
            // So sánh mật khẩu
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return { error: 'Wrong password!' };
            }

            return user; // Trả về thông tin user nếu đăng nhập thành công
        } catch (err) {
            throw new Error(err.message);
        }
    },

    checkExist: async (username, email) => {
        const query = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        try {
            const result = await db.query(query, [username, email]);
            if (result.rows.length === 0) {
                return false;
            }
            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    // Đăng ký người dùng mới
    register: async (username, password, email) => {
        // Kiểm tra xem username đã tồn tại chưa
        const isExist = await UserModel.checkExist(username, email);
        if (isExist) {
            return { error: 'Username or email already exists!' };
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu
        const query = `
      INSERT INTO users (username, password, email)
      VALUES ($1, $2, $3) RETURNING username, email;
    `;
        try {
            const result = await db.query(query, [username, hashedPassword, email]);
            if (result.rows.length === 0) {
                throw new Error('Cannot create user');
            }
            else {
                return result.rows[0];
            }
        } catch (err) {
            throw new Error('Error registering user: ' + err.message);
        }
    },
};

module.exports = UserModel;
