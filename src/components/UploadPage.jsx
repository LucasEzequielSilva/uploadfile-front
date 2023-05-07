import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from '../assets/images/upload.png';
function UploadPage () {
    let [recentImage, setRecentImage] = useState({})
    let [caption, setCaption] = useState("")
    let [uploadedImageUrl, setUploadImageUrl] = useState("")
    let [uploadedImage, setUploadedImage] = useState({})
    useEffect(()=>{
        fetchRecent()
    }, [])
    const fetchRecent = () => {
        axios.get('http://localhost:9890/recent')
            .then((response) => {
                setRecentImage(response.data.image);
            })
            .catch(err => alert('Error: ' + err));
    }

    const uploadImage = () => {
        if (!caption.trim() || !uploadedImage?.name) {
            return alert('Caption or file is missing');
        }

        let formData = new FormData();
        formData.append('caption', caption);
        formData.append('file', uploadedImage);

        axios.post('http://localhost:9890/', formData)
            .then((response) => {
                response.data.success ? alert('File successfully uploaded') : alert('File already exists');
                fetchRecent();
            })
            .catch(err => alert('Error: ' + err));
    }

        return (
            <div className="UploadPage border">
                <div className="Recent">
                    <p className="Recent__Title">Recently uploaded file</p>
                    <div className="ImageBox">
                        <div className="CaptionBox">
                            <p className="ImageBox__Caption">Caption</p>
                            <span className="ImageBox__CaptionValue">{recentImage?.caption}</span>
                        </div>

                        <img
                            src={'http://localhost:9890/image/' + recentImage?.filename}
                            alt="recent-image"
                            className="Recent__Image"
                        />
                    </div>
                </div>

                <div className="Upload">
                    <p className="Upload__Title">Upload File</p>
                    <div className="Upload__InputSection">
                        <input
                            type="text"
                            className="Upload__Caption"
                            placeholder="Enter caption..."
                            onChange={(event) => setCaption(event.target.value)}
                            value={caption}
                        />
                        <input
                            type="file"
                            className="Upload__Input"
                            onChange={(event) => {
                                setUploadImageUrl(URL.createObjectURL(event.target.files[0]))
                                setUploadedImage(event.target.files[0])
                            }}
                        />
                    </div>

                    <img
                        src={!uploadedImageUrl.trim() ? Upload : uploadedImageUrl}
                        alt="upload-image"
                        className="Upload__Image"
                    />

                    <button onClick={uploadImage} className="Upload__Button">Upload</button>
                </div>
            </div>
        );
    }

export default UploadPage;