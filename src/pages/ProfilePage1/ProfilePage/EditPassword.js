import './EditPassword.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpPopupContext } from '../../../components/HttpPopupContext';

function EditPassword(props) {

  const token = localStorage.getItem("jwt")
  const {setResponse} = useContext(HttpPopupContext);

  const [password, setPassword] = useState("");


  async function updateProfileFormSubmit(event){
    event.preventDefault();//This prevents the page from reloading right when you submit

      try{
        let body = {  
          password: password
        }
        const axiosResponse = await axios.post("https://capstone.parkert.dev/backend/updatePassword", body, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setResponse(axiosResponse) //used in httpopup.js
        props.setProfileView("view")
      }
      catch(error){
        console.error("post error: ", error.response)
      }
  }



//fuction to hide or show password when show is clicked, using useState to trigger a re-render that allows seeing the new data
//changes current state value(true) according to previous state

const [passwordShow, setpasswordShow] = useState(true)
function passwordShowClickled(){
  setpasswordShow(!passwordShow);
}



  return (
    <div className="EditPassword">
      <h1>Change Password</h1>
        <div className='EditPasswordRow'><p>Password:</p><input type={passwordShow?('password'):('text')} name='password' onChange={(event)=>{setPassword(event.target.value)}}/><button type='button' onClick={passwordShowClickled}>show</button></div>
        <div className='ButtonContainerForProfileView'>
            <button className="button2" type='submit' onClick={updateProfileFormSubmit}>Save</button>
            <button className="button3" type='button' onClick={()=>{props.setProfileView("view")}}>Cancel</button>
      </div>
    </div>
  );
  
}

export default EditPassword;
