import React, { useEffect, useState, useContext } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, RadarChart } from 'recharts';
import axios from 'axios';
import {HttpPopupContext} from '../../../components/HttpPopupContext';
import './RadarChart.css'
import { PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

function RadarChartViewer(props) {

  const [axiosData, setAxiosData] = useState([]);
  const {setResponse} = useContext(HttpPopupContext);

  const [muscleGroupData, setMuscleGroupData] = useState([]);

  //This useEffect gets the user's exercise entire log object and stores it to be used in the radarchart component
  useEffect(()=>{
    async function getUserExerciseLog(){
      try{
        const axiosResponse = await axios.get("https://capstone.parkert.dev/backend/getUserExerciseLog", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        });
        await setAxiosData(axiosResponse.data);
        muscleGroupMaker(axiosResponse.data)
      }
      catch(error){
        console.error("error: ", error.response)
        setResponse(error.response)
      }
    }
    //creates an object that can be utilized by the radar chart component
    function muscleGroupMaker(array){
        let muscleGroupsObject = {
            chest:0,
            shoulders:0,
            arms:0,
            back:0,
            legs:0,
        }
        for(let i = 0; i < array.length; i++){
            if(array[i].muscleGroup === "Upper Chest"){
                muscleGroupsObject.chest++;
            }
            else if(array[i].muscleGroup === "Lower Chest"){
                muscleGroupsObject.chest++;
            }
            else if(array[i].muscleGroup === "Overall Chest"){
                muscleGroupsObject.chest++;
            }
            else if(array[i].muscleGroup === "Front Delt"){
                muscleGroupsObject.shoulders++;
            }
            else if(array[i].muscleGroup === "Lateral Delt"){
                muscleGroupsObject.shoulders++;
            }
            else if(array[i].muscleGroup === "Rear Delt"){
                muscleGroupsObject.shoulders++;
            }
            else if(array[i].muscleGroup === "Lats"){
                muscleGroupsObject.back++;
            }
            else if(array[i].muscleGroup === "Upper Back"){
                muscleGroupsObject.back++;
            }
            else if(array[i].muscleGroup === "Lower Back"){
                muscleGroupsObject.back++;
            }
            else if(array[i].muscleGroup === "Bicep"){
                muscleGroupsObject.arms++;
            }
            else if(array[i].muscleGroup === "Tricep"){
                muscleGroupsObject.arms++;
            }
            else if(array[i].muscleGroup === "Quads"){
                muscleGroupsObject.legs++;
            }
            else if(array[i].muscleGroup === "Hamstrings"){
                muscleGroupsObject.legs++;
            }
            else if(array[i].muscleGroup === "Calfs"){
                muscleGroupsObject.legs++;
            }
            else if(array[i].muscleGroup === "Hips"){
                muscleGroupsObject.legs++;
            }
        }
        const chartData = Object.keys(muscleGroupsObject).map((key) => ({
            muscleGroup:key,
            A: muscleGroupsObject[key],
        }));
        setMuscleGroupData(chartData); //stores the completed object as state
    }
    getUserExerciseLog();
  },[])


  return (
    <div className="RadarChartViewer">
      <h4>Distrbution of exercises performed</h4>
      {axiosData.length > 0 &&
        <ResponsiveContainer width="80%" height="80%">
            <RadarChart data={muscleGroupData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="muscleGroup" />
                <PolarRadiusAxis angle={90} domain={[0, Math.max(...muscleGroupData.map(data => data.A))]} />
                <Radar name="Exercises" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
        </ResponsiveContainer>
    }

  </div>
  );
}

export default RadarChartViewer;
