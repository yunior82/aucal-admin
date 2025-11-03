import Head from "next/head";

export default function Page() {
    return <>
        <Head>
            <title>{process.env.NEXT_PUBLIC_TITLE} - No se ha encontrado el contenido</title>
        </Head>
            <h1 style={{ marginBottom: 12 }}>Contenido no encontrado</h1>
            <div>El contenido que buscas no existe o ha sido eliminado.</div>
    </>
}