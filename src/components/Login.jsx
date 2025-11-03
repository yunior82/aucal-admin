import { useState } from "react";
import { createGlobalStyle, keyframes } from "styled-components";
import styled from 'styled-components';
import Head from 'next/head';
import { useAuth } from '@/hooks/useAuth'
import { mdiLoading } from '@mdi/js';

const KeyframeSpin = keyframes`
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
`;

const LoginGlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        height: 100%;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    input,
    label,
    select,
    button,
    textarea
    {
        margin:0;
        border:0;
        padding:0;
        display:inline-block;
        vertical-align:middle;
        white-space:normal;
        background:none;
        line-height:1;
        font-family: inherit;
        font-size:16px;
        appearance: none;
        filter: none;
    }

    #__next {
        min-height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    input:focus
    {
        outline:0;
    }

    body {
        background: #000000; // f8f9fb 11101d
        color: #121212;
        font-family: 'Sebino', sans-serif;
        font-size: 16px;
        height: inherit;
        overflow-y: auto;
        overflow-x: hidden;
    }

    main {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
    }
`;

const Box = styled.div`
    background: #FFF;
    padding: 32px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    width: 100%;
    max-width: 380px;
`;

const Button = styled.button`
    color: #FFF;
    text-align: center;
    width: 100%;
    font-weight: 500;
    border-radius: 2px;
    margin-top: 8px;
    background: #e10031;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    height: 45px;

    &:disabled {
        background: #d65e78;
        pointer-events: none;
    }

    &:not(:disabled) {
        cursor: pointer;
    }

    svg {
        fill: #FFF;
        height: 24px;
        margin-left: 8px;
        animation: ${KeyframeSpin} .6s infinite linear;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;

    input {
        padding: 12px;
        border: 1px solid #e5e6eb;
        width: 100%;
        margin-bottom: 8px;
        border-radius: 2px;
        transition: border-color .1s ease-in;

        &:disabled {
            opacity: .6;
            cursor: default !important;
            pointer-events: none !important;
        }

        &:focus {
            border-color: #1d74f5;
        }
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    height: 80px;

    @media (max-width: 600px) {
        height: 65px;
    }

    img {
        display: block;
        object-fit: contain;
        height: 100%;
        flex-shrink: 0;
    }

    img:first-child {
        margin-right: 16px;
    }

    img:last-child {
        height: 60px;
        @media (max-width: 600px) {
            height: 45px;
        }

    }
`;

const Error = styled.div`
    margin-bottom: 16px;
    color: #ea5b5b;
`;

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    // Gestiona la subida del cuestionario
    const onSubmit = async (e) => {
        // Evitamos el evento real
        e.preventDefault();
        // Empezamos a cargar
        setLoading(true);

        // Realizamos una petición a la API
        const res = await fetch(`/api/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, password: password }) });
        const data = await res.json();

        switch(res.status) {
            case 200:
                login(data.token);
                return true;
        }

        setLoading(false);
    }


    return (
        <>
            <Head>
                <title>Iniciar sesión - {process.env.NEXT_PUBLIC_TITLE}</title>
            </Head>
            <main role="main">
                <LoginGlobalStyle/>
                <Logo>
                    <img alt="" src="/images/logo.png" />
                </Logo>
                <Box>
                    <Form onSubmit={onSubmit} autoComplete="off">
                        { error && <Error>{error}</Error>}
                        <input disabled={loading} type="text" name="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />
                        <input disabled={loading} type="password" name="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                        <Button type="submit" disabled={
                            // Asignamos las variables para deshabilitar el botón
                            loading ||
                            email.trim() == '' ||
                            password.trim() == ''}>
                            {!loading && <span>Iniciar sesión</span>}
                            {loading && <span>Iniciando sesión...</span>}
                            {loading && <svg viewBox="0 0 24 24"><path d={mdiLoading}></path></svg>}
                        </Button>
                    </Form>
                </Box>
            </main>
        </>
    );
};

export default Login;