import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Standing({standings}) {
    return (
        <Layout>
            <Head title="View Klasemen" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-full">
                            <h1 className="text-xl font-bold">Klasemen</h1>
                            <table className="w-full mt-4">
                                <thead className="border-2 bg-gray-800 text-white">
                                    <tr>
                                        <td className="py-4 px-2">No</td>
                                        <td>Klub</td>
                                        <td>Main</td>
                                        <td>Menang</td>
                                        <td>Seri</td>
                                        <td>Kalah</td>
                                        <td>Goal Menang</td>
                                        <td>Goal Kalah</td>
                                        <td>Point</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {standings.map((standing, index) => (
                                        <tr key={standing.id} className="border-b-2">
                                            <td className="pl-2 p-4">{index + 1}</td>
                                            <td className="py-4">{standing.name}</td>
                                            <td className="py-4">{standing.total_matches}</td>
                                            <td className="py-4">{standing.wins}</td>
                                            <td className="py-4">{standing.draws}</td>
                                            <td className="py-4">{standing.loses}</td>
                                            <td className="py-4">{standing.goals_scored}</td>
                                            <td className="py-4">{standing.goals_against}</td>
                                            <td className="py-4">{standing.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
