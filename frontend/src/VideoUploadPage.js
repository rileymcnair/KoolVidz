import React, { useState, useEffect} from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Header from "./Header.js";

const { Title } = Typography;
const { TextArea } = Input;


function UploadVideoPage() {

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");


    const handleChangeTitle = ( event ) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }

   

    return (
        <div className="App App-header">
                
            <Header /> 

        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            
            <Title level={2} > Upload a Video! <UploadOutlined/> </Title>
            
        </div>

        </div>

        <form enctype="multipart/form-data" method="POST" action={`/api/video/create?title=${title}&description=${Description}`}>
        
        <input key="video" name="video" type="file" id="video" style={{ width: '500px', height: '240px', border: '1px solid lightgray', 
        display: 'flex', alignItems: 'center', justifyContent: 'center' ,textAlign: 'center'}}/> 
        
        <br /><br />
        <label>Title</label>
        <br /><br />
            <Input
                 onChange={handleChangeTitle}
                 value={title}
                 style={{border: '5px solid blue' }}
                 placeholder="Enter title here"
            />
        <br /><br />
        <label>Description</label>
        <br /><br />
            <TextArea
                rows={4}
                style={{width:'800px' , border: '5px solid lightblue'}}
                onChange={handleChangeDecsription}
                value={Description}
                placeholder="Enter description here"
            />
            <br /><br />

        <input type="submit" value="Submit"/>
        
        </form>
    </div>
    )
}

export default UploadVideoPage