/* eslint-disable @next/next/no-img-element */
import CourseEditor from "@/editors/CourseEditor";
import { useAuth } from "@/hooks/useAuth";
import Head from "next/head";

export default function Page({ article }) {

    const { user } = useAuth();

    if(![1, 2, 3].includes(user.groupId)) {
        return <h1>No tienes permiso para acceder a esta sección</h1>;
    }

    return <>
        <Head>
            <title>Nuevo curso - {process.env.NEXT_PUBLIC_TITLE}</title>
        </Head>
        <h1 style={{ marginBottom: 16 }}>Nuevo curso</h1>
        <CourseEditor />
    </>
}