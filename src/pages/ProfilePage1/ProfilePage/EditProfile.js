import './ProfilePage.css'
import './EditProfilePage.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpPopupContext } from '../../../components/HttpPopupContext';
import { toInteger } from 'lodash';

function EditProfile(props) {

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
  const [userData, setData] = useState(emptyUserData);
  const token = localStorage.getItem("jwt")
  const {setResponse} = useContext(HttpPopupContext);

  //Write a state element and setstate method for each input element in your form here
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("1");
  const [DOB, setDOB] = useState("");
  const [notificationsOn, setNotificationsOn] = useState(false);

  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [disablesave, setDisablesave] = useState(false)
  const [cancel, setCancel] = useState(false)


  async function updateProfileFormSubmit(event){
    event.preventDefault();//This prevents the page from reloading right when you submit
    try{
        setDisablesave(true)
        let body = {  
        email: email,
        username: username,
        firstName: firstname,
        lastName: lastname,
        goal:goal,
        DOB: DOB,
        height: (feet*12)+inches,
        notificationsOn: Number(notificationsOn)
        }
        console.log(body)
        const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/updateProfile", body, {
        headers: {
            Authorization: "Bearer " + token
        }
        });
        setResponse(axiosResponse) //used in httpopup.js
        props.setProfileView("view");
    } 
    catch(error){
        console.error("post error: ", error.response)
        setResponse(error.response) //used in httpopup.js
    }
  }


  //This useEffect is used on render to get the profile data from the backend
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
        console.log(axiosResponse)
      }
        catch (error) {
        console.error('Error fetching data: ', error);
        setResponse(error.response) //used in httpopup.js
      }
    };
    fetchData();
  }, []);

  //Used to set the variables inside profile page once userData is changed
  useEffect(()=>{
    setFirstname(userData.firstName);
    setLastname(userData.lastName);
    setUsername(userData.username);
    setEmail(userData.email);
    setHeight(userData.height);
    setWeight(userData.userWeight);
    setGoal(goalNumberSet(userData))
    //setGoal(userData.goalName);
    setDOB(userData.DOB.substring(0,10))
    setNotificationsOn(0);
    setFeet(toInteger(height/12))
    setInches(toInteger(height%12))

    function goalNumberSet(userData){
        if(userData.goalName === "Weight Loss"){
            return("1");
        }
        else if(userData.goalName === "Weight Gain"){
            return("2");
        }
        else{
            return("3");
        }
    }
  },[userData,cancel])
  

//Fuction to change from ProfilePage to UpdateProfile page when edit is clickled,  using useState to trigger a re-render that allows seeing the new data
//changes current state value(true) according to previous state
function notificationsSwitch(){
  setNotificationsOn(!notificationsOn)
}


  return (

        <div className="ProfilePage">
            <form>
            <h1>Update Profile</h1>
                <div className="UserI">
                    <div><p>First Name:</p><input type='text' name='firstName'  defaultValue={firstname} onChange={(event)=>{setFirstname(event.target.value)}}/></div>
                    <div><p>Last Name:</p><input type='text' name='lastName' defaultValue={lastname} onChange={(event)=>{setLastname(event.target.value)}}/></div>
                </div>
        
                <div className="UserI">
                    <div><p>Username:</p><input type='text' name='username' onChange={(event)=>{setUsername(event.target.value)}} defaultValue={username}/></div>
                    <div><p>Email:</p><input type='text' name='email' onChange={(event)=>{setEmail(event.target.value)}} defaultValue={email}/></div>
                </div>
        
                <div className="UserI">
                    <div><p>Date of Birth:</p><input type="date" id='DOB' defaultValue={DOB} onChange={(event)=>{setDOB(event.target.value)}}/></div>
                </div>
        
                <div className="UserI">
                    <div><p>Height:</p><input type='text' name='feet' onChange={(event)=>{setFeet(event.target.value)}} defaultValue={feet}/><label>ft.</label><input type='text' name='inches' onChange={(event)=>{setInches(event.target.value)}} defaultValue={inches}/><label>in.</label></div>
                </div>
                <div className="UserI">
                    <div><p>Weight:</p><input type='text' name='Weight' onChange={(event)=>{setWeight(event.target.value)}} defaultValue={weight}/></div>
                </div>

                <div className="UserI">
                    <div>
                        <p>Goal:</p>
                        <select defaultValue={goal} onChange={(event)=>{setGoal(event.target.value)}}>
                            <option value="1">Weight Loss</option>
                            <option value="2">Weight Gain</option>
                            <option value="3">Health</option>
                        </select>
                    </div>
                </div>
                    <div className="UserI">
                    <div><p>Notifications:<label className="switch" ><input type="checkbox" checked={notificationsOn} onChange={notificationsSwitch} /><span className="slider"></span></label></p></div>
                </div>

                <div className="UserI">
                    <div className='ButtonContainerForProfileView'>
                    <button className="button2" type='submit' onClick={updateProfileFormSubmit}>Save</button>
                    <button className="button3" type='button' onClick={()=>{props.setProfileView("view")}}>Cancel</button></div>
                </div>
            </form>
        </div>
  );
  
}

export default EditProfile;
