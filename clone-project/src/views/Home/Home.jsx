import React, { useState } from 'react';
import './Home.css'
import {useOutletContext} from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed';

const Home = () => {

    const {category,setCategory,sidebar,setSideMenu,setFormMenu} = useOutletContext();

    

    return (
        <div className='home' onClick={()=> setSideMenu(prev=>prev === true?false:null)}>
            <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} setFormMenu={setFormMenu}/>
            <div className={`containers ${sidebar?"":'large-containers'}`}>
                <Feed category={category}/>
            </div>
        </div>
    )
}

export default Home