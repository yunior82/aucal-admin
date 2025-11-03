/* eslint-disable @next/next/no-img-element */
import ArticleEditor from "@/editors/ArticleEditor";
import { useAuth } from "@/hooks/useAuth";
import Article from "@/models/Article";
import Head from "next/head";

export default function Page({ article }) {
    const { user } = useAuth();

    if(![1, 2, 4].includes(user.groupId)) {
        return <h1>No tienes permiso para acceder a esta sección</h1>;
    }

    return <>
        <Head>
            <title>Editando artículo: {article.title} - {process.env.NEXT_PUBLIC_TITLE}</title>
        </Head>
        <h1 style={{ marginBottom: 16 }}>Editando artículo</h1>
        <ArticleEditor article={article} />
    </>
}

export async function getServerSideProps(req, res) {
    let article = await Article.query().where('id', req.query.id).first();
    if (!article)
        return { notFound: true }
    return { props: { article: JSON.parse(JSON.stringify(article)) } }
}