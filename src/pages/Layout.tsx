import { NavLink, Outlet } from "react-router"

export const Layout = () => {
    return (
        <>
            <header>
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
            <main>
                <Outlet/>
            </main>
            <footer></footer>
        </>
    )
}