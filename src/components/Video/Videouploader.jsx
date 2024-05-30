import React, { useState } from 'react';
import './Videouploader.css'

const VideoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = () => {
    // You can perform further operations like uploading the file to a server here
    console.log('File uploaded:', selectedFile);
    // Reset selected file
    setSelectedFile(null);
  };

  return (
    <div className="video-uploader">
      <h2 className="uploader-title">Video Uploader</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} className="file-input" />
      {selectedFile && (
        <div className="selected-file">
          <p className="file-info">Selected File: {selectedFile.name}</p>
          <video controls className="video-preview">
            <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
