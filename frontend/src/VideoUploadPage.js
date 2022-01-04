import React, { useState, useEffect} from 'react'
import './VideoUploadPage.css'


function UploadVideoPage() {

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");


    const handleChangeTitle = ( event ) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        setDescription(event.currentTarget.value)
    }


    return (
        <div className="App App-header">
                

        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}></div>
        </div>

        <form encType="multipart/form-data" method="POST" action={`/api/video/create?title=${title}&description=${Description}`}>
        
        <label>Upload mp4</label>
        <br></br>
        <input placeholder='test' className="upload" key="video" name="video" type="file" id="video" style={{ width: '500px', height: '240px', border: '1px solid lightgray', 
        display: 'flex', alignItems: 'center', justifyContent: 'center' ,textAlign: 'center'}}/> 
        
        <br /><br />
        <label className="title">Title</label>
        <br /><br />
             <input
                className="enterTitle"
                 onChange={handleChangeTitle}
                 value={title}
                 style={{border: '5px solid blue' }}
                 placeholder="Enter title here"
            />
        <br /><br />
        <label>Description</label>
        <br /><br />
            <input
                className="descriptionEnter"
                rows={4}
                onChange={handleChangeDecsription}
                value={Description}
                placeholder="Enter description here"
            /> 
            <br /><br />

        <input className="submit" type="submit" value="Submit"/>
        
        </form>

    </div>
    )
}

export default UploadVideoPage