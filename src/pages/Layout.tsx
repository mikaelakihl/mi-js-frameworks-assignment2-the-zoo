import { NavLink, Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        
        <> 
            <div className="flex flex-col min-h-screen">
                <header className="min-h-20 overflow-hidden bg-yellow-400 flex justify-between border-b border-black p-2 items-center">
                    <h2>Zoo</h2>
                    <nav>
                        <ul className="flex flex-row gap-2">
                            <li>
                                <NavLink to={'/'}>Hem</NavLink>
                            </li>
                            <span>|</span>
                            <li>
                                <NavLink to={'/animals'}>Djuren</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
            <main className="flex-1 bg-yellow-400 p-1 pb-10">
                <Outlet/>
            </main>
            <footer className="h-[20vh] bg-green-700 flex items-center justify-center text-white ">
                <div>
                    <p>© Mikaela Kihl | Djur på Zoo</p>
                </div>
            </footer>
            </div>
        </>
    )
}