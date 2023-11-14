import React from "react";
import { useFetcher } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/WorkoutItem.css";
import exerciseDB from "../DB/exercise.json";

const WorkoutItem = ({ workout }) => {
  const { name, descriptions, exercise } = workout;
  const fetcher = useFetcher();
  const data = workout.exercise.split(",").map(Number);
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

  return (
    <div className="workout-card">
      <div className="workout-info">
        <Link to={`/gym_move/workout/${workout.id}`} className="workout-name">
          {workout.name}
        </Link>
        <fetcher.Form method="post" className="delete-form">
          <input type="hidden" name="_action" value="deleteRoutine" />
          <input type="hidden" name="routineId" value={workout.id} />
          <button type="submit" className="delete-button">
            {`Delete ${workout.name}`}
          </button>
        </fetcher.Form>
      </div>
      <p className="workout-description">{descriptions}</p>
      <ul className="exercise-list">
        {selectedExercises.slice(0, 5).map((exercise, index) => (
          <li key={index} className="exercise-name">
            {exercise.name}
          </li>
        ))}
        {selectedExercises.length > 5 && (
          <li className="exercise-name">More...</li>
        )}
      </ul>
    </div>
  );
};

export default WorkoutItem;
