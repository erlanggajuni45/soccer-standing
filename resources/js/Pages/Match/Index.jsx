import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";

export default function Match({teams}) {
    const {data, setData, processing, reset, errors, post, recentlySuccessful} = useForm([
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
        post(route('match.post'), {
            onSuccess: (res) => console.log(res),
            onError: (err) => console.log(err)
        })
    }, [])

    useEffect(() => {
        reset()
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
                                                        <option key={team.id} value={team.id}>{team.name} - {team.city}</option>
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
                                                        <option key={team.id} value={team.id}>{team.name} - {team.city}</option>
                                                    )
                                                })}
                                            </SelectInput>
                                            {errors.index === 0 &&  <InputError message={errors.away_team_id} />}
                                        </div>
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
                                            />
                                        {errors.index === 0 && <InputError message={errors.away_score} />}
                                        </div>
                                    </div>
                                    <Button disabled={processing}>Submit</Button>
                                </>
                            )}
                            {active ==='mutiple' && (
                                <>
                                    {data.map((input, idx) => {
                                        return(
                                            <div key={idx} className="flex flex-nowrap">
                                                <select name="team-1" value={data[idx].home_team_id} className="basis-1/3 my-auto">
                                                    <option value="" disabled>Klub 1</option>
                                                    {teams.map(team => {
                                                        return(
                                                            <option key={team.id} value={team.id}>{team.name} - {team.city}</option>
                                                        )
                                                    })}
                                                </select>
                                                <span className="py-2 px-4"> - </span>
                                                <select value={data[0].away_team_id} className="basis-1/3 my-auto">
                                                    <option value="" disabled>Klub 2</option>
                                                    {teams.map(team => {
                                                        return (
                                                            <option key={team.id} value={team.id}>{team.name} - {team.city}</option>
                                                        )
                                                    })}
                                                </select>
                                            {/* <InputError message={errors.name} /> */}
                                            </div>
                                           )
                                        }
                                    )}
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
