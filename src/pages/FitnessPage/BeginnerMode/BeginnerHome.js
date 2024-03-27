import React, { useState } from "react";
import "./BeginnerFitness.css";
function BeginnerHome() {
  return (
    <div className="BeginnerHome">
      <h1>Starting Your Fitness Journey</h1>
      <p>
        As a beginner, it may be difficult to know what exactly needs to be done
        to accomplish your fitness goals. To eliminate the need for you to
        figure everything yourself, we have provided a simple yet effective
        routine for you to follow. It will hit all the muscle groups in a span
        of 3 days and can be arranged to give you time to rest between workouts.
      </p>

      <h2>The PPL Split</h2>
      <p>
        The split we recommend for you is the PPL split. PPL stands for push,
        pull, legs. Each component of PPL covers muscle groups that work
        together.
      </p>

      <h3>PUSH Day</h3>
      <p>
        This workout will consist of all muscles that are used to push away from
        the body. The primary muscles are the chest, shoulder (front and lateral),
        and triceps.
      </p>

      <h3>PULL Day</h3>
      <p>
        This workout will consist of all the muscles that are used to pull
        towards the body. The primary muscles are the back, rear deltoids
        (shoulder), and the biceps.
      </p>

      <h3>LEG Day</h3>
      <p>
        This workout will consist of all the muscles in the legs. The primary
        muscles are the quads, hamstrings, glutes, and calves.
      </p>

      <h2>Recommended Splits</h2>
      <h3>1. Standard Split</h3>
      <p>
        Within three days, you will be able to work the body in its entirety.
        It will be important to incorporate rest days to reduce fatigue or burnout.
      </p>
      <p>MON: PUSH, TUE: REST, WED: PULL, THU: REST, FRI: LEGS, SAT: REST, SUN: REST</p>

      <h3>2. Back-to-Back Split</h3>
      <p>
        You will be able to workout back-to-back and rest for 4 days.
      </p>
      <p>MON: PUSH, TUE: PULL, WED: LEGS, THU: REST, FRI: REST, SAT: REST, SUN: REST</p>

      <h3>3. Advanced Split</h3>
      <p>
        This is a more difficult approach to the workout, hitting muscles twice
        a week which is ideal for muscle growth.
      </p>
      <p>MON: PUSH, TUE: PULL, WED: LOWER, THU: REST, FRI: PUSH, SAT: PULL, SUN: LEGS, ...</p>
    </div>

  );
}

export default BeginnerHome;
