import { Pagination } from '@/components/Pagination';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PopoverButton, StyledTable } from '@/components/Table';
import useSWRImmutable from 'swr/immutable';
import { useModal, usePagination, usePopover } from '@/hooks';
import { mdiDotsHorizontal, mdiMagnify } from '@mdi/js';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@/components/Button';
import Search from '@/components/Search';
import Icon from '@/components/Icon';
import Dropdown from '@/components/Dropdown';
import { useAuth } from '@/hooks/useAuth';
import { Input, Selector } from '@/components/fields';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/Modal';
import styled
    from 'styled-components';
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
`;


function UserModal({ close, user }) {
    const { register, ...form } = useForm();

    const handleSubmit = async (data) => {
        if (user) {
            // Actualizamos un usuario
            let res = await fetch(`/api/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data })
            });
        } else {
            // Creamos un nuevo usuario
            let res = await fetch(`/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data })
            });

            if (res.status == 200) {
                let data = await res.json();
            }
        }

        close();
    }

    return <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <Modal.Header handleClose={() => close()}>
            <h1>{!user ? 'Nuevo usuario' : 'Editar usuario'}</h1>
        </Modal.Header>
        <Modal.Body>
            <Grid>
                <Input label="Nombre" defaultValue={user?.firstName} placeholder="Introduce un nombre" {...register('first_name', { required: true })} />
                <Input label="Apellidos" defaultValue={user?.lastName} placeholder="Introduce los apellidos" {...register('last_name')} />
                <Input label="Email" autoComplete="off" defaultValue={user?.email} type="email" placeholder="Introduce un correo electrónico" {...register('email', { required: true })} />
                <Selector label="Grupo de usuario" defaultValue={user?.groupId ?? ''} {...register('group_id', { required: true })}>
                    <option value="1">Administrador</option>
                    <option value="2">Editor global</option>
                    <option value="3">Editor de cursos</option>
                    <option value="4">Editor de artículos</option>
                    <option value="5">Editor de banner</option>
                </Selector>
                {!user && <Input label="Contraseña" autoComplete="off" type="password" placeholder="Introduce una contraseña" {...register('password', { required: true })} />}
                {user && <Input label="Nueva contraseña" autoComplete="off" type="password" placeholder="Rellenar para cambiar la contraseña" {...register('password')} /> }
            </Grid>
        </Modal.Body>
        <Modal.Footer>
            <Button as="button" theme="red">{!user ? 'Añadir usuario' : 'Actualizar usuario'}</Button>
        </Modal.Footer>
    </form>
}

export default function Page() {
    const router = useRouter();
    const [q, setQ] = useState(router.query.q ?? false);
    const { user: currUser } = useAuth();


    // Recupera los resultados
    const { mutate, data, isValidating } = useSWRImmutable(`users`, async () => {
        if (router.isReady) {
            let query = { ...router.query };
            if (pagination.page > 1) {
                query.page = pagination.page;
            } else delete query.page;

            router.push({ pathname: router.pathname, query });
            return fetch(`/api/users?page=${pagination.page}${q ? `&q=${q}` : ''}`).then(res => res.json());
        }
    });


    const modal = useModal((props) => {
        return <UserModal {...props} />;
    }, { onClose: () => mutate() })

    const popover = usePopover(({ close, user }) => {
        const handleDelete = async () => {
            if (confirm(`¿Estás seguro de que quieres eliminar a ${user.firstName}`)) {
                await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
                mutate();
                close();
            }
        }

        return <Dropdown>
            <a onClick={() => modal.display({ user })}>Editar</a>
            {user.id != currUser.id && <a onClick={handleDelete}>Eliminar</a>}
        </Dropdown>
    });

    // Gestiona la paginación de la tabla
    const pagination = usePagination({
        currentPage: router.query.page ?? 1,
        totalItems: data?.total ?? 1,
        itemsPerPage: 30,
        onChange: (page) => mutate()
    });

    useEffect(() => {
        pagination.setPage(1);
        mutate();
    }, [q])

    if (![1].includes(currUser.groupId)) {
        return <>
            <h1 style={{ marginBottom: 16 }}>No tienes permisos de acceso</h1>
            <p>Tu nivel de acceso actual no permite la visualización de esta página.</p>
        </>
    }

    return <>
        <Head>
            <title>Usuarios - {process.env.NEXT_PUBLIC_TITLE}</title>
        </Head>

        <h1 style={{ marginBottom: 16 }}>Listado de usuarios</h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, height: 34 }}>
            <Pagination {...pagination} />
            <div style={{ display: 'flex' }}>
                <Search style={{ marginRight: 8 }} onChange={(e) => setQ(e.target.value)}>
                    <Icon path={mdiMagnify} />
                    <input placeholder="Buscar..." />
                </Search>

                <Button onClick={() => modal.display()} theme="red">Nuevo usuario</Button>
            </div>
        </div>

        <StyledTable fetching={isValidating}>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: 70 }}>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Grupo</th>
                        <th>Fecha de creación</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.results.map((user, i) => {
                        return (<tr key={i}>
                            <td>
                                <a>{user.id}</a>
                            </td>
                            <td>
                                <a>{user.firstName} {user.lastName}</a>
                            </td>
                            <td>
                                <a>
                                    {user.email}
                                </a>
                            </td>
                            <td>
                                <a>
                                    {user.groupId == 1 && <>Administrador</>}
                                    {user.groupId == 2 && <>Editor global</>}
                                    {user.groupId == 3 && <>Editor de cursos</>}
                                    {user.groupId == 4 && <>Editor de artículos</>}
                                    {user.groupId == 5 && <>Editor de banner</>}
                                </a>
                            </td>
                            <td>
                                <a>
                                    {DateTime.fromISO(user.createdAt).setLocale('es').toFormat('dd LLL yyyy HH:mm')}
                                </a>
                            </td>
                            <td>
                                <a style={{ justifyContent: 'center' }}>
                                    <PopoverButton onClick={(e) => popover.toggle(e.currentTarget, { user })}>
                                        <Icon path={mdiDotsHorizontal} />
                                    </PopoverButton>
                                </a>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </StyledTable>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, height: 34 }}>
            <Pagination {...pagination} />
        </div>
    </>
}
