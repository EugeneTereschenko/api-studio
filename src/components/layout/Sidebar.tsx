import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/history">History</NavLink>
                    </li>
                    <li>
                        <NavLink to="/collections">Collections</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mock-server">Mock Server</NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings">Settings</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}