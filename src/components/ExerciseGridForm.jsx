import React, { useState, useEffect, useRef } from "react";
import exerciseDB from "../DB/exercise.json";
import "../css/ExerciseGridForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
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

  const handlePopupImageClick = (event) => {
    if (!event.target.closest(".exercise-popup")) {
      setShowPopup(false);
    } else {
      event.preventDefault(); // Prevent the default behavior to avoid unwanted resets
    }
  };

  const handleTouchStart = (exercise, event) => {
    // Prevent the default touch behavior to avoid issues with touch events
    event.preventDefault();
    handleExerciseClick(exercise, event);
  };
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp, { passive: false });
    document.addEventListener("click", handlePopupImageClick, true); // true for capturing phase

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp, {
        passive: false,
      });
      document.removeEventListener("click", handlePopupImageClick, true);
    };
  }, []);

  const handleExerciseClick = (exercise, event) => {
    // Check if the click target is the image button
    if (event.target.tagName.toLowerCase() === "button") {
      event.preventDefault();
      return;
    }

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
                  // toast(`${exercise.name} added`);
                  console.log(exerciseList);
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
