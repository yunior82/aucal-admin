import Course from '@/models/Course';
import slugify from 'slugify';

export default async function handler(req, res) {
    // Recuperamos el curso
    let course = await Course.query().where('id', req.query.id).first();

    // El curso no existe
    if (!course)
        return res.status(404).json({ status: '404', error: 'Resource not found.' });

    // Ejecutamos la petición
    switch (req.method) {
        case 'PATCH':

            // Actualizamos el slug
            if(req.body.title != course.title) {
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

                req.body.slug = slug;
            }


            await course.$query().update(req.body);
            return res.status(200).end();
        case 'DELETE':
            await course.$query().delete();
            return res.status(200).end();
        case 'POST':
            if (req?.query.shouldDuplicateCourse) {

                // Generamos un slug único
                let slug;
                let counter = 1;

                while (true) {
                    slug = slugify(`${course.title}${counter > 1 ? `-${counter}` : ''}`, { lower: true, strict: true });
                    if (await Course.query().where('slug', slug).first()) {
                        counter++;
                        continue;
                    }
                    break;
                }

                // Duplicamos el curso
                let duplicate = await Course.query().insertAndFetch({
                    title: course.title,
                    slug: slug,
                    status: 0,
                    category_id: course.categoryId,
                    ects: course.ects,
                    months: course.months,
                    methodology: course.methodology,
                    form_url: course.formUrl,
                    admision_url: course.admisionUrl,
                    image_url: course.imageUrl,
                    thumbnail_url: course.thumbnailUrl,
                    pdf_image_url: course.pdfImageUrl,
                    pdf_url: course.pdfUrl,
                    teacher_image_url: course.teacherImageUrl,
                    subtitle1: course.subtitle1,
                    subtitle2: course.subtitle2,
                    section1: course.section1,
                    section2: course.section2,
                    section3: course.section3,
                    section4: course.section4,
                    section5: course.section5,
                    section6: course.section6,
                    section7: course.section7,
                    section8: course.section8,
                });

                return res.json({ item: duplicate.id });
            }

            break;


        default:
            return res.status(405).end();
    }
}