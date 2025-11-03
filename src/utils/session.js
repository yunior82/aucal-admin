import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function get(req) {
    const token = req.cookies[process.env.NEXT_PUBLIC_COOKIE];

    // Intentamos verificar el token
    try {
        // Verificamos que el token sea correcto
        const session = jwt.verify(token, process.env.JWT_KEY);

        if (session) {
            // Recuperamos el usuario asociado
            return await User.query().findById(session.user.id);
        }

    } catch (e) {
        return false;
    }

    return false;
}