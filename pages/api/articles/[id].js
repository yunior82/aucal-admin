import Article from '@/models/Article';

export default async function handler(req, res) {
    // Recuperamos el artículo
    let article = await Article.query().where('id', req.query.id).first();

    // El artículo no existe
    if (!article)
        return res.status(404).json({ status: '404', error: 'Resource not found.' });

    // Ejecutamos la petición
    switch (req.method) {
        case 'PATCH':
            await article.$query().update(req.body);
            return res.status(200).end();
        case 'DELETE':
            await article.$query().delete();
            return res.status(200).end();
        default:
            return res.status(405).end();
    }
}