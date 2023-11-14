import { useLoaderData } from "react-router-dom";
import { getAllMatchingItems } from "../functions/helpers";
import exerciseDB from "../DB/exercise.json";
import "../css/WorkoutPage.css";
import { useState } from "react";
import JSConfetti from "js-confetti";
import { useEffect } from "react";

// loader
export async function routineLoader({ params }) {
  const routine = await getAllMatchingItems({
    category: "workouts",
    key: "id",
    value: params.id,
  })[0];

  if (!routine) {
    throw new Error("Budget you're trying to find doesn't exist");
  }
  return { routine };
}

const WorkoutPage = () => {
  const { routine } = useLoaderData();
  const [selectedCard, setSelectedCards] = useState([]);
  const loadExercise = () => {
    const data = routine.exercise.split(",").map(Number);
    const exercises = exerciseDB["Chest Exercises"].concat(
      exerciseDB["Shoulder Exercises"],
      exerciseDB["Bicep Exercises"],
      exerciseDB["Triceps Exercises"],
      exerciseDB["Leg Exercises"],
      exerciseDB["Back Exercises"],
      exerciseDB["Glute Exercises"],
      exerciseDB["Ab Exercises"],
      exerciseDB["Cardio Exercises"]
    );

    const selectedExercises = data.map((index) => exercises[index]);
    console.log(selectedExercises);

    return selectedExercises; // Return the selected exercises
  };
  const jsConfetti = new JSConfetti();

  const selectedExercises = loadExercise();

  useEffect(() => {
    if (
      selectedCard.length === selectedExercises.length &&
      selectedCard.length > 0
    ) {
      jsConfetti.addConfetti({
        emojis: ["💪", "🏋️‍♂️", "💯"],
      });
    }
  }, [selectedCard]);
  const handleCardClick = (index) => {
    // Check if the card is already selected
    if (selectedCard.includes(index)) {
      // If selected, remove it from the array
      setSelectedCards(selectedCard.filter((cardIndex) => cardIndex !== index));
    } else {
      // If not selected, add it to the array
      setSelectedCards([...selectedCard, index]);
    }
  };
  return (
    <div>
      <h1>{routine.name}</h1>
      <div className="exercise-container">
        {selectedExercises.map((exercise, index) => (
          <div
            className={`card ${selectedCard.includes(index) ? "selected" : ""}`}
            key={index}
            onClick={() => handleCardClick(index)}
          >
            <h2>{exercise.name}</h2>
            <img src={exercise.link} alt={exercise.name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
