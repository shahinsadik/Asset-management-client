
import { Outlet } from "react-router-dom";
import Navbar from './../Pages/Shared/Navbar';

const Index = () => {
   
    return (
        <div >
            <div className='pb-16'><Navbar></Navbar></div>
            <Outlet></Outlet>
            
        </div>
    );
};
export default Index;
