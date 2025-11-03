import Course from '@/models/Course';
import slugify from 'slugify';

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
    const limit = req.query.limit ?? 30;
    const page = req.query.page ?? 1;

    // Inicia la sentencia inicial
    const query = Course.query()
        .withGraphFetched('category')
        .orderBy('id', 'desc');

    // Búsqueda por título
    if (req.query.q)
        query.where('title', 'LIKE', `%${req.query.q}%`);

    // Crea la paginación 
    if (limit > 0)
        query.page(page - 1, limit);

    // Devuelve los resultados
    res.json(await query);
}

async function post(req, res) {
    // Vamos a insertar un nuevo artículo
    if (req.body && req.body.title && req.body.category_id) {
        let slug;
        let counter = 1;

        // Generamos un slug único
        while (true) {
            slug = slugify(`${req.body.title}${counter > 1 ? `-${counter}` : ''}`, { lower: true, strict: true });
            if (await Course.query().where('slug', slug).first()) {
                counter++;
                continue;
            }
            break;
        }

        // Insertamos el artículo
        let course = await Course.query().insertAndFetch({ ...req.body, slug });

        // Si todo ha salido bien, devolvemos los datos insertados
        if (course) {
            return res.json({ status: 200, course });
        }
    }

    return res.status(400).end();
}