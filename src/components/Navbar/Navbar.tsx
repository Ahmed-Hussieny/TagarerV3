import { useState, useEffect } from 'react';
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import logo from '../../assets/Images/logo.png';
import { NavLink, useLocation } from 'react-router-dom';

export default function NavbarComp() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [navbarBackground, setNavbarBackground] = useState('#FFFFFF');
    const [activeStyle, setActiveStyle] = useState("");
    const [path, setPath] = useState("");
    // const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname)
    }, [location]);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // const signOut = () => {
    //     localStorage.clear();
    //     navigate('/login');
    //     setIsNavbarOpen(!isNavbarOpen);
    // };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setActiveStyle('border-b-2  rounded-lg');
                // setLogoColor(logow);
            } else {
                setNavbarBackground('#FFFFFF');
                setActiveStyle('');
                // setLogoColor(logo);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar style={{ backgroundColor: navbarBackground }} className="fixed z-10 top-0 shadow-md md:shadow-none w-full">
            <NavbarBrand href="/">
                <img src={logo} className="h-8 sm:h-10 ps-3" alt="Tagarer Logo" />
            </NavbarBrand>

            {/* Right side (Button for large screens & Navbar toggle) */}
            <div className="flex items-center md:order-2">{/* 
                {localStorage.getItem('userToken') ?
                    <div className="hidden lg:block pe-3">
                        <button onClick={signOut} className="bg-main_color text-white px-3 ms-2 sm:px-6 py-2 rounded-xl text-sm sm:text-base md:w-36 w-1/2 sm:w-40 hover:opacity-90">
                            تسجيل الخروج
                        </button>
                    </div>
                    :
                    <div className="hidden lg:block pe-3">
                        <button onClick={() => navigate("/login")} className="bg-secondary_color text-main_color px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base md:w-36 w-1/2 sm:w-40 hover:opacity-90">
                            تسجيل الدخول
                        </button>
                        <button onClick={() => navigate("/register")} className="bg-main_color text-white px-3 ms-2 sm:px-6 py-2 rounded-xl text-sm sm:text-base md:w-36 w-1/2 sm:w-40 hover:opacity-90">
                            انشاء حساب
                        </button>
                    </div>
                }
            */}</div> 
            <NavbarToggle onClick={toggleNavbar} className="text-black" />


            {/* Collapsible menu for small screens */}
            <NavbarCollapse>
                <Button className="w-full mb-2 md:hidden">Get started</Button>

                {/* Dropdowns with custom arrow color */}
                <NavLink
                    to="/"
                    className={`text-black py-2 px-3  ${path === '/' ? `border-b-2 ${activeStyle} border-main_color` : ''}`}
                >
                    الرئيسية
                </NavLink>

                <NavLink
                    to="/search"
                    className={`text-black py-2 px-3  flex  ${path === '/search' ? `border-b-2 ${activeStyle} border-main_color` : ''}`}
                >
                    التقارير و الدراسات
                </NavLink>

                <NavLink
                    to="/guides"
                    className={`text-black py-2 px-3  flex  ${path === '/guides' ? `border-b-2 ${activeStyle} border-main_color` : ''}`}
                >
                    الأدلة المعرفية
                </NavLink>

                <NavLink
                    to="/aboutUs"
                    className={`text-black py-2 px-3  flex  ${path === '/aboutUs' ? `border-b-2 ${activeStyle} border-main_color` : ''}`}
                >
                    من نحن
                </NavLink>

                {/* <NavLink
                    to="/packages"
                    className={`text-black py-2 px-3  flex  ${path === '/packages' ? `border-b-2 ${activeStyle} border-main_color` : ''}`}
                >
                    الباقات 
                </NavLink> */}

                {/* {localStorage.getItem('userToken') ? <>
                    <NavLink
                        to="/Pakages"
                        
                        className={`text-black py-2 px-3  flex  ${path === '/Pakages' ? `border-b-2 ${activeStyle} border-main_color` : ''}`}    
                    >
                        الاشتراكات
                    </NavLink> 
                </>
                // {localStorage.getItem('userToken') ? 
                //     <NavLink to='login' className='flex absolute bottom-5 mt-8 items-center' onClick={signOut}>
                //     <img className="w-4 h-4 ms-2 me-3" src={linkIcon} alt="linkIcon" />
                //     <span className={` py-2 hover:text-main_color ${path === '/login' ? `text-main_color` : ''}`}>تسجيل الخروج</span>
                //     </NavLink>
                //     :""}
                :
                // <NavLink
                //     to="/login"
                //     className={`${textColor} py-2 px-3 font-bold flex  ${path === '/login' ? `border-b-2 ${activeStyle} border-main_color` : ''}`}
                // >
                //     تسجيل الدخول
                // </NavLink>
                ""
                } */}
            </NavbarCollapse>

            {/* Overlay that appears when Navbar is open (only on small screens) */}
            {isNavbarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10 transition-opacity duration-300 md:hidden"
                    onClick={toggleNavbar}
                ></div>
            )}

            <div
                className={`fixed bottom-0 top-0 right-0 pt-8  bg-white h-screen w-2/3 p-4 z-20 transition-transform duration-300 ${isNavbarOpen ? 'transform translate-x-0' : 'transform translate-x-full'} md:hidden`}
            >
                <img src={logo} className="h-9" alt="Tagarer Logo" />

                <NavLink to='/' className='flex mt-8 items-center' onClick={toggleNavbar}>
                    {/* <img className="w-4 h-4 ms-2 me-3" src={linkIcon} alt="linkIcon" /> */}
                    <span className={` py-2 hover:text-main_color ${path === '/' ? `text-main_color` : ''}`}>الرئيسية</span>
                </NavLink>
                <NavLink to='/search' className='flex mt-3 items-center' onClick={toggleNavbar}>
                    <span className={` py-2 hover:text-main_color ${path === '/search' ? `text-main_color` : ''}`}>التقارير الدراسية </span>
                </NavLink>
                <NavLink to='guides' className='flex mt-3 items-center' onClick={toggleNavbar}>
                    <span className={` py-2 hover:text-main_color ${path === '/guides' ? `text-main_color` : ''}`}>الأدلة المعرفية</span>
                </NavLink>
                <NavLink to='aboutUs' className='flex mt- items-center' onClick={toggleNavbar}>
                    <span className={` py-2 hover:text-main_color ${path === '/aboutUs' ? `text-main_color` : ''}`}>من نحن</span>
                </NavLink>

                {/* <NavLink to='packages' className='flex mt-3 mb-9 items-center' onClick={toggleNavbar}>
                    <span className={` py-2 hover:text-main_color ${path === '/packages' ? `text-main_color` : ''}`}>الباقات</span>
                    </NavLink> */}
                {/* {localStorage.getItem('userToken') ? 
                    <>
                    <NavLink to='login' className="bg-main_color text-white px-10 sm:px-6 py-2 rounded-xl text-sm sm:text-base sm:w-40 hover:opacity-90" onClick={signOut}>
                    <span className={` py-2 hover:text-main_color ${path === '/login' ? `text-main_color` : ''}`}>تسجيل الخروج</span>
                    </NavLink>
                </>
                    :<div className=' mt-2 '>
                    <div><button onClick={()=>navigate("/login")} className="bg-secondary_color text-main_color px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base w-full sm:w-40 hover:opacity-90">
                تسجيل الدخول
                            </button></div>
                    <div><button onClick={()=>navigate("/register")} className="bg-main_color text-white px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base w-full mt-3 sm:w-40 hover:opacity-90">
                انشاء حساب
                            </button></div>
                
                
                </div>} */}
            </div>
        </Navbar>
    );
}
