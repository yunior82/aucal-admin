import Banner from '@/models/Banner';

export default async function handler(req, res) {
    // Recuperamos el banner
    let banner = await Banner.query().where('id', req.query.id).first();

    // El artículo no existe
    if (!banner)
        return res.status(404).json({ status: '404', error: 'Resource not found.' });

    // Ejecutamos la petición
    switch (req.method) {
        case 'PATCH':
            await banner.$query().update(req.body);
            return res.status(200).end();
        default:
            return res.status(405).end();
    }
}