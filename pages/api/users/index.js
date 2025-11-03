import User from '@/models/User';
import { mdiRewind } from '@mdi/js';
import bcrypt from 'bcrypt';
import { raw } from 'objection';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return get(req, res);
        case 'POST':
            return post(req, res);
        default:
            return res.status(405).end();
    }
}

async function get(req, res) {
    // Variables de control
    const limit = req.query.limit ?? 20;
    const page = req.query.page ?? 1;

    // Inicia la sentencia inicial
    const query = User.query()
        .orderBy('id', 'desc');

    // Búsqueda por título
    if (req.query.q) {
        query.where('email', 'LIKE', `%${req.query.q}%`)
            .orWhere(raw('CONCAT(TRIM(first_name), " ", TRIM(last_name))'), 'LIKE', `%${req.query.q}%`)
            .orWhere(raw('TRIM(first_name)'), 'LIKE', `%${req.query.q}%`)
            .orWhere(raw('TRIM(last_name)'), 'LIKE', `%${req.query.q}%`);
    }

    // Crea la paginación 
    if (limit > 0)
        query.page(page - 1, limit);

    // Devuelve los resultados
    res.json(await query);
}

async function post(req, res) {

    if (req.body && req.body.first_name && req.body.email && req.body.group_id && req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        let user = await User.query().insertAndFetch({ ...req.body })
        if (user) {
            return res.json(user);
        }
    }

    return res.status(400).end();
}