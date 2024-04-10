import './ProfilePage.css'
import './EditProfilePage.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpPopupContext } from '../../components/HttpPopupContext';
import { toInteger } from 'lodash';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';
import EditPassword from './EditPassword';

function ProfilePage() {
  const [profileView, setProfileView] = useState("view")


  return (
    <div className='ProfileRoot'>
    {profileView === 'view' && 
      <ViewProfile setProfileView={setProfileView}/>
    }
    {profileView === 'edit' && 
      <EditProfile setProfileView={setProfileView}/>
    }
    {profileView === 'password' && 
      <EditPassword setProfileView={setProfileView}/>
    }
    </div>
  );
}

export default ProfilePage;
