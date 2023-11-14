import React, { useState, useEffect, useRef } from "react";
import exerciseDB from "../DB/exercise.json";
import "../css/ExerciseGridForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const ExerciseGridForm = ({
  exerciseList,
  setExerciseList,
  exerciseListIndex,
  setExerciseListIndex,
}) => {
  const [selectedKey, setSelectedKey] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const selectWorkoutRefs = useRef([]);

  const handleClick = (key) => {
    setSelectedKey(key);
  };

  const handleExerciseClick = (exercise) => {
    setPopupContent(exercise.link);
    setShowPopup(true);
  };

  const handleMouseUp = () => {
    setShowPopup(false);
  };

  const handleTouchStart = (exercise, event) => {
    // Prevent the default touch behavior to avoid issues with touch events
    event.preventDefault();
    handleExerciseClick(exercise);
  };

  useEffect(() => {
    if (selectWorkoutRefs.current) {
      selectWorkoutRefs.current[0].click(); // Click the first element only
    }
  }, []);

  useEffect(() => {
    // Add an event listener for mouseup and touchend to close the popup
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    return () => {
      // Cleanup the event listeners when the component unmounts
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div className="exercise-grid-form">
      <div className="body-names">
        {Object.keys(exerciseDB).map((key, index) => (
          <div
            ref={(el) => (selectWorkoutRefs.current[index] = el)}
            key={index}
            onClick={() => handleClick(key)}
            className={selectedKey === key ? "selected" : ""}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="exercise-names">
        {selectedKey !== "" && (
          <div className="scrollable-container">
            {exerciseDB[selectedKey].map((exercise, index) => (
              <div
                key={index}
                id={exercise.id}
                className="grid-item"
                onClick={() => {
                  if (!exerciseList.includes(exercise.name)) {
                    setExerciseList([...exerciseList, exercise.name]);
                  }
                  if (!exerciseListIndex.includes(exercise.index)) {
                    setExerciseListIndex([
                      ...exerciseListIndex,
                      exercise.index,
                    ]);
                  }
                }}
              >
                {exercise.name}
                <button
                  type="button"
                  onMouseDown={() => handleExerciseClick(exercise)}
                  onTouchStart={(event) => handleTouchStart(exercise, event)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FontAwesomeIcon icon={faImage} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {showPopup && (
        <div className="exercise-popup">
          <div className="popup-image-container">
            <img src={popupContent} alt="Exercise" loading="lazy" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseGridForm;
