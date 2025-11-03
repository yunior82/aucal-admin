import Category from '@/models/CourseCategory';

export default async function handler(req, res) {
    // Variables de control
    const limit = req.query.limit ?? 20;
    const page = req.query.page ?? 1;

    // Inicia la sentencia inicial
    const query = Category.query().orderBy('id', 'asc');

    // Crea la paginación 
    if (limit > 0)
        query.page(page - 1, limit);

    // Devuelve los resultados
    res.json(await query)
}
