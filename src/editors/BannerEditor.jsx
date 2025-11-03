/* eslint-disable @next/next/no-img-element */
import Editor from "@/components/Editor";
import styled from 'styled-components';
import Box from '@/components/Box';
import { Input } from '@/components/fields';
import { Selector } from '@/components/fields/Selector';
import { useForm } from "react-hook-form";
import useSWR from "swr";
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

export default function Component({ banner }) {
    const router = useRouter();
    const { register, ...form } = useForm();
    const [image, setImage] = useState(banner?.imageUrl);

    const handleSubmit = async (data) => {
        if (banner) {
            // Actualizamos el artículo actual
            let res = await fetch(`/api/banner/${banner.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, image_url: image })
            });

            if(res.status == 200) {
                alert('¡Actualizado con éxito!');
            } else {
                alert('Ha ocurrido un error al actualizar');
            }
            
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
            let res = await fetch('https://aucal.edu/2022/pages/_/uploader.php?folder=banner', { method: 'POST', body: data });
            res = await res.json();

            if (res.status == 200) {
                setImage(res.filename);
            } else {
                alert(`Ha habido un error subiendo el archivo, código de error: ${res.error}`)
            }
        }

        input.click();
    }

    return (<Container as="form" onSubmit={form.handleSubmit(handleSubmit)}>
        {/* Contenido principal */}
        <Main>
            <Input label="Título del banner" style={{ marginBottom: 12 }} placeholder="Introduce un título para el banner" defaultValue={banner?.title} {...register('title', { required: true })} />
            <Input label="Subtítulo del banner" style={{ marginBottom: 12 }} placeholder="Introduce un subtítulo para el banner" defaultValue={banner?.subtitle} {...register('subtitle', { required: false })} />
            <Input label="Texto del botón" style={{ marginBottom: 12 }} placeholder="Introduce un texto para el botón" defaultValue={banner?.button} {...register('button', { required: true })} />
            <Input label="Enlace del botón" style={{ marginBottom: 12 }} placeholder="Introduce una URL para el botón" defaultValue={banner?.href} {...register('href', { required: true })} />
        </Main>

        {/* Contenido lateral */}
        <Side>
            {/* Imagen destacada del artículo */}
            <Box title="Fondo del banner" style={{ marginBottom: 16 }}>
                {image && <>
                    <div title="Cambiar fondo" style={{ cursor: 'pointer' }} onClick={() => handleFeatured()}>
                        <img alt="" style={{ width: '100%', objectFit: 'cover', display: 'block', marginBottom: 12 }} src={image} />
                    </div>
                    <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => setImage(null)}>Eliminar fondo</span>
                </>}
                {!image && <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => handleFeatured()}>Establecer fondo</span>}
            </Box>

            {/* Acciones */}
            <Buttonery>
                <Button as="button" theme="red">{banner ? 'Actualizar banner' : 'Guardar banner'}</Button>
            </Buttonery>
        </Side>
    </Container>)
}