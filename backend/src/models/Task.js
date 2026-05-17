const db = require('../config/database');

class Task {
    static async getAll() {
        const result = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return result.rows;
    }

    static async getById(id) {
        const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async getByStatus(status) {
        const result = await db.query('SELECT * FROM tasks WHERE status = $1 ORDER BY created_at DESC', [status]);
        return result.rows;
    }

    static async create(name, description, status = 'To-Do') {
        const result = await db.query(
            'INSERT INTO tasks (name, description, status) VALUES ($1, $2, $3) RETURNING *',
            [name, description, status]
        );
        return result.rows[0];
    }

    static async update(id, name, description, status) {
        const result = await db.query(
            'UPDATE tasks SET name = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
            [name, description, status, id]
        );
        return result.rows[0];
    }

    static async updateStatus(id, status) {
        const result = await db.query(
            'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Task;
