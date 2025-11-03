/* eslint-disable @next/next/no-img-element */
import ArticleEditor from "@/editors/ArticleEditor";
import { useAuth } from "@/hooks/useAuth";
import Head from "next/head";

export default function Page({ article }) {
    const { user } = useAuth();

    if(![1, 2, 4].includes(user.groupId)) {
        return <h1>No tienes permiso para acceder a esta sección</h1>;
    }

    return <>
        <Head>
            <title>Nuevo artículo - {process.env.NEXT_PUBLIC_TITLE}</title>
        </Head>
        <h1 style={{ marginBottom: 16 }}>Nuevo artículo</h1>
        <ArticleEditor />
    </>
}