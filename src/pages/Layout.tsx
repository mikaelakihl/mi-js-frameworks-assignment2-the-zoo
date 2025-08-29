import { NavLink, Outlet, useLocation } from "react-router-dom"

export const Layout = () => {

    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        
        <> 
            <div className="flex flex-col min-h-screen">
                <header className="min-h-20 overflow-hidden bg-yellow-400 flex justify-between p-2 items-center">
                {!isHome ? (
                        <h2 className="text-l text-shadow-sm text-yellow-100 uppercase">Zafarie</h2>
                        ) : (
                        <div className="w-[100px]" />
                        )}
                    <nav>
                        <ul className="flex flex-row gap-2 text-l">
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
            <footer className="h-[15vh] bg-green-700 flex items-center justify-center text-white ">
                <div>
                    <p>© Mikaela Kihl | Zafarie</p>
                </div>
            </footer>
            </div>
        </>
    )
}