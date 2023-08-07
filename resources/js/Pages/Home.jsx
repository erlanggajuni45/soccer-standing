import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <Layout>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h1>Hai</h1>
                </div>
            </Layout>
        </>

    )
}
