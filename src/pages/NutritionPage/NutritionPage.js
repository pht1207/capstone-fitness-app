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
            <lb></lb>
            <h4>Nutrition Goals</h4>
            <lb></lb>
          </div>

          <div className="macroContainer">
            <div className="macroNutrientStatBox">
              <div className="macroNutrientName">
                <h3>Carbs</h3>
              </div>
              <img src="Carbs.jpeg"></img>
              <p>How much <b>Carbs</b> to take:</p>
            </div>

            <div className="macroNutrientStatBox">
              <div className="macroNutrientName">
                <h3>Protein</h3>
              </div>
              <img src="Protein.jpeg"></img>
              <p>How much <b>Proteins</b> to take:</p>
            </div>

            <div className="macroNutrientStatBox">
              <div className="macroNutrientName">
                <h3>Fats</h3>
              </div>
              <img src="Fats.jpeg"></img>
              <p>How much <b>fats</b> to take:</p>
            </div>
          </div>
        </div>
      </form>
    </fieldset>
  );
}

export default NutritionPage;
