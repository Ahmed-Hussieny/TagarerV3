import { Outlet } from "react-router-dom";
import { FooterC } from "../Footer/Footer";
import NavbarComp from "../Navbar/Navbar";
import { useEffect } from "react";
import { useAppDispatch } from "../../Store/store";
import { handleGetSeo } from "../../Store/user.slice";

export default function Layout() {
  const dispatch = useAppDispatch();
  const fetchSeo = async () => {
    const data = await dispatch(handleGetSeo({id:`${import.meta.env.VITE_SEO_ID}`}));
    console.log(data);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSeo();
  }, []);
  
  return (
    <div dir='rtl'>
      <NavbarComp />
      <div className='mt-16'>
      <Outlet />
      </div>
      <FooterC />
    </div>
  )
}
