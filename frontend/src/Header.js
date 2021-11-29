import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

/* Icons (if these are causing issues you can delete these imports 
    and their invocations in the function below and Riley will try to fix) */
import VideocamIcon from '@mui/icons-material/Videocam'; 
import SearchIcon from '@mui/icons-material/Search';



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
                <VideocamIcon className="videocamIcon" /> 
                <h1>KoolVidz</h1>
            </div>
            </Link>
            <div className="header_search">
                <input type="text" placeholder="Search videos" onKeyPress={searchBoxListener} ></input> 
                <SearchIcon className="searchIcon" onClick={searchIconListener}/>
            </div> 
        </div>
    )
}

export default Header
