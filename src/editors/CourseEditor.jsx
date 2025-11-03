/* eslint-disable @next/next/no-img-element */
import Editor from "@/components/Editor";
import styled, { css } from 'styled-components';
import Box from '@/components/Box';
import { Input } from '@/components/fields';
import { Selector } from '@/components/fields/Selector';
import { useForm } from "react-hook-form";
import useSWRImmutable from 'swr/immutable'
import Button from "@/components/Button";
import { useState } from "react";
import { useEditor } from '@tiptap/react'
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Bold from '@tiptap/extension-bold';
import Strike from '@tiptap/extension-strike';
import Italic from '@tiptap/extension-italic';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import ListItem from '@tiptap/extension-list-item';
import History from '@tiptap/extension-history';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Gapcursor from '@tiptap/extension-gapcursor';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Color from '@tiptap/extension-color';
import { useRouter } from "next/router";

const Textarea = styled.textarea`
    appearance: none;
    outline: none;
    background: #FFF;
    resize: vertical;
    width: 100%;
    padding: 8px;
    border: 1px solid #e8e9e9;
    transition: box-shadow .1s ease, border-color .1s ease;
    border-radius: 4px;
    max-height: 200px;
    height: 100px;

    ::placeholder {
        opacity: 1;
        color: #a6a9ac;
    }

    &:focus {
        box-shadow:0 0 0 3px rgba(199, 225, 242, 0.478);
        border-color: rgb(172, 208, 245);
    }
`;

const Tabs = styled.div`
    display: flex;
    margin-bottom: 12px;
    border-bottom: 1px solid #eeeeee;
`;

const Tab = styled.div`
    text-decoration: none;
    color: inherit;
    border-bottom: 2px solid transparent;
    margin-right: 21px;
    color: #6a7383;
    transition: border-bottom-color .2s ease-in-out;
    cursor: pointer;
    padding-bottom: 8px;
    white-space: nowrap;

    ${props => props.active && css`
        color: #e10031;
        border-bottom-color: #e10031;
        
    `}

    ${props => !props.active && css`
        &:hover {
            color: inherit;
        }
    `}
`;

const Container = styled.div`
    display: flex;
    position: relative;
`;

const Main = styled.div`
    flex: 1;
    margin-right: 24px;
`;

const Side = styled.div`
    flex: 0 0 320px;
    align-self: flex-start;
    position: sticky;
    top: 16px;
`;

const Buttonery = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    grid-gap: 12px;
`;

export default function Component({ course }) {
    const router = useRouter();
    const { register, ...form } = useForm();
    const [image, setImage] = useState(course?.imageUrl);
    const [thumbnail, setThumbnail] = useState(course?.thumbnailUrl);

    const [teacherImage, setTeacherImage] = useState(course?.teacherImageUrl);
    const [pdfImage, setPdfImage] = useState(course?.pdfImageUrl);

    const [pdfUrl, setPdfUrl] = useState(course?.pdfUrl);
    const [tab, setTab] = useState(0);

    const extensions = [
        Document, Paragraph, Text, Bold, Underline,
        Strike, Italic, Gapcursor, Blockquote,
        Image.configure({ inline: true }),
        ListItem, OrderedList, History, Heading,
        BulletList, HorizontalRule, TextStyle, Color,
        Link.configure({ openOnClick: false }),
        Table.configure({ resizable: true }),
        HardBreak.configure({ keepMarks: true }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        TableRow, TableHeader, TableCell,
    ];


    const editor1 = useEditor({
        extensions,
        content: course ? course.section1.trim() : '',
    });

    const editor2 = useEditor({
        extensions,
        content: course ? course.section2.trim() : '',
    });

    const editor3 = useEditor({
        extensions,
        content: course ? course.section3.trim() : '',
    });

    const editor4 = useEditor({
        extensions,
        content: course ? course.section4.trim() : '',
    });

    const editor5 = useEditor({
        extensions,
        content: course ? course.section5.trim() : '',
    });

    const editor6 = useEditor({
        extensions,
        content: course ? course.section6.trim() : '',
    });

    const editor7 = useEditor({
        extensions,
        content: course ? course.section7.trim() : '',
    });

    const editor8 = useEditor({
        extensions,
        content: course ? course.section8.trim() : '',
    });

    // Recuperamos las categorías
    const { data: categories } = useSWRImmutable('ccategories', () => fetch('/api/courseCategories?limit=0').then((v) => v.json()));

    const handleSubmit = async (data) => {
        if (course) {
            // Actualizamos el artículo actual
            let res = await fetch(`/api/courses/${course.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, image_url: image, thumbnail_url: thumbnail, teacher_image_url: teacherImage, pdf_image_url: pdfImage, pdf_url: pdfUrl, section1: editor1.getHTML(), section2: editor2.getHTML(), section3: editor3.getHTML(), section4: editor4.getHTML(), section5: editor5.getHTML(), section6: editor6.getHTML(), section7: editor7.getHTML(), section8: editor8.getHTML() })
            });

            if (res.status == 200) {
                alert('¡Actualizado con éxito!');
            } else {
                alert('Ha ocurrido un error al actualizar');
            }
        } else {
            // Creamos un nuevo artículo
            let res = await fetch(`/api/courses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, image_url: image, thumbnail_url: thumbnail, teacher_image_url: teacherImage, pdf_image_url: pdfImage, pdf_url: pdfUrl, section1: editor1.getHTML(), section2: editor2.getHTML(), section3: editor3.getHTML(), section4: editor4.getHTML(), section5: editor5.getHTML(), section6: editor6.getHTML(), section7: editor7.getHTML(), section8: editor8.getHTML() })
            });

            if (res.status == 200) {
                let data = await res.json();
                router.push(`/courses/${data.course.id}`);
            } else {
                alert('Ha ocurrido un error');
            }
        }
    }

    // Gestionamos la eliminación del artículo
    const handleDelete = async () => {
        if (course && confirm('¿Estás seguro de que quieres eliminar este curso? Esta acción no tiene vuelta atrás.')) {
            await fetch(`/api/courses/${course.id}`, { method: 'DELETE' });
            router.push('/courses');
        }
    }

    const handleFeatured = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png,image/jpeg';

        input.onchange = async (e) => {
            var file = e.target.files[0];
            var data = new FormData()
            data.append('_file', file)
            let res = await fetch('https://aucal.edu/2022/pages/_/uploader.php?folder=courses', { method: 'POST', body: data });
            res = await res.json();

            if (res.status == 200) {
                setImage(res.filename);
            } else {
                alert(`Ha habido un error subiendo el archivo, código de error: ${res.error}`)
            }
        }
        input.click();
    }

    const handleTeacherImage = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png,image/jpeg';

        input.onchange = async (e) => {
            var file = e.target.files[0];
            var data = new FormData()
            data.append('_file', file)
            let res = await fetch('https://aucal.edu/2022/pages/_/uploader.php?folder=courses', { method: 'POST', body: data });
            res = await res.json();

            if (res.status == 200) {
                setTeacherImage(res.filename);
            } else {
                alert(`Ha habido un error subiendo el archivo, código de error: ${res.error}`)
            }
        }
        input.click();
    }

    const handlePdfImage = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png,image/jpeg';

        input.onchange = async (e) => {
            var file = e.target.files[0];
            var data = new FormData()
            data.append('_file', file)
            let res = await fetch('https://aucal.edu/2022/pages/_/uploader.php?folder=courses', { method: 'POST', body: data });
            res = await res.json();

            if (res.status == 200) {
                setPdfImage(res.filename);
            } else {
                alert(`Ha habido un error subiendo el archivo, código de error: ${res.error}`)
            }
        }
        input.click();
    }

    const handleThumbnail = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png,image/jpeg';

        input.onchange = async (e) => {
            var file = e.target.files[0];
            var data = new FormData()
            data.append('_file', file)
            let res = await fetch('https://aucal.edu/2022/pages/_/uploader.php?folder=courses', { method: 'POST', body: data });
            res = await res.json();

            if (res.status == 200) {
                setThumbnail(res.filename);
            } else {
                alert(`Ha habido un error subiendo el archivo, código de error: ${res.error}`)
            }
        }
        input.click();
    }


    const handlePdf = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';

        input.onchange = async (e) => {
            var file = e.target.files[0];
            var data = new FormData()
            data.append('_file', file)
            let res = await fetch('https://aucal.edu/2022/pages/_/uploader.php?folder=pdfs', { method: 'POST', body: data });
            res = await res.json();

            if (res.status == 200) {
                setPdfUrl(res.filename);
            } else {
                alert(`Ha habido un error subiendo el archivo, código de error: ${res.error}`)
            }
        }
        input.click();
    }

    return (<Container as="form" onSubmit={form.handleSubmit(handleSubmit)}>
        {/* Contenido principal */}
        <Main>
            <Input style={{ marginBottom: 8 }} placeholder="Introduce el nombre del curso" defaultValue={course?.title} {...register('title', { required: true })} />
            <Input style={{ marginBottom: 8 }} placeholder="Introduce el primer subtítulo del curso" defaultValue={course?.subtitle1} {...register('subtitle1', { required: false })} />
            <Input style={{ marginBottom: 8 }} placeholder="Introduce el segundo subtítulo del curso" defaultValue={course?.subtitle2} {...register('subtitle2', { required: false })} />
            <Input style={{ marginBottom: 8 }} placeholder="URL del formulario" defaultValue={course?.formUrl} {...register('form_url', { required: true })} />
            <Input style={{ marginBottom: 16 }} placeholder="URL hoja de admisión" defaultValue={course?.admisionUrl} {...register('admision_url', { required: false })} />
            <Tabs>
                <Tab active={tab == 0} onClick={() => setTab(0)}>Presentación</Tab>
                <Tab active={tab == 1} onClick={() => setTab(1)}>Información</Tab>
                <Tab active={tab == 2} onClick={() => setTab(2)}>Plan de estudios</Tab>
                <Tab active={tab == 3} onClick={() => setTab(3)}>Titulación</Tab>
                <Tab active={tab == 4} onClick={() => setTab(4)}>Materiales</Tab>
                <Tab active={tab == 5} onClick={() => setTab(5)}>Perfil del alumno</Tab>
                <Tab active={tab == 6} onClick={() => setTab(6)}>Documentación</Tab>
                <Tab active={tab == 7} onClick={() => setTab(7)}>Profesor</Tab>
            </Tabs>

            {tab == 0 && <Editor editor={editor1} />}
            {tab == 1 && <Editor editor={editor2} />}
            {tab == 2 && <Editor editor={editor3} />}
            {tab == 3 && <Editor editor={editor4} />}
            {tab == 4 && <Editor editor={editor5} />}
            {tab == 5 && <Editor editor={editor6} />}
            {tab == 6 && <Editor editor={editor7} />}
            {tab == 7 && <Editor editor={editor8} />}

        </Main>

        {/* Contenido lateral */}
        <Side>
            {/* Categoría y estado */}
            <Box title="Publicación" style={{ marginBottom: 12 }}>
                <Selector label="Categoría" placement="side" placeholder="Selecciona una categoría" defaultValue={course?.categoryId} {...register('category_id', { required: true })} style={{ marginBottom: 8 }}>
                    {categories && categories.map((v, i) => <option key={v.id} value={v.id}>{v.title}</option>)}
                </Selector>
                <Selector style={{ marginBottom: 8 }} label="Estado" placement="side" placeholder="Selecciona una opción" defaultValue={course?.status ?? 0} {...register('status', { required: true })}>
                    <option key="0" value="0">Borrador</option>
                    <option key="1" value="1">Publicado</option>
                </Selector>
                <Input style={{ marginBottom: 8 }} label="ECTS" placement="side" placeholder="ECTS" defaultValue={course?.ects} {...register('ects', { required: true, valueAsNumber: true })} />
                <Input style={{ marginBottom: 8 }} label="Meses" placement="side" placeholder="Introduce la duración en meses" defaultValue={course?.months} {...register('months', { required: true, valueAsNumber: true })} />
                <Input label="Metodología" placement="side" placeholder="Online, presencial..." defaultValue={course?.methodology} {...register('methodology', { required: true })} />
            </Box>

            {/* Imagen destacada del curso */}
            <Box title="Meta descripción" style={{ marginBottom: 16 }}>
                <Textarea maxLength={200} defaultValue={course?.metaDescription} {...register('meta_description')} />
            </Box>


            {/* Imagen destacada del curso */}
            <Box title="Imagen destacada" style={{ marginBottom: 16 }}>
                {image && <>
                    <div title="Cambiar imagen destacada" style={{ cursor: 'pointer' }} onClick={() => handleFeatured()}>
                        <img alt="" style={{ width: '100%', objectFit: 'cover', display: 'block', marginBottom: 12 }} src={image} />
                    </div>
                    <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => setImage(null)}>Eliminar imagen destacada</span>
                </>}
                {!image && <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => handleFeatured()}>Establecer imagen destacada</span>}
            </Box>

            {/* Imagen destacada del curso */}
            <Box title="Imagen pequeña" style={{ marginBottom: 16 }}>
                {thumbnail && <>
                    <div title="Cambiar imagen pequeña" style={{ cursor: 'pointer' }} onClick={() => handleThumbnail()}>
                        <img alt="" style={{ width: '100%', objectFit: 'cover', display: 'block', marginBottom: 12 }} src={thumbnail} />
                    </div>
                    <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => setThumbnail(null)}>Eliminar imagen pequeña</span>
                </>}
                {!thumbnail && <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => handleThumbnail()}>Establecer imagen pequeña</span>}
            </Box>

            {/* Imagen profesor  */}
            <Box title="Imagen del profesor" style={{ marginBottom: 16 }}>
                {teacherImage && <>
                    <div title="Cambiar imagen del profesor" style={{ cursor: 'pointer' }} onClick={() => handleTeacherImage()}>
                        <img alt="" style={{ width: '100%', objectFit: 'cover', display: 'block', marginBottom: 12 }} src={teacherImage} />
                    </div>
                    <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => setTeacherImage(null)}>Eliminar imagen del profesor</span>
                </>}
                {!teacherImage && <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => handleTeacherImage()}>Establecer imagen del profesor</span>}
            </Box>

            {/* Imagen PDF  */}
            <Box title="PDF asociado" style={{ marginBottom: 16 }}>
                <Buttonery style={{ marginBottom: 12 }}>
                    <Button onClick={() => handlePdf()}>{!pdfUrl ? 'Subir PDF' : 'Reemplazar PDF'}</Button>
                    {pdfUrl && <Button as="a" target="_blank" rel="noreferrer" href={pdfUrl} theme="red">Ver PDF</Button>}
                </Buttonery>
                <div style={{ color: '#333', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Imagen del PDF</div>
                {pdfImage && <>
                    <div title="Cambiar imagen del PDF" style={{ cursor: 'pointer' }} onClick={() => handlePdfImage()}>
                        <img alt="" style={{ width: '100%', objectFit: 'cover', display: 'block', marginBottom: 12 }} src={pdfImage} />
                    </div>
                    <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => setPdfImage(null)}>Eliminar imagen del PDF</span>
                </>}
                {!pdfImage && <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => handlePdfImage()}>Establecer imagen del PDF</span>}

            </Box>

            {/* Acciones */}
            <Buttonery>
                {course && <Button onClick={() => handleDelete()}>Eliminar curso</Button>}
                <Button as="button" theme="red">{course ? 'Actualizar curso' : 'Guardar curso'}</Button>
            </Buttonery>
        </Side>
    </Container>)
}