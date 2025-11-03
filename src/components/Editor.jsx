/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { EditorContent } from '@tiptap/react'
import styled, { css } from 'styled-components';
import Icon from '@/components/Icon'
import { mdiColorHelper, mdiFormatAlignCenter, mdiFormatAlignLeft, mdiFormatAlignRight, mdiFormatBold, mdiFormatColorHighlight, mdiFormatHeader1, mdiFormatHeader2, mdiFormatHeader3, mdiFormatItalic, mdiFormatListBulleted, mdiFormatListNumbered, mdiFormatStrikethrough, mdiFormatUnderline, mdiIframe, mdiImageOutline, mdiLink, mdiMarker, mdiTable, mdiTablePlus } from '@mdi/js';
import { useModal } from '@/hooks';
import { Modal } from '@/components/Modal';
import Button from '@/components/Button';
import { Input } from '@/components/fields';
import { useState } from 'react';

const EditorContainer = styled.div`
    border: 1px solid #eeeeee;
    position: relative;
    background: #FFF;

    .ProseMirror {
        outline: none;
        border-radius: 2px;
        padding: 24px;

        p {
            margin: 0;
        }

        img {
            height: auto;
            max-width: 100%;
            border: 2px solid transparent;

            &.ProseMirror-selectednode {
                border: 2px solid rgba(200, 200, 255, 0.4);
                border-radius: 2px;
                overflow: hidden;
            }
        }

        table {
            border-collapse: collapse;
            margin: 0;
            overflow: hidden;
            table-layout: fixed;
            width: 100%;

            td, th {
                border: 1px dotted #ced4da;
                box-sizing: border-box;
                min-width: 1em;
                padding: 3px 5px;
                position: relative;
                vertical-align: top;

                > * {
                    margin-bottom: 0;
                }
            }

            th {
                font-weight: bold;
                text-align: left;
            }

            .selectedCell:after {
                background: rgba(200, 200, 255, 0.4);
                content: "";
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                pointer-events: none;
                position: absolute;
                z-index: 2;
            }

            .column-resize-handle {
                background-color: #adf;
                bottom: -2px;
                position: absolute;
                right: -2px;
                pointer-events: none;
                top: 0;
                width: 4px;
            }

        }
    }

    .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
    }
`;

const Menu = styled.div`
    display: flex;
    border-bottom: 1px solid #eeeeee;
    padding: 8px;
    position: sticky;
    top: 0;
    z-index: 995;
    background: #fcfcfe;
`;

const Option = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    margin-right: 4px;

    &:hover {   
        background: #f6f7fa;
    }

    svg {
        height: 21px;
        fill: #87888a;
    }

    ${props => props.isActive && css`
        background: #f6f7fa;

        svg {
            fill: #e10031;
        }
    `}
`;

export default function Editor({ editor }) {

    const handleLink = useModal(({ close }) => {
        let curr = editor.getAttributes('link').href;

        return <>
            <Modal.Header handleClose={close}>
                <h1>Añadir enlace</h1>
            </Modal.Header>
            <Modal.Body>
                <Input id="linkAttr" placement="side" defaultValue={curr} placeholder="Introduce un enlace..." />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    let link = document.getElementById('linkAttr').value;
                    if (link) {
                        editor.chain().focus().toggleLink({ href: link }).run();
                    } else {
                        editor.chain().focus().unsetLink().run();
                    }
                    close();
                }}>Aceptar</Button>
            </Modal.Footer>
        </>
    });

    const handleImage = useModal(({ close }) => {
        const [image, setImage] = useState(editor.getAttributes('image').src);

        const handleUpload = () => {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/png,image/jpeg';

            input.onchange = async (e) => {
                var file = e.target.files[0];
                var data = new FormData()
                data.append('_file', file);
                let res = await fetch('https://aucal.edu/2022/pages/_/uploader.php?folder=images', { method: 'POST', body: data });
                res = await res.json();

                if (res.status == 200) {
                    setImage(res.filename);
                } else {
                    alert(`Ha habido un error subiendo el archivo, código de error: ${res.error}`)
                }
            }

            input.click();
        }

        const deleteImage = () => {
            editor.chain().focus().deleteSelection().run();
            setImage(null);
            close();
        }

        return <>
            <Modal.Header handleClose={close}>
                <h1>Añadir imagen</h1>
            </Modal.Header>
            <Modal.Body>
                {image && <>
                    <div title="Cambiar imagen destacada" style={{ cursor: 'pointer' }} onClick={() => handleUpload()}>
                        <img alt="" style={{ width: '100%', objectFit: 'cover', display: 'block', marginBottom: 12 }} src={image} />
                    </div>
                    <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => deleteImage()}>Eliminar imagen</span>
                </>}
                {!image && <span style={{ color: '#e10031', cursor: 'pointer' }} onClick={() => handleUpload()}>Subir nueva imagen</span>}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    if (image) {
                        editor.chain().focus().setImage({ src: image }).run();
                    }
                    close();
                }}>Aceptar</Button>
            </Modal.Footer>
        </>
    });

    // Si el Tiptap no se ha iniciado, no podemos hacer nada
    if (!editor) return null;

    // Renderiza el contenido
    return <EditorContainer>
        <Menu>
            <Option title="Encabezado 1" onClick={(e) => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive({ level: 1 })}>
                <Icon path={mdiFormatHeader1} />
            </Option>
            <Option title="Encabezado 2" onClick={(e) => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive({ level: 2 })}>
                <Icon path={mdiFormatHeader2} />
            </Option>
            <Option title="Encabezado 3" onClick={(e) => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive({ level: 3 })}>
                <Icon path={mdiFormatHeader3} />
            </Option>
            <Option title="Negrita" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
                <Icon path={mdiFormatBold} />
            </Option>
            <Option title="Cursiva" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
                <Icon path={mdiFormatItalic} />
            </Option>
            <Option title="Tachar" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
                <Icon path={mdiFormatStrikethrough} />
            </Option>
            <Option title="Subrayar" onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
                <Icon path={mdiFormatUnderline} />
            </Option>
            <Option title="Añadir enlace" onClick={(e) => handleLink.display()} isActive={editor.isActive('link')}>
                <Icon path={mdiLink} />
            </Option>
            <Option title="Añadir imagen" onClick={(e) => handleImage.display()} isActive={editor.isActive('image')}>
                <Icon path={mdiImageOutline} />
            </Option>
            <Option title="Lista" onClick={(e) => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
                <Icon path={mdiFormatListBulleted} />
            </Option>
            <Option title="Lista numerada" onClick={(e) => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
                <Icon path={mdiFormatListNumbered} />
            </Option>
            <Option title="Añadir tabla" onClick={(e) => editor.commands.insertTable({ rows: 3, cols: 2, withHeaderRow: true })} isActive={editor.isActive('table')}>
                <Icon path={mdiTable} />
            </Option>
            {editor.isActive('table') && <Option title="Añadir fila" onClick={(e) => editor.commands.addRowAfter()}>
                <Icon path={mdiTablePlus} />
            </Option>}
            <Option title="Alinear a la izquierda" onClick={(e) => editor.chain().focus().setTextAlign('left').run()}>
                <Icon path={mdiFormatAlignLeft} />
            </Option>
            <Option title="Alinear al centro" onClick={(e) => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })}>
                <Icon path={mdiFormatAlignCenter} />
            </Option>
            <Option title="Alinear a la derecha" onClick={(e) => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })}>
                <Icon path={mdiFormatAlignRight} />
            </Option>
            <Option title="Color rojo" onClick={(e) => editor.isActive('textStyle', { color: '#e10031' }) ? editor.chain().focus().unsetColor().run() : editor.chain().focus().setColor('#e10031').run()} isActive={editor.isActive('textStyle', { color: '#e10031' })}>
                <Icon path={mdiFormatColorHighlight} />
            </Option>
        </Menu>
        <EditorContent editor={editor} />
    </EditorContainer>
}