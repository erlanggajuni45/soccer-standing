import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Match({teams}) {
    const {data, setData, processing, transform, reset, errors, post, recentlySuccessful} = useForm([
        {
            home_team_id: '',
            away_team_id: '',
            home_score: '',
            away_score: '',
        }
    ]);

    const [active, setActive] = useState('one')

    const submit = useCallback((e) => {
        e.preventDefault(e)
        transform(() => ([...data]))
        post(route('match.post'), {
            onError: (err) => {
                if (err.unique) {
                    Swal.fire(
                        'Gagal',
                        `${err.unique}${active != 'one' ? ` di baris ${err.index+1}`: ''}`,
                        'warning'
                    )
                }
            }
        })
    }, [data])

    useEffect(() => {
        if (active === 'one') {
            const firstData = data[0];
            setData([firstData])
        } else {
            setData((prevData) => [prevData[0], {
                home_team_id: '',
                away_team_id: '',
                home_score: '',
                away_score: '',
            }])
        }
    }, [active])

    useEffect(() => {
        if (recentlySuccessful) {
            reset()
            Swal.fire('Berhasil',`Input pertandingan berhasil`, 'success')
            setData([
                {
                    home_team_id: '',
                    away_team_id: '',
                    home_score: '',
                    away_score: '',
                }
            ])
            if (active == "mutiple") setData(prevData => [...prevData, {
                home_team_id: '',
                away_team_id: '',
                home_score: '',
                away_score: '',
            }])
        }
    }, [recentlySuccessful])

    const changeInput = useCallback((e) => {
        const { value, dataset, name } = e.target
        const index = dataset.index
        setData((prevData) => {
            const newData = [...prevData]
            newData[index][name] = value
            return newData
        })
    }, [])

    return (
        <Layout>
            <Head title="Input Skor" />
            <div className="pt-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-full flex justify-center">
                            <button
                                className={`px-4 py-2 mx-2 w-full rounded-sm bg-gray-100 ${active === 'one' && 'bg-gray-800 text-white'}`}
                                onClick={() => setActive('one')}
                            >Input satu persatu</button>
                            <button
                                className={`px-4 py-2 mx-2 w-full rounded-sm bg-gray-100 ${active === 'mutiple' && 'bg-gray-800 text-white'}`}
                                onClick={() => setActive('mutiple')}
                            >Input lebih dari satu</button>
                        </section>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-full">
                            <h1 className="text-xl font-bold">Input Skor</h1>
                            <form onSubmit={submit} className="mt-6 space-y-6">
                            {active === 'one' && (
                                <>
                                    <div className="flex flex-nowrap">
                                        <div className="flex flex-col">
                                            <SelectInput
                                                name="home_team_id"
                                                value={data[0].home_team_id}
                                                onChange={changeInput}
                                                data-index={0}
                                                className="basis-1/3 w-48 my-auto"
                                            >
                                                <option value="" disabled>Klub 1</option>
                                                {teams.map(team => {
                                                    return(
                                                        <option key={team.id} value={team.id}>{team.name}</option>
                                                    )
                                                })}
                                            </SelectInput>
                                            {errors.index === 0 && <InputError message={errors.home_team_id} />}
                                        </div>

                                        <span className="py-2 px-4"> - </span>

                                        <div className="flex flex-col">
                                            <SelectInput
                                                name="away_team_id" value={data[0].away_team_id}
                                                onChange={changeInput}
                                                data-index={0}
                                                className="basis-1/3 w-48 my-auto"
                                            >
                                                <option value="" disabled>Klub 2</option>
                                                {teams.map(team => {
                                                    return (
                                                        <option key={team.id} value={team.id}>{team.name}</option>
                                                    )
                                                })}
                                            </SelectInput>
                                            {errors.index === 0 &&  <InputError message={errors.away_team_id} />}
                                        </div>
                                    <Button disabled={processing} className="basis 1/3 mx-4 py-2">Save</Button>
                                    </div>
                                    <div className="flex flex-nowrap">
                                        <div className="flex flex-col">
                                            <TextInput
                                                type="number"
                                                min="0"
                                                name="home_score"
                                                data-index={0}
                                                className="basis-1/3 w-48 my-auto"
                                                placeholder="Skor klub 1"
                                                onChange={changeInput}
                                                value={data[0].home_score}
                                            />
                                            {errors.index === 0 && <InputError message={errors.home_score} />}
                                        </div>
                                            <span className="py-2 px-4"> - </span>
                                        <div className="flex flex-col">
                                            <TextInput
                                                type="number"
                                                min="0"
                                                name="away_score"
                                                data-index={0}
                                                className="basis-1/3 w-48 my-auto"
                                                placeholder="Skor klub 2"
                                                onChange={changeInput}
                                                value={data[0].away_score}
                                            />
                                        {errors.index === 0 && <InputError message={errors.away_score} />}
                                        </div>
                                    </div>
                                </>
                            )}
                            {active ==='mutiple' && (
                                <>
                                    {data.map((input, idx) => {
                                        return(
                                            <>
                                            <div key={idx} className="flex flex-nowrap">
                                                <div className="flex flex-col">
                                                    <SelectInput
                                                        name="home_team_id"
                                                        value={data[idx].home_team_id}
                                                        onChange={changeInput}
                                                        data-index={idx}
                                                        className="basis-1/4 w-48 my-auto"
                                                    >
                                                        <option value="" disabled>Klub {(idx+1+idx)}</option>
                                                        {teams.map(team => {
                                                            return(
                                                                <option key={team.id} value={team.id}>{team.name}</option>
                                                            )
                                                        })}
                                                    </SelectInput>
                                                    {errors.index === idx && <InputError message={errors.home_team_id} />}
                                                </div>

                                                <span className="py-2 px-4"> - </span>

                                                <div className="flex flex-col">
                                                    <SelectInput
                                                        name="away_team_id" value={data[idx].away_team_id}
                                                        onChange={changeInput}
                                                        data-index={idx}
                                                        className="basis-1/4 w-48 my-auto"
                                                    >
                                                        <option value="" disabled>Klub {(idx+2+idx)}</option>
                                                        {teams.map(team => {
                                                            return (
                                                                <option key={team.id} value={team.id}>{team.name}</option>
                                                            )
                                                        })}
                                                    </SelectInput>
                                                    {errors.index === idx &&  <InputError message={errors.away_team_id} />}
                                                </div>
                                                <div className="flex flex-col ml-16">
                                                    <TextInput
                                                        type="number"
                                                        min="0"
                                                        name="home_score"
                                                        data-index={idx}
                                                        className="basis-1/3 w-48 my-auto"
                                                        placeholder={`Skor klub ${(idx+1+idx)}`}
                                                        onChange={changeInput}
                                                        value={data[idx].home_score}
                                                    />
                                                    {errors.index === idx && <InputError message={errors.home_score} />}
                                                </div>
                                                    <span className="py-2 px-4"> - </span>
                                                <div className="flex flex-col">
                                                    <TextInput
                                                        type="number"
                                                        min="0"
                                                        name="away_score"
                                                        data-index={idx}
                                                        className="basis-1/3 w-48 my-auto"
                                                        placeholder={`Skor klub ${(idx+2+idx)}`}
                                                        onChange={changeInput}
                                                        value={data[idx].away_score}
                                                    />
                                                {errors.index === idx && <InputError message={errors.away_score} />}
                                                </div>
                                            </div>
                                            </>
                                        )}
                                    )}
                                <button
                                    disabled={processing}
                                    type="button"
                                    className="py-1 px-4 m-0 rounded-md text-white w-24 block bg-green-400"
                                    onClick={() => setData((prevData) => [...prevData, {
                                        home_team_id: '',
                                        away_team_id: '',
                                        home_score: '',
                                        away_score: '',
                                    }]
                                )}>Add</button>
                                <button disabled={processing} className="py-1 px-4 m-0 rounded-md text-white w-24 block bg-gray-800">Save</button>
                                </>
                            )}
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
