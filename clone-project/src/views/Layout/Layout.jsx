import React, { useState } from 'react'
import './layout.css'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router'
import Form from '../../components/Form/Form'

const Layout = () => {
    
    const [category,setCategory] = useState(0)
    const [sidebar,setSidebar] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [sideMenu,setSideMenu] = useState(false);
    const [formMenu,setFormMenu] = useState(false);

    return (
        <div className='wrapper'>
            <header>
                <Navbar setSidebar={setSidebar} setSearchResults={setSearchResults} sideMenu={sideMenu} setSideMenu={setSideMenu} setFormMenu={setFormMenu}/>
            </header>
            <main>
                <Outlet context={{ category,setCategory,sidebar,setSidebar,searchResults,sideMenu,setSideMenu,setFormMenu }}/>
            </main>
            <section>
                <Form formMenu={formMenu} setFormMenu={setFormMenu}/>
            </section>
        </div>
    )
}

export default Layout