import './ProfilePage.css'
import './EditProfilePage.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpPopupContext } from '../../../components/HttpPopupContext';
import { toInteger } from 'lodash';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';
import EditPassword from './EditPassword';
import WeightGraphFull from './WeightGraphFull';
import BMICalculator from './BMICalculator';


function NewProfilePage() {
  //Used as default case for if no data is retrieved for userData
  const emptyUserData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    height: "",
    weight: "",
    goal: "1",
    DOB: "",
    notificationsOn: false
}
  const [profileView, setProfileView] = useState("view")
  const [contentView, setContentView] = useState("profile")
  const [userData, setData] = useState(emptyUserData);
  const token = localStorage.getItem("jwt")
  const {setResponse} = useContext(HttpPopupContext);

  //Used to get the user's profile data
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const axiosResponse = await axios.get("https://capstone.parkert.dev/backend/getProfileData", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        if(axiosResponse.data[0] !== undefined){
          setData(axiosResponse.data[0]);
        }
        console.log(axiosResponse.data[0])
      }
        catch (error) {
        console.error('Error fetching data: ', error);
        setResponse(error.response) //used in httpopup.js
      }
    };
    fetchData();
  }, []);

  return (
    <div className='ProfileRoot'>
      <div className='Selector'>
        <p onClick={()=>{setContentView("profile")}}>View Profile</p>
        <p onClick={()=>{setContentView("weightgraph")}}>Weight Graph</p>
        <p onClick={()=>{setContentView("bmi")}}>BMI Calculator</p>
      </div>

    <div className='ContentWindow'>
      {contentView === 'profile' &&
      <> 
        {profileView === 'view' && 
          <ViewProfile setProfileView={setProfileView}/>
        }
        {profileView === 'edit' && 
          <EditProfile setProfileView={setProfileView}/>
        }
        {profileView === 'password' && 
          <EditPassword setProfileView={setProfileView}/>
        }
        </>
      }
      {contentView === 'weightgraph' &&
        <WeightGraphFull userData={userData}/>
      }
      {contentView === 'bmi' &&
        <BMICalculator userData={userData}/>
      }

    </div>

    </div>
  );
}

export default NewProfilePage;
