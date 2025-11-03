import User from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        // Comprobamos que hayamos entregado los parámetros requeridos
        if (!req.body.password || !req.body.email) {
            return res.status(400).json({ errors: [{ "error": "Bad request" }] });
        }

        // Recuperamos el usuario
        let user = await User.query().select().where('email', req.body.email).first();

        // Si el usuario no existe no podemos hacer nada
        if(!user) {
            return res.status(404).json({ errors: [{ "error": "Not found" }] });
        }

        // Comprueba si la contraseña es válida
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign({ user: { id: user.id, firstName: user.firstName, lastName: user.lastName } }, process.env.JWT_KEY)
            res.setHeader('Set-Cookie', serialize(process.env.NEXT_PUBLIC_COOKIE, token, { path: '/' }));
            return res.json({ token });
        }

        return res.status(401).json({ errors: [{ "error": "Unauthorized" }] });
    }

    res.status(405).json({ errors: [{ "error": "Method not allowed" }] });
}
