import User from '@/models/User';
import { raw } from 'objection';
import { get } from '@/utils/session';

export default async function handler(req, res) {
    const session = await get(req);
    if (!session) return res.status(401).end();
    const user = await User.query().findById(session.id);
    return res.json(user);
}
