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
  showPopup,
  popupContent,
  setShowPopup,
  setPopupContent,
}) => {
  const [selectedKey, setSelectedKey] = useState("");
  const selectWorkoutRefs = useRef([]);

  const handleClick = (key) => {
    setSelectedKey(key);
  };

  const handleMouseUp = () => {
    setShowPopup(false);
  };

  const handlePopupImageClick = () => {
    setShowPopup(false);
  };

  const handleTouchStart = (exercise, event) => {
    // Prevent the default touch behavior to avoid issues with touch events
    event.preventDefault();
    handleExerciseClick(exercise, event);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("click", handlePopupImageClick);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener("click", handlePopupImageClick);
    };
  }, []);

  const handleExerciseClick = (exercise, event) => {
    // Prevent the default behavior to avoid issues with touch events
    event.preventDefault();

    // Toggle the popup visibility on button click
    setShowPopup((prev) => !prev);

    // Set the popup content only if showing the popup
    if (!showPopup) {
      setPopupContent(exercise.link);
    }
  };

  useEffect(() => {
    if (selectWorkoutRefs.current) {
      selectWorkoutRefs.current[0].click(); // Click the first element only
    }
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
                  onMouseDown={(event) => handleExerciseClick(exercise, event)}
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
    </div>
  );
};

export default ExerciseGridForm;
