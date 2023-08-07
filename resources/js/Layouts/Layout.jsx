import NavLink from '@/Components/NavLink';

export default function Layout({children}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center h-16">
                        <div className="flex">
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('team')} active={route().current('team')}>
                                    Input Data Klub
                                </NavLink>
                                <NavLink href={route('match')} active={route().current('match')}>
                                    Input Skor
                                </NavLink>
                                <NavLink  href={route('standing')} active={route().current('standing')}>
                                    View Klasemen
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    )
}
