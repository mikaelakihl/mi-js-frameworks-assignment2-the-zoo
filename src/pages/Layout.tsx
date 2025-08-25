import { NavLink, Outlet } from "react-router"

export const Layout = () => {
    return (
        <>  <div className="flex flex-col h-screen">
                <header className="bg-yellow-400 flex items-center justify-center">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to={'/'}>Hem</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/animals'}>Djuren</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
            <main className="flex-1 bg-red-200">
                <Outlet/>
            </main>
            <footer className="h-[10vh] bg-green-700 flex items-center justify-center text-white"></footer>
            </div>
        </>
    )
}