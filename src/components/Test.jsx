import React, { useState, useRef } from "react";
import AddWorkoutForm from "./AddWorkoutForm";
import "../css/Test.css";
const Test = ({ workouts }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  // Add your form refs here (focusRef, exerciseNameRef, setsRef, repsRef)

  const openModal = () => {
    setFormVisible(true);
  };

  const closeModal = () => {
    setFormVisible(false);
  };
  const modalStyle = {
    display: isFormVisible ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  };

  const modalContentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%", // Adjust the width as needed
    maxHeight: "90%", // Adjust the maximum height as needed
    overflow: "auto", // Add overflow to handle content that exceeds the modal size
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  };

  const closeStyle = {
    position: "absolute",
    top: "0",
    right: "5px",
    fontSize: "20px",
    cursor: "pointer",
  };

  return (
    <>
      <button onClick={openModal} className="button-28">
        Create Routine
      </button>
      <div style={modalStyle} className="modal">
        <div style={modalContentStyle} className="modal-content">
          <AddWorkoutForm
            closeModal={closeModal}
            closeStyle={closeStyle}
            setShowPopup={setShowPopup}
            setPopupContent={setPopupContent}
            showPopup={showPopup}
            popupContent={popupContent}
          />
        </div>
      </div>
      <div>image</div>

      {showPopup && (
        <div
          className="exercise-popup"
          style={{
            position: "fixed",
            bottom: 10, // Set the distance from the bottom
            right: 10, // Set the distance from the right
            width: 300, // Set the width of the popup
            height: 300, // Set the height of the popup
            backgroundColor: "#fff",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 999,
          }}
        >
          <div
            className="popup-image-container"
            onClick={() => setShowPopup(false)} // Close the popup on click
          >
            <img
              src={popupContent}
              alt="Exercise"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // Adjust image styles
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Test;
