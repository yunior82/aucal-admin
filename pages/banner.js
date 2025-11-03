/* eslint-disable @next/next/no-img-element */
import BannerEditor from "@/editors/BannerEditor";
import { useAuth } from "@/hooks/useAuth";
import Banner from "@/models/Banner";
import Head from "next/head";

export default function Page({ banner }) {
    const { user } = useAuth();

    if(![1, 2, 5].includes(user.groupId)) {
        return <h1>No tienes permiso para acceder a esta sección</h1>;
    }

    return <>
        <Head>
            <title>Editando banner - {process.env.NEXT_PUBLIC_TITLE}</title>
        </Head>
        <h1 style={{ marginBottom: 16 }}>Editando banner</h1>
        <BannerEditor banner={banner} />
    </>
}

export async function getServerSideProps(req, res) {
    let banner = await Banner.query().where('id', 1).first();
    if (!banner)
        return { notFound: true }
    return { props: { banner: JSON.parse(JSON.stringify(banner)) } }
}