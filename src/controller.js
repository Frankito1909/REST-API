import { pool } from './database.js';

class LibrosController {
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM Libros');
        res.json(result);
    }

    async add(req, res) {
        const { nombre, autor, categoria, año_publicacion, ISBN } = req.body;

        if (!nombre || !autor || !categoria || !año_publicacion || !ISBN) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        const [result] = await pool.query(
            `INSERT INTO Libros (nombre, autor, categoria, \`año-publicacion\`, ISBN) VALUES (?, ?, ?, ?, ?)`,
            [nombre, autor, categoria, año_publicacion, ISBN]
        );

        res.json({ "ID INSERTADO": result.insertId });
    }

    async delete(req, res) {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Falta el ID para eliminar' });
        }

        const [result] = await pool.query('DELETE FROM Libros WHERE id = ?', [id]);
        res.json({ "registros eliminados": result.affectedRows });
    }

    async update(req, res) {
        const { id, nombre, autor, categoria, año_publicacion, ISBN } = req.body;

        if (!id || !nombre || !autor || !categoria || !año_publicacion || !ISBN) {
            return res.status(400).json({ error: 'Faltan datos obligatorios para actualizar' });
        }

        const [result] = await pool.query(
            `UPDATE Libros SET nombre = ?, autor = ?, categoria = ?, \`año-publicacion\` = ?, ISBN = ? WHERE id = ?`,
            [nombre, autor, categoria, año_publicacion, ISBN, id]
        );

        res.json({ "registros actualizados": result.affectedRows });
    }
}

export const libros = new LibrosController();