import './HomePage.css'

function HomePage() {

  //Your code to make the site functional goes in this empty space. The 'return()' below is what renders on the page (the html)




  return (
    <div className="HomePage">
        <div class="hp_img">
          <h1 id="welcome_msg"><u>Welcome</u></h1>
          <img id="homepage_img" src={require('./background.png')} alt="Man resting after exercise"></img>
        </div>
        <div class="weight_graph">
          <h4>Weight Graph</h4>
          <hr/>
        </div>
        <div class="tips">
          <h4>Tips</h4>
          <hr/>
        </div>
        <div class="workout_log">
          <h4>Workout Log</h4>
          <hr/>
        </div>
    </div>
  );
}

export default HomePage;
