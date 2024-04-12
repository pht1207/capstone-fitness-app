import React, { useState } from "react";
import "./BeginnerFitness.css";
import PPLDayComponent from "./PPLDayComponent";
function BeginnerHome(props) {
  return (
    <div className="MainDiv">
      <div className="BeginnerHome">
        <div className="LeftColumn">
          <div className="StartingJourney">
            <strong>
              <p>Starting Your Fitness Journey</p>
            </strong>
            <hr />
            <br />
            <div className="HomeBoxText">
              <p>
                As a beginner, it can be difficult to start and choose how to
                accomplish your fitness goals.
              </p>
              <p>
                To assist you, we have provided a simple yet effective routine
                for you to follow.
              </p>
              <p>
                This routine is called the PPL split. It stands for Push, Pull
                and Legs.
              </p>
              <p>
                It will hit all the muscle groups over the coruse of 3 days and
                can be arranged in many different ways to give you more time to
                rest, or more time to exercise.
              </p>
            </div>
          </div>

          <div className="PPLDescription">
            <div className="PPLTopDescription">
              <strong>
                <p>The PPL Split</p>
              </strong>
              <hr />
              <br />
              <div className="HomeBoxText">
                <p>The split we recommend for you is the PPL split.</p>
                <p>
                  PPL stands for push, pull, and legs. Each component of PPL
                  covers muscle groups that work together.
                </p>
                <p></p>
              </div>
            </div>

            <div className="SplitList">
              <div className="SplitContainer">
                <strong>
                  <p>Standard Split</p>
                </strong>
                <div className="SplitRow">
                  <div className="SplitDescription">
                    <strong>
                      <p>Workout Days</p>
                    </strong>
                    <p>[MON: PUSH], [WED: PULL], [FRI: LEGS]</p>
                  </div>

                  <div className="SplitDescription">
                    <strong>
                      <p>Rest Days</p>
                    </strong>
                    <p>[TUE, WED, THU, SAT, SUN]</p>
                  </div>
                </div>
              </div>

              <div className="SplitContainer">
                <strong>
                  <p>Back-to-Back Split</p>
                </strong>
                <div className="SplitRow">
                  <div className="SplitDescription">
                    <strong>
                      <p>Workout Days</p>
                    </strong>
                    <p>[MON: PUSH], [TUE: PULL], [WED: LEGS]</p>
                  </div>

                  <div className="SplitDescription">
                    <strong>
                      <p>Rest Days</p>
                    </strong>
                    <p>[TUE, WED, THU, SAT, SUN]</p>
                  </div>
                </div>
              </div>

              {/* Possibly remove the advanced split to keep it simple for the user, or replace it with a simpler one */}
              <div className="SplitContainer">
                <strong>
                  <p>Advanced Split</p>
                </strong>
                <div className="SplitRow">
                  <div className="SplitDescription">
                    <strong>
                      <p>Workout Days</p>
                    </strong>
                    <p>
                      [MON: PUSH], [TUE, PULL] [WED: LEGS], [FRI: PUSH], [SAT:
                      PUSH], [SUN: LEGS]
                    </p>
                  </div>

                  <div className="SplitDescription">
                    <strong>
                      <p>Rest Days</p>
                    </strong>
                    <p>[THU]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Divider" />

        <div className="RightColumn">
          <PPLDayComponent
            title={"Push Day"}
            description1={
              "This workout will consist of all muscles that are used to push away from the body."
            }
            description2={
              "The primary muscles are the chest, shoulders, and triceps."
            }
            link1 ={"https://youtu.be/SJs956cQ7Vs?si=D-vJKRnjYBbZK2dM"} // Add your link here
            exercise1Header={"Dumbell Press"}
            link2 ={"https://youtu.be/8urE8Z8AMQ4?si=UFYtX6bLawsuD_Vi"} // Add your link here
            exercise2Header={"Incline Smith Machine Press"}
            link3 ={"https://youtu.be/QLhZkUhWFJs?si=481MvRiTT4EZUpkr"} // Add your link here
            exercise3Header={"Dumbell Shoulder Press"}
            link4 ={"https://youtu.be/8cNUvKQqvAU?si=vCQhBLDWWUBOupEo"}
            exercise4Header={"Dumbbell Lateral Raise"}
            link5 = {"https://youtu.be/nv0D2rslFpY?si=lsRPSb4q-mexepAA"}
            exercise5Header={"Tricep Pushodwn"}
          />
          <PPLDayComponent
            title={"Pull Day"}
            description1={
              "This workout will consist of all the muscles that are used to pull towards the body."
            }
            description2={
              "The primary muscles are the back, shoulders, and the biceps."
            }
            link1={"https://youtu.be/0UBRfiO4zDs?si=JZ7OXLWmbou1fOKX"} // Add your link here
            exercise1Header={"Chest Supported Row"}
            link2={"https://youtu.be/YCKPD4BSD2E?si=qCS2JWLsWEZJLZXO"} // Add your link here
            exercise2Header={"Lat Pulldowns"}
            link3={"https://youtu.be/UCXxvVItLoM?si=WzKi414xYOK3IoVm"} // Add your link here
            exercise3Header={"Neutral Grip Row"}
            link4 ={"https://youtu.be/5YK4bgzXDp0?si=GNWpoSOyJei9HrMf"}
            exercise4Header={"Reverse Pec Dec Fly"}
            link5 = {"https://youtu.be/iixND1P2lik?si=iFr98f9UYECZI8qE"}
            exercise5Header={"Dumbbell Curl"}
          />
          <PPLDayComponent
            title={"Leg Day"}
            description1={
              "This workout will consist of all the muscles in the legs."
            }
            description2={
              "The primary muscles are the quads, hamstrings, glutes, and calves."
            }
            link1={"https://youtu.be/N3awlEyTY98?si=9NEeraEPXshtHA1m"} 
            exercise1Header={"Calf Raises"}
            link2={"https://youtu.be/Orxowest56U?si=C38ibf1dwO0LqBDy"} 
            exercise2Header={"Machine Seated Leg Curl"}
            link3={"https://youtu.be/yZmx_Ac3880?si=FSMEoy4uzdMYwqdw"} 
            exercise3Header={"Leg Press"}
            link4 ={"https://youtu.be/m0FOpMEgero?si=p5zBmOzXp-9_tuhF"}
            exercise4Header={"Leg Extension"}
            link5 = {"https://youtu.be/CjAVezAggkI?si=mjOf10vs0Z7csjqF"}
            exercise5Header={"Hip Adductor Machine"}

          />
        </div>
      </div>

      <button
        className="SwitchModeButton"
        onClick={async () => {
          {
            props.setIsBeginner(false);
          }
        }}
      >
        Switch to advanced mode
      </button>
    </div>
  );
}

export default BeginnerHome;
