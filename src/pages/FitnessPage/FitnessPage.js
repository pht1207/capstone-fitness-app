import "./FitnessPage.css";
import WorkoutComponent from "./WorkoutComponent";

function FitnessPage() {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getExercises?muscleGroup=biceps
  //https://capstone.parkert.dev/backend/createExercises
  //https://capstone.parkert.dev/backend/getWorkouts
  //https://capstone.parkert.dev/backend/createWorkouts

  return (
    <div className= "FitnessPage"> {/*This div will contain every component for the fitness page. */}

      <div className= "Banner"> {/* Used to hold and seperate the 3 sections of the page. */}

        <div className= "mworkout"> {/* User made or templates will fall in this section */}

          <h1>My Workouts</h1>
          <h2>Workout</h2>
          <WorkoutComponent /> {/* The wokrout prop will pass through to this section */}

        </div>
      

      <div className="recommend"> {/* Recommended workouts will go here */}
        <h1>Recommended</h1>
      </div>

      <div className="workoutl"> {/* The workout log will track certain info from the user's workout */}
        <h1>Workout Log</h1>
        <div class="workout-log"></div>
      </div>
      
      </div>
    </div>
  );
}

export default FitnessPage;
