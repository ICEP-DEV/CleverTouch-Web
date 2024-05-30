import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import video from "../../assets/video.mp4";
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Screening.css";
import { saveAs } from 'file-saver';
import capture from '../../assets/capture.png';
import { saveScreenshot, loadScreenshots } from './actions'; // Adjust the import path as necessary

function Screening({ saveScreenshot, loadScreenshots, screenshots }) {
    // Ref for the video element
    const videoRef = useRef(null);
    const [screenshotDataUrl, setScreenshotDataUrl] = useState(null);

    useEffect(() => {
      loadScreenshots(screenshots);
    }, [loadScreenshots, screenshots]);

    // Function to capture screenshot
    const captureScreenshot = () => {
        // Get the video element
        const videoElement = videoRef.current;

        // Ensure the video is playing and has loaded before taking the screenshot
        if (videoElement.readyState >= 2 && !videoElement.paused) {
            html2canvas(videoElement)
                .then(canvas => {
                    // Convert canvas to image
                    const dataUrl = canvas.toDataURL('image/png');

                    // Set the screenshot data URL
                    setScreenshotDataUrl(dataUrl);

                    // Dispatch action to save screenshot in Redux store
                    saveScreenshot(dataUrl);

                    // Save the screenshot as a file 
                    saveFile(dataUrl); 
                    
                    
                })
                .catch(error => {
                    console.error('Error capturing screenshot:', error);
                });
        }
    };

    // Function to save file
    const saveFile = (dataUrl) => {
        // Convert the data URL to a Blob
        const blob = dataURLtoBlob(dataUrl);

        // Get the current date
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Create the filename with the date
        const fileName = `screenshot_${formattedDate}.png`;

        // Save the Blob as a file
        saveAs(blob, fileName);
    };

    // Function to convert data URL to Blob
    const dataURLtoBlob = (dataUrl) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    return(
        <div className="container-fluid screening"> {/* Use container-fluid for full width */}
            <div className="overlay">
                <h2 className="wlc"></h2>
                <h1 className="title"></h1>
                <button onClick={captureScreenshot} className="button" style={{ backgroundImage: `url(${capture})` }}></button>

                <div id="divToTakeScreenShotOf"></div>
                <div></div>
                <video ref={videoRef} src={video} autoPlay loop muted className="video-bg"/>
                <div className="container">
                    {/* Your content goes here */}
                </div>
            </div>
            {/* Display the captured screenshot */}
            {screenshotDataUrl && <img src={screenshotDataUrl} alt="Screenshot"/>}
        </div>
    );
}

const mapStateToProps = state => ({
  screenshots: state.screenshots,
});

const mapDispatchToProps = {
  saveScreenshot,
  loadScreenshots,
};

export default connect(mapStateToProps, mapDispatchToProps)(Screening);