import { Pagination } from '@/components/Pagination';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PopoverButton, StyledTable } from '@/components/Table';
import useSWRImmutable from 'swr/immutable';
import { usePagination, usePopover } from '@/hooks';
import Badge from '@/components/Badge';
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

export default function Page() {
    const router = useRouter();
    const { user } = useAuth();

    if(![1, 2, 3].includes(user.groupId)) {
        return <h1>No tienes permiso para acceder a esta sección</h1>;
    }

    const [q, setQ] = useState(router.query.q ?? false);

    // Recupera los resultados
    const { mutate, data, isValidating } = useSWRImmutable(`courses`, async () => {
        if (router.isReady) {
            let query = { ...router.query };
            if (pagination.page > 1) {
                query.page = pagination.page;
            } else delete query.page;

            router.push({ pathname: router.pathname, query });
            return fetch(`/api/courses?page=${pagination.page}${q ? `&q=${q}` : ''}`).then(res => res.json());
        }
    });
    


    const popover = usePopover(({ close, course }) => {
        const handleDelete = async () => {
            if (confirm(`¿Estás seguro de que quieres eliminar "${course.title}"? Esta acción no tiene vuelta atrás.`)) {
                await fetch(`/api/courses/${course.id}`, { method: 'DELETE' });
                mutate();
                close();
            }
        }

        const duplicate = async () => {
            const res = await fetch(`/api/courses/${course.id}?shouldDuplicateCourse=1`, { method: 'POST' });
            let data = await res.json();
            if(data.item) {
                router.push(`/courses/${data.item}`);
            }
        }

        return <Dropdown>
            <a onClick={() => { router.push(`/courses/${course.id}`); close() }}>Editar</a>
            <a onClick={() => { duplicate(); close(); }}>Duplicar</a>
            <a onClick={handleDelete}>Eliminar</a>
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

    return <>
        <Head>
            <title>Cursos - {process.env.NEXT_PUBLIC_TITLE}</title>
        </Head>

        <h1 style={{ marginBottom: 16 }}>Listado de cursos</h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, height: 34 }}>
            <Pagination {...pagination} />
            <div style={{ display: 'flex' }}>
                <Search style={{ marginRight: 8 }} onChange={(e) => setQ(e.target.value)}>
                    <Icon path={mdiMagnify} />
                    <input placeholder="Buscar..." />
                </Search>

                <Link href="/courses/add" passHref>
                    <Button as="a" theme="red">Nuevo curso</Button>
                </Link>
            </div>
        </div>

        <StyledTable fetching={isValidating}>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: 70 }}>#</th>
                        <th>Título</th>
                        <th>Estado</th>
                        <th>Categoría</th>
                        <th>Fecha de creación</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.results.map((course, i) => {
                        return (<tr key={i}>
                            <td>
                                <a>{course.id}</a>
                            </td>
                            <td>
                                <Link href={`/courses/${course.id}`} passHref>
                                    <a>{course.title}</a>
                                </Link>
                            </td>
                            <td>
                                <a>
                                    {course.status == 1 && <Badge theme="green">Publicado</Badge>}
                                    {course.status == 0 && <Badge>Borrador</Badge>}
                                </a>
                            </td>
                            <td>
                                <a>{course.category.title}</a>
                            </td>
                            <td>
                                <a>
                                    {DateTime.fromISO(course.createdAt).setLocale('es').toFormat('dd LLL yyyy HH:mm')}
                                </a>
                            </td>
                            <td>
                                <a style={{ justifyContent: 'center' }}>
                                    <PopoverButton onClick={(e) => popover.toggle(e.currentTarget, { course })}>
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
