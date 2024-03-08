import './NutritionPage.css'

function NutritionPage() {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getFoods
  //https://capstone.parkert.dev/backend/getFoods/getNutrition?dateAccessed=2024-02-20 {change date to whatever you need it to be}
  //https://capstone.parkert.dev/backend/getFoods/logNutrition {log via json post}



  return (
    <fieldset>
      <form>

        <div className="FitnessPage">
          <h1>This is the nutrition page</h1>
          <h1>Nutrition</h1>
          <p>
            <input type="date" id="start" name="todaysdate" value="2024-02-20" />
          </p>

          <div className="macroNutrient">
            <h4>Your Goal GOAL TYPE Calories Needed GOAL CALORIES</h4>
            <lb></lb>
            <h4>LOG NUTRITION</h4>
            <lb></lb>
            <h4>Latest weight, DATE, Weight lbs Goal Weight: GOAL lbs</h4>
          </div>

          <div className="macroContainer">
            <div className="macroNutrientStatBox">
              <h3>Carbs</h3>
              <p>Goal <input type='text' /></p>
              <p>Remaining #</p>
            </div>

            <div className="macroNutrientStatBox">
              <h3>Protein</h3>
              <p>Goal <input type='text' /></p>
              <p>Remaining #</p>
            </div>

            <div className="macroNutrientStatBox">
              <h3>Fats</h3>
              <p>Goal <input type='text' /></p>
              <p>Remaining #</p>
            </div>
          </div>
        </div>
      </form>
    </fieldset>
  );
}

export default NutritionPage;
