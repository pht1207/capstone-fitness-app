import React, { useState } from "react";
import "./BeginnerFitness.css";
import PPLDayComponent from "./PPLDayComponent";
function BeginnerHome(props) {
  return (
    <div className="BeginnerHome">
      
      <div className="LeftColumn">

        <div className="StartingJourney">
          <strong><p>Starting Your Fitness Journey</p></strong>
          <hr/><br/>
          <div className="HomeBoxText">
            <p>As a beginner, it can be difficult to start and choose how to accomplish your fitness goals.</p>
            <p>To assist you, we have provided a simple yet effective routine for you to follow.</p>
            <p>This routine is called the PPL split. It stands for Push, Pull and Legs.</p>
            <p>It will hit all the muscle groups over the coruse of 3 days and can be arranged in many different ways to give you more time to rest, or more time to exercise.</p>
            
          </div>
        </div>

        <div className="PPLDescription">
          <div className="PPLTopDescription">
          <strong><p>The PPL Split</p></strong>
            <hr/><br/>
            <div className="HomeBoxText">
              <p>The split we recommend for you is the PPL split.</p> 
              <p>PPL stands for push, pull, and legs. Each component of PPL covers muscle groups that work together.</p>
              <p></p>
            </div>

          </div>



          <div className="SplitList">
            <div className="SplitContainer">
            <strong><p>Standard Split</p></strong>
            <div className="SplitRow">
              <div className="SplitDescription">
                <strong><p>Workout Days</p></strong>
                <p>[MON: PUSH], [WED: PULL], [FRI: LEGS]</p>
              </div>

              <div className="SplitDescription">
                <strong><p>Rest Days</p></strong>
                <p>[TUE, WED, THU, SAT, SUN]</p>
              </div>
            </div>
            </div>


            <div className="SplitContainer">
            <strong><p>Back-to-Back Split</p></strong>
            <div className="SplitRow">
              <div className="SplitDescription">
              <strong><p>Workout Days</p></strong>
                <p>[MON: PUSH], [TUE: PULL], [WED: LEGS]</p>
              </div>

              <div className="SplitDescription">
              <strong><p>Rest Days</p></strong>
                <p>[TUE, WED, THU, SAT, SUN]</p>
              </div>
            </div>
            </div>


            {/* Possibly remove the advanced split to keep it simple for the user, or replace it with a simpler one */}
            <div className="SplitContainer">
            <strong><p>Advanced Split</p></strong>
            <div className="SplitRow">
                <div className="SplitDescription">
                <strong><p>Workout Days</p></strong>
                  <p>[MON: PUSH], [TUE, PULL] [WED: LEGS], [FRI: PUSH], [SAT: PUSH], [SUN: LEGS]</p>
                </div>

                <div className="SplitDescription">
                <strong><p>Rest Days</p></strong>
                  <p>[THU]</p>
                </div>
              </div>
              </div>
          </div>
        </div>

      </div>




      <div className="Divider"/>


      <div className="RightColumn">

              <PPLDayComponent
              title={"Push Day"}
              description1={"This workout will consist of all muscles that are used to push away from the body."}
              description2={"The primary muscles are the chest, shoulders,and triceps."}
              image1src={"/dumbbell-bench-press.png"}
              image1Header={"Bench Press"}
              image2src={"/dumbbell-bench-press.png"}
              image2Header={"Lateral Raises"}
              image3src={"/dumbbell-bench-press.png"}
              image3Header={"Tricep Pushdowns"}
              />
              <PPLDayComponent
              title={"Pull Day"}
              description1={"This workout will consist of all the muscles that are used to pull towards the body."}
              description2={"The primary muscles are the back, shoulders and the biceps."}
              image1src={"/dumbbell-bench-press.png"}
              image1Header={"Rows"}
              image2src={"/dumbbell-bench-press.png"}
              image2Header={"Lat Pulldowns"}
              image3src={"/dumbbell-bench-press.png"}
              image3Header={"Dumbbell Curls"}

              />
              <PPLDayComponent
              title={"Leg Day"}
              description1={"This workout will consist of all the muscles in the legs."}
              description2={"The primary muscles are the quads, hamstrings, glutes, and calves."}
              image1src={"/dumbbell-bench-press.png"}
              image1Header={"Leg Press"}
              image2src={"/dumbbell-bench-press.png"}
              image2Header={"Calf Raises"}
              image3src={"/dumbbell-bench-press.png"}
              image3Header={"Hip Adductors"}

              />

      </div>


    </div>

  );
}

export default BeginnerHome;
