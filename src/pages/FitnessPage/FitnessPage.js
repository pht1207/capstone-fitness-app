import "./FitnessPage.css";

function FitnessPage() {
  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getExercises
  //https://capstone.parkert.dev/backend/createExercises
  //https://capstone.parkert.dev/backend/getWorkouts
  //https://capstone.parkert.dev/backend/createWorkouts

  return (
    <div className="FitnessPage">
      <div class="Banner">
        <div class="mworkout">
          <h1>My Workout</h1>
        </div>
        <div class="recommend">
          <h1>Recommended</h1>
        </div>
        <div class="workoutl">
          <h1>Workout Log</h1>
          <table id="workoutTable">
            <thead>
              <tr>
                <th>Workout</th>
                <th>Time</th>
                <th>Date</th>
                <th>Rating</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FitnessPage;
