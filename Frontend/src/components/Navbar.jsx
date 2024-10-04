import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMouseOver = (menu) => {
        setActiveMenu(menu);
    };

    const handleMouseOut = () => {
        setActiveMenu(null);
    };

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${API_URL}/api/menu-items`);
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    const parseSubItems = (subItems) => {
        if (typeof subItems === 'string') {
            try {
                return JSON.parse(subItems);
            } catch (error) {
                console.error("Failed to parse subItems:", error);
                return [];
            }
        }
        return subItems || [];
    };

    return (
        <>
            <nav className="navbar">
                <h2 className="navbar-title">Mater</h2>
                <FontAwesomeIcon icon={faBars} className="navbar-icon" onClick={toggleMenu} />
            </nav>

            <div className={`fullscreen-menu ${isOpen ? 'open' : ''}`}>
                <div className='fullscreen-navbar'>
                    <h2>Mater</h2>
                    <button className="close-menu" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button></div>

                <ul className='menu'>
                    {menuItems.map(({ id, title, subItems }) => (
                        <li
                            key={id}
                            onMouseOver={() => handleMouseOver(title)}
                            onMouseOut={handleMouseOut}
                        >
                            {title}
                            {activeMenu === title && (
                                <SubMenu items={parseSubItems(subItems)} />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
