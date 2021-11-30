import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

import {VideoCameraOutlined, SearchOutlined, UploadOutlined} from '@ant-design/icons';



function Header() {

    function searchBoxListener(event){
        if(event.key==='Enter') {
            console.log('pressed enter in searchbox')
            search();
        }
    }
    function searchIconListener() {
        console.log("clicked search icon")
    }

    function search() {
        /* do search stuff here */
    }

    return (
        <div className="header">
            <Link to='/' className='homeLink'>
            <div className="header_logo" >
                <VideoCameraOutlined style={{fontSize:'45px' }}/> 
                <h1>KoolVidz</h1>
            </div>
            </Link>
            
            <div className="header_search">
                <input type="text" placeholder="Search videos" onKeyPress={searchBoxListener} ></input> 
                <SearchOutlined style={{fontSize:'45px' }}/>
            </div> 

            <Link to='/videoupload' className='uploadLink'>
            <div className="upload_logo" >
                <UploadOutlined style={{fontSize:'45px', color:'black' }}/> 
            </div>
            </Link>
        </div>
    )
}

export default Header
