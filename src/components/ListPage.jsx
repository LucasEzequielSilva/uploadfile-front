import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListState(){
    let [imageList, setImageList] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:9890/')
            .then(response => {
                setImageList(response.data.images);
            })
            .catch(err => alert(err));
    }, [])

    const deleteFile = (id) => {
        axios.get('http://localhost:9890/delete/' + id) 
            .then((response) => {
                if (response.data.success) {
                    alert('File with ID: ' + id + ' has been deleted');
                    setImageList(imageList.filter(el => el._id !== id));
                }
            })
            .catch(err => alert(err));
    }

        return (
            <div className="ListPage border ">
                <p className="ListPage__Title">List of Files/Images</p>

                <div className="ListImageContainer">
                    {imageList?.map((file) => (
                        <div className="ListImage">
                            <p className="ListImage__Caption">{file.caption}</p>
                            <p className="ListImage__Date">{file.createdAt}</p>
                            <img
                                src={'http://localhost:9890/image/' + file.filename}
                                alt="list-image"
                                className="ListImage__Image"
                            />

                            <button className="ListImage__Delete" onClick={() => deleteFile(file._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        );
}

export default ListState;