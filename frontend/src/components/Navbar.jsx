import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Main dropdown states
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeNestedDropdown, setActiveNestedDropdown] = useState(null);
    
    // Refs for navbar elements
    const navbarRef = useRef(null);

    // Toggle main dropdown function
    const toggleDropdown = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null);
            setActiveNestedDropdown(null);
        } else {
            setActiveDropdown(dropdown);
            setActiveNestedDropdown(null);
        }
    };

    // Toggle nested dropdown function
    const toggleNestedDropdown = (e, dropdown) => {
        e.stopPropagation();
        if (activeNestedDropdown === dropdown) {
            setActiveNestedDropdown(null);
        } else {
            setActiveNestedDropdown(dropdown);
        }
    };

    // Handle menu item click
    const handleMenuItemClick = (e) => {
        e.stopPropagation();
        // Keep dropdown open when clicking inside it
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setActiveDropdown(null);
                setActiveNestedDropdown(null);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar" ref={navbarRef}>
            {/* Top Contact Bar */}
            <div className="top-contact-bar">
                <div className="container">
                    <div className="contact-details">
                        <a href="mailto:jayavratasengupta9881@gmail.com"><FaEnvelope /> jayavratasengupta9881@gmail.com</a>
                        <a href="tel:+1234567890"><FaPhone /> +91 96653 36474</a>
                        <a href="#"><FaMapMarkerAlt /> 123 Adventure Street, Mumbai City</a>
                    </div>
                    <div className="social-links">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="main-nav-bar">
                <div className="container">
                    <div className="logo">
                        <Link to="/"><img src={`${process.env.PUBLIC_URL}/logo/GulmargGold.png`} alt="Tropical Adventure Travel" /></Link>
                    </div>
                    <ul className="nav-links">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        
                        {/* Group Tours Dropdown */}
                        <li className="dropdown">
                            <button 
                                className="dropdown-button" 
                                onClick={() => toggleDropdown('groupTours')}
                                aria-expanded={activeDropdown === 'groupTours'}
                            >
                                Group Tours <FaCaretDown className="dropdown-arrow" />
                            </button>
                            <ul className={`dropdown-menu ${activeDropdown === 'groupTours' ? 'open' : ''}`}>
                                {/* Domestic Tours Nested Dropdown */}
                                <li className="nested-dropdown">
                                    <button 
                                        className="nested-dropdown-button" 
                                        onClick={(e) => toggleNestedDropdown(e, 'domestic')}
                                        aria-expanded={activeNestedDropdown === 'domestic'}
                                    >
                                        Domestic Tours <FaCaretDown className="nested-dropdown-arrow" />
                                    </button>
                                    <ul 
                                        className={`nested-dropdown-menu ${activeNestedDropdown === 'domestic' ? 'open' : ''}`} 
                                        onClick={handleMenuItemClick}
                                    >
                                        <li><Link to="/domestic-tours/ashtavinayak-darshan">Ashtavinayak Darshan</Link></li>
                                        <li><Link to="/domestic-tours/konkan-darshan">Konkan Darshan</Link></li>
                                        <li><Link to="/domestic-tours/kerala">Kerala</Link></li>
                                        <li><Link to="/domestic-tours/karnataka">Karnataka</Link></li>
                                        <li><Link to="/domestic-tours/himachal">Himachal</Link></li>
                                        <li><Link to="/domestic-tours/kashmir">Kashmir</Link></li>
                                        <li><Link to="/domestic-tours/uttarakhand">Uttarakhand</Link></li>
                                        <li><Link to="/domestic-tours/rajasthan">Rajasthan</Link></li>
                                        <li><Link to="/domestic-tours/goa">Goa</Link></li>
                                        <li><Link to="/domestic-tours/hyderabad">Hyderabad</Link></li>
                                        <li><Link to="/domestic-tours/tirupati-balaji-darshan">Tirupati Balaji Darshan</Link></li>
                                        <li><Link to="/domestic-tours/mahabaleshwar">Mahabaleshwar</Link></li>
                                        <li><Link to="/domestic-tours/vaishno-devi">Vaishno Devi</Link></li>
                                        <li><Link to="/domestic-tours/sikkim-darjeeling">Sikkim Darjeeling</Link></li>
                                        <li><Link to="/domestic-tours/varanasi">Varanasi</Link></li>
                                        <li><Link to="/domestic-tours/nepal-tour">Nepal Tour</Link></li>
                                        <li><Link to="/domestic-tours/shree-datta-dham-yatra">Shree Datta Dham Yatra</Link></li>
                                    </ul>
                                </li>
                                
                                {/* International Tours Nested Dropdown */}
                                <li className="nested-dropdown">
                                    <button 
                                        className="nested-dropdown-button" 
                                        onClick={(e) => toggleNestedDropdown(e, 'international')}
                                        aria-expanded={activeNestedDropdown === 'international'}
                                    >
                                        International Tours <FaCaretDown className="nested-dropdown-arrow" />
                                    </button>
                                    <ul 
                                        className={`nested-dropdown-menu ${activeNestedDropdown === 'international' ? 'open' : ''}`} 
                                        onClick={handleMenuItemClick}
                                    >
                                        <li><Link to="/international-tours/maldives">Maldives</Link></li>
                                        <li><Link to="/international-tours/thailand">Thailand</Link></li>
                                        <li><Link to="/international-tours/dubai">Dubai</Link></li>
                                        <li><Link to="/international-tours/singapore-malaysia">Singapore Malaysia</Link></li>
                                        <li><Link to="/international-tours/bali">Bali</Link></li>
                                        <li><Link to="/international-tours/singapore">Singapore</Link></li>
                                        <li><Link to="/international-tours/sri-lanka">Sri Lanka</Link></li>
                                        <li><Link to="/international-tours/hongkong-macau">Hongkong Macau</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        
                        {/* Special Tour Dropdown */}
                        <li className="dropdown">
                            <button 
                                className="dropdown-button" 
                                onClick={() => toggleDropdown('specialTour')}
                                aria-expanded={activeDropdown === 'specialTour'}
                            >
                                Special Tour <FaCaretDown className="dropdown-arrow" />
                            </button>
                            <ul className={`dropdown-menu ${activeDropdown === 'specialTour' ? 'open' : ''}`}>
                                <li><Link to="/summer-tours">Summer Tour</Link></li>
                                <li><Link to="/adventure-tours">Adventure Tour</Link></li>
                                <li><Link to="/student-tours">Student Tour</Link></li>
                                <li><Link to="/honeymoon-tours">Honeymoon Tour</Link></li>
                            </ul>
                        </li>
                        
                        <li><Link to="/hire">Hire / Car Bus</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;