// library
import { toast } from "react-toastify";
// rrd imports
import { useLoaderData } from "react-router-dom";
import React from "react";
//  helper functions
import { createRoutine, deleteItem, fetchData } from "../functions/helpers.js";
import Intro from "../components/Intro.jsx";
import AddWorkoutForm from "../components/AddWorkoutForm.jsx";
import WorkoutItem from "../components/WorkoutItem.jsx";
import Test from "../components/Test.jsx";
import TestFormat from "../components/TestFormat.jsx";
//css
import "../css/WorkoutItem.css";
import "../css/Dashboard.css";
// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const workouts = fetchData("workouts");
  return { userName, workouts };
}

// action
export async function dashboardAction({ request }) {
  // all the request data from  form
  const data = await request.formData();

  // but it might differ by which form so user _action per form
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "newUser") {
    // get the username from local storage
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("there was a problem creating your account.");
    }
  }

  if (_action === "newWorkout") {
    // get the username from local storage
    try {
      createRoutine({
        name: values.routine_name,
        descriptions: values.descriptions,
        exercise: values.exercise,
      });
      return toast.success(`New Routine ${values.routine_name} created!`);
    } catch (error) {
      throw new Error("there was a problem creating your routine.");
    }
  }
  if (_action === "deleteRoutine") {
    // get the username from local storage
    try {
      deleteItem({
        key: "workouts",
        id: values.routineId,
      });
      return toast.success(`Routine Deleted!`);
    } catch (error) {
      throw new Error("there was a problem deleting your routine.");
    }
  }

  return null;
}

const Dashboard = () => {
  const { userName, workouts } = useLoaderData();

  return (
    <>
      {userName ? (
        <div>
          <h1 className="dashboard-heading">Welcome, {userName}</h1>

          {/* <TestFormat /> */}
          <div>
            <Test workouts={workouts} />
            {workouts && workouts.length > 0 ? (
              <div className="workout-cards-container">
                {workouts.map((workout) => (
                  <React.Fragment key={workout.id}>
                    <WorkoutItem workout={workout} />
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div>
                <h3>No workout added yet</h3>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
