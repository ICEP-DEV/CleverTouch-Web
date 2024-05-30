import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadScreenshots } from '../../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserFile.css'; // Adjust path as per your structure

const UserFile = () => {
  const dispatch = useDispatch();
  const screenshots = useSelector(state => state.screenshot.screenshots || []);
  const [expandedScreenshotIndex, setExpandedScreenshotIndex] = useState(null); // Track which screenshot is expanded

  useEffect(() => {
    const storedScreenshots = JSON.parse(localStorage.getItem('screenshots')) || [];
    if (storedScreenshots.length) {
      dispatch(loadScreenshots(storedScreenshots));
    }
  }, [dispatch]);

  useEffect(() => {
    if (screenshots.length) {
      localStorage.setItem('screenshots', JSON.stringify(screenshots));
    }
  }, [screenshots]);

  const toggleSize = (index) => {
    setExpandedScreenshotIndex(expandedScreenshotIndex === index ? null : index); // Toggle expansion
  };

  return (
    <div className="container userfile">
      <h1>User File</h1>
      {screenshots.length > 0 ? (
        <div className="screenshot-container">
          <h3>Captured Screenshots:</h3>
          <div className="row">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="col-md-3 mb-3">
                <img
                  src={screenshot}
                  alt={`Captured Screenshot ${index + 1}`}
                  className={`screenshot ${expandedScreenshotIndex === index ? 'expanded' : 'thumbnail'}`}
                  onClick={() => toggleSize(index)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No screenshots available.</p>
      )}
    </div>
  );
};

export default UserFile;
