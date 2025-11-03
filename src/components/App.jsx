import styled from "styled-components";
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import Wrapper from "@/components/Wrapper";
import { AthenaProvider } from '@/hooks';
import { useRouter } from "next/router";

const Main = styled.div`
    flex: 1;
    position: relative;
`;

export default function App({ children }) {
    const router = useRouter();      

    return <AthenaProvider>
        <Head>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <title>{process.env.NEXT_PUBLIC_TITLE} - Panel de gestión</title>
        </Head>
        <main>
            <Sidebar />
            <Main id="main">
                <Wrapper style={{ padding: 24 }}>
                    {children}
                </Wrapper>
            </Main>
        </main>
        <style jsx global>{/*css*/`
            *, *::before, *::after {
                box-sizing: border-box;
            }

            html {
                height: 100%;
            }

            body {
                background: #fff;
                color: #242424;
                min-width: 100%;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Apple Color Emoji", "Segoe UI Emoji";
                font-size: 14px;
                font-feature-settings: "kern";
                -moz-osx-font-smoothing: grayscale;
                line-height: 1.15;
                overflow-y: scroll;
            }

            main {
                display: flex;
                flex: 1;
            }

            input {
                appearance: none;
                border: 0;
                box-shadow: 0;
                outline: none;
            }

            table, td, tr, th {
                padding: 0;
                border: 0;
            }

            #__next {
                display: flex;
                width: 100%;
            }

            h1, h2, h3, h4, h5 {
                margin: 0;
            }

            h1 {
                display: block;
                font-size: 24px;
                font-weight: 700;
            }
        `}
        </style>
    </AthenaProvider>
}