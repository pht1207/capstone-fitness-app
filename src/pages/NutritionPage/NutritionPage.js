import './NutritionPage.css'

function NutritionPage() {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)
  //Inserted by parker: https://capstone.parkert.dev/backend/getFoods
  //https://capstone.parkert.dev/backend/getFoods/getNutrition?dateAccessed=2024-02-20 {change date to whatever you need it to be}
  //https://capstone.parkert.dev/backend/getFoods/logNutrition {log via json post}



  return (
    <div className="FitnessPage">
        <h1>This is the nutrition page</h1>
        <h1>Nutrition</h1>
    <p>
        <input type="date" id="start" name="todaysdate" value="2024-02-20"/>
    </p>

<div class="container">
    <div class="a">Your Goal GOAL TYPE Calories Needed GOAL CALORIES</div>

    <div class="b">LOG NUTRITION</div>

    <div class="c">Latest weight, DATE, Weight lbs Goal Weight: GOAL lbs</div>

    <div class="d">Protein </div>

    <div class="e">Carbs</div>

    <div class="f">Fat</div>

    <div class="g">Goal # Remaining # </div>

    <div class="h">Goal # Remaining # </div>

    <div class="i">Goal # Remaining # </div>
    </div>

    </div>
  );
}

export default NutritionPage;
