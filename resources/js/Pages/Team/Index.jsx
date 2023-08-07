import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Team() {
    const {data, setData, processing, reset, errors, post, recentlySuccessful} = useForm({
        name: '',
        city: '',
    });
    const submit = (e) => {
        e.preventDefault(e)
        post(route('team.post'))
    }

    useEffect(() => {
        if (recentlySuccessful) {
            Swal.fire('Berhasil',`Input klub dengan nama ${data.name} berhasil`, 'success')
            reset()
        }
    }, [recentlySuccessful])

    return (
        <Layout>
            <Head title="Input Data Klub" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-full">
                            <h1 className="text-xl font-bold">Input data klub</h1>
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div className="flex flex-nowrap">
                                    <InputLabel value="Nama Klub" htmlFor="name" className="basis-1/4 my-auto" />
                                    <TextInput id="name" value={data.name} className="mt-1 basis-3/4" onChange={(e) => setData('name', e.target.value)} />
                                </div>
                                {errors.name != errors.city && <InputError message={errors.name} />}
                                <div className="flex flex-nowrap">
                                    <InputLabel value="Kota Klub" htmlFor="city" className="basis-1/4 my-auto" />
                                    <TextInput id="city" value={data.city} className="mt-1 basis-3/4" onChange={(e) => setData('city', e.target.value)} />
                                </div>
                                <InputError message={errors.city} />
                                <Button disabled={processing}>SAVE</Button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
