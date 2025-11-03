import User from '@/models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    // Recuperamos el usuario
    let user = await User.query().where('id', req.query.id).first();

    // El usuario no existe
    if (!user)
        return res.status(404).json({ status: '404', error: 'Resource not found.' });

    // Ejecutamos la petición
    switch (req.method) {
        case 'PATCH':
            if(req.body.password && req.body.password.length) {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            }
            await user.$query().update(req.body);
            return res.status(200).end();
        case 'DELETE':
            await user.$query().delete();
            return res.status(200).end();
        default:
            return res.status(405).end();
    }
}