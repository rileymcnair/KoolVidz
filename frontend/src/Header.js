import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

import {VideoCameraOutlined, SearchOutlined, UploadOutlined} from '@ant-design/icons';

function Header() {

    function searchBoxListener(event){
        if (event.key==='Enter') {
            search();
        }
    }

    function search() {
        let input = document.getElementById('search_box').value
        window.location.replace('/search/' + input);
    }

    function goHome() {
        window.location.replace('/search/');
    }

    return (
        <div className="header">
            <div className="header_logo" onClick={goHome}>
                <VideoCameraOutlined className='videocamIcon' style={{fontSize:'45px' }}/> 
                <h1>KoolVidz</h1>
            </div>
            
            <div className="header_search">
                <input type="text" id="search_box" placeholder="Search videos" onKeyPress={searchBoxListener} ></input> 
                <SearchOutlined className='searchIcon' onClick={search} style={{fontSize:'45px' }}/>
            </div> 

            <Link to='/videoupload' className='uploadLink'>
            <div className="upload_logo" >
                <h1>Upload</h1>
                <UploadOutlined style={{fontSize:'45px', color:'black' }}/> 
            </div>
            </Link>
        </div>
    )
}

export default Header