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

    const onSubmit = () => {
    
    }

    const onDrop = (files) => {
 
    }

    return (
        <div className="App App-header">
                
                <Header /> 

        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > Upload a Video! </Title>
        </div>
</div>
        <Form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Dropzone 
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        > 
                            <input {...getInputProps()} />
                            
                            <UploadOutlined style={{fontSize:'80px' }} />
                        </div>
                    )}
                </Dropzone>

            </div>

            <br /><br />
            <label>Title</label>
            <br /><br />
            <Input
                 onChange={handleChangeTitle}
                 value={title}
            />
            <br /><br />
            <label>Description</label>
            <br /><br />
            <TextArea
                rows={4}
                style={{width:'800px' }}
                onChange={handleChangeDecsription}
                value={Description}
            />
            <br /><br />

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>

        </Form>
    </div>
    )
}

export default UploadVideoPage