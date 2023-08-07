import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <Layout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <section className="max-w-full">
                                <h1 className="text-xl font-bold text-center">Selamat Datang di Mini-app Klasemen Sepakbola</h1>
                            </section>
                        </div>
                    </div>
                </div>
            </Layout>
        </>

    )
}
