/* eslint-disable @next/next/no-img-element */
import CourseEditor from "@/editors/CourseEditor";
import { useAuth } from "@/hooks/useAuth";
import Course from "@/models/Course";
import Head from "next/head";

export default function Page({ course }) {
    const { user } = useAuth();

    if(![1, 2, 3].includes(user.groupId)) {
        return <h1>No tienes permiso para acceder a esta sección</h1>;
    }

    return <>
        <Head>
            <title>Editando curso: {course.title} - {process.env.NEXT_PUBLIC_TITLE}</title>
        </Head>
        <h1 style={{ marginBottom: 16 }}>Editando curso</h1>
        <CourseEditor course={course} />
    </>
}

export async function getServerSideProps(req, res) {
    let course = await Course.query().where('id', req.query.id).first();
    if (!course)
        return { notFound: true }
    return { props: { course: JSON.parse(JSON.stringify(course)) } }
}