import { NavLink } from "react-router-dom";

const links = [
    { to: "/", label: "Home" },
    { to: "/history", label: "History" },
    { to: "/collections", label: "Collections" },
    { to: "/mock-server", label: "Mock Server" },
    { to: "/settings", label: "Settings" },
];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav aria-label="Primary navigation">
                <ul>
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink className="nav-link" to={link.to}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
