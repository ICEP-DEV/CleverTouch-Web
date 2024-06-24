import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import video from "../../assets/video.mp4";
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Screening.css";
import { saveAs } from 'file-saver';
import capture from '../../assets/capture.png';
import { saveScreenshot, loadScreenshots } from './actions'; // Adjust the import path as necessary
import remove from '../../assets/remove.png';
import edit from '../../assets/edit.png';
import download from '../../assets/download.png';
import highlight from '../../assets/highlight.png';
import done from '../../assets/done.png';
import undoIcon from '../../assets/undo.png';
import redoIcon from '../../assets/redo.png'; // Ensure these are valid imports and file paths

function Screening({ saveScreenshot, loadScreenshots, screenshots }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [screenshotDataUrl, setScreenshotDataUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState('rgba(255, 255, 0, 0.5)'); // Default highlight color
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    useEffect(() => {
        loadScreenshots(screenshots);
    }, [loadScreenshots, screenshots]);

    const captureScreenshot = () => {
        const videoElement = videoRef.current;

        if (videoElement.readyState >= 2 && !videoElement.paused) {
            html2canvas(videoElement)
                .then(canvas => {
                    const dataUrl = canvas.toDataURL('image/png');
                    setScreenshotDataUrl(dataUrl);
                    setShowModal(true);
                })
                .catch(error => {
                    console.error('Error capturing screenshot:', error);
                });
        }
    };

    const saveFile = (dataUrl) => {
        const blob = dataURLtoBlob(dataUrl);
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];
        const fileName = `screenshot_${formattedDate}.png`;
        saveAs(blob, fileName);
    };

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

    const startDrawing = (e) => {
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
    
        setDrawing(true);
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 7;
        ctx.moveTo(offsetX * (canvas.width / rect.width), offsetY * (canvas.height / rect.height));
    };
    
    
    const draw = (e) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
    
        const ctx = canvas.getContext('2d');
        ctx.lineTo(offsetX * (canvas.width / rect.width), offsetY * (canvas.height / rect.height));
        ctx.stroke();
    };
    
    const stopDrawing = () => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        setHistory([...history, canvas.toDataURL('image/png')]);
        setDrawing(false);
    };

    const initializeCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = screenshotDataUrl;
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        // Store initial state in history
        setHistory([canvas.toDataURL('image/png')]);
    };
    
    useEffect(() => {
        if (isEditing && screenshotDataUrl) {
            initializeCanvas();
        }
    }, [isEditing, screenshotDataUrl]);

    const undo = () => {
        if (history.length === 0) return;
        const lastState = history.pop();
        setRedoStack([...redoStack, canvasRef.current.toDataURL('image/png')]);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = lastState;
        image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        };
    };

    const redo = () => {
        if (redoStack.length === 0) return;
        const nextState = redoStack.pop();
        setHistory([...history, canvasRef.current.toDataURL('image/png')]);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = nextState;
        image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        };
    };

    return (
        <div className="container-fluid screening">
            <div className="overlay">
                <h2 className="wlc"></h2>
                <h1 className="title"></h1>
                <button onClick={captureScreenshot} className="button" style={{ backgroundImage: `url(${capture})` }}></button>

                <video ref={videoRef} src={video} autoPlay loop muted className="video-bg" />
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        {!isEditing ? (
                            <img src={screenshotDataUrl} alt="Screenshot" />
                        ) : (
                            <div>
                                <canvas
    ref={canvasRef}
    onMouseDown={startDrawing}
    onMouseMove={draw}
    onMouseUp={() => setDrawing(false)}
    onMouseOut={() => setDrawing(false)}
    style={{ border: '1px solid black' }}
/>

                                <div>
                                <button onClick={undo}>
                                        <img src={undoIcon} alt="Undo" style={{ width: '20px', height: '20px' }} />
                                    </button>
                                    <button onClick={redo}>
                                        <img src={redoIcon} alt="Redo" style={{ width: '20px', height: '20px' }} />
                                    </button>
                                    <label htmlFor="colorPicker">
                                        <img src={highlight} alt="Highlight Color" />
                                    </label>
                                    <input
                                        type="color"
                                        id="colorPicker"
                                        onChange={(e) => setColor(e.target.value + '80')} // Adding opacity to the color
                                        defaultValue="#ffff00"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <button onClick={() => {
                                if (isEditing) {
                                    const canvas = canvasRef.current;
                                    const dataUrl = canvas.toDataURL('image/png');
                                    setScreenshotDataUrl(dataUrl);
                                }
                                setIsEditing(!isEditing);
                            }} className="edit-button">
                                <img src={isEditing ? done : edit} alt={isEditing ? 'Finish Editing' : 'Edit'} />
                            </button>
                            <button onClick={() => {
                                if (isEditing) {
                                    const canvas = canvasRef.current;
                                    const dataUrl = canvas.toDataURL('image/png');
                                    saveFile(dataUrl);
                                } else {
                                    saveFile(screenshotDataUrl);
                                }
                                setShowModal(false);
                            }} className="save-button">
                                <img src={download} alt="Save" />
                            </button>
                            <button onClick={() => setShowModal(false)} className="cancel-button">
                                <img src={remove} alt="Cancel" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
