/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { mdiBookOutline, mdiChevronDown, mdiAccountSupervisorOutline, mdiNewspaper, mdiSchoolOutline, mdiDoorClosed, mdiDoorOpen, mdiProjectorScreenOutline } from '@mdi/js';
import Icon from '@/components/Icon';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const Container = styled.div`
    background: #0d0d0d;
    color: #FFF;
    width: 240px;
    flex: 0 0 240px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky; 
    top: 0;
`;

const Item = styled.a`
    display: flex;
    text-decoration: none;
    padding: 0 16px;
    height: 40px;
    align-items: center;
    border-radius: 20px;
    color: inherit;
    fill: #eff0f3;
    font-size: 14px;
    cursor: pointer;
    flex-shrink: 0;
    font-weight: 500;

    svg {
        height: 21px;
        display: block;
        opacity: .8;
        pointer-events: none;
    }

    span {
        margin-left: 12px;
        flex: 1;
    }

    &:hover {
        background: #41404a;

        svg {
            opacity: 1;
        }
    }
`;

const Listing = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;

    ${Item}:not(:last-child) {
        margin-bottom: 8px;
    }
`;

export default function Sidebar() {
    const { user, logout } = useAuth();

    const items = [
        {
            href: '/articles',
            title: 'Artículos',
            icon: mdiNewspaper,
            groups: [1, 2, 4]
        },
        {
            href: '/courses',
            title: 'Cursos',
            icon: mdiSchoolOutline,
            groups: [1, 2, 3]
        },
        {
            href: '/banner',
            title: 'Banner',
            icon: mdiProjectorScreenOutline,
            groups: [1, 2, 5]
        },
        {
            href: '/users',
            title: 'Usuarios',
            icon: mdiAccountSupervisorOutline,
            groups: [1]
        }
    ]

    return <Container>
        <div style={{ padding: 16, paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img style={{ display: 'block', width: '80%' }} alt="" src="/images/logo.png" />
        </div>
        <span style={{ textAlign: 'center' }}>Bienvenido/a, {user.firstName}</span>

        <Listing>
            {items.map((item, i) => {
                if (item.groups.includes(user.groupId)) {
                    return <Link href={item.href} passHref key={i}>
                        <Item key={i}>
                            <Icon path={item.icon} />
                            <span>{item.title}</span>
                            {item.children && <Icon path={mdiChevronDown} />}
                        </Item>
                    </Link>
                }
            })}
            <Item key="logout" onClick={() => logout()}>
                <Icon path={mdiDoorOpen} />
                <span>Cerrar sesión</span>
            </Item>
        </Listing>
    </Container>
}