import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

const UserProfile = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const [savedUser, setSavedUser] = useState(null);
    const [isChangingPassword, setIsChangingPassword] = useState(false); // Hozzáfűztük a jelszóváltoztatás állapotot

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
          setSavedUser(userData);
        }
      }, []);

      const handleSaveEdit = async (editedUser) => {
        try {
          const response = await axios.put(`http://localhost:3500/updateUser/${user.username}`, editedUser);
    
          if (response.status === 200) {
            setSavedUser(editedUser); // Frissítjük a felhasználó adatait a mentett változatban
          } else {
            console.error('An error occurred while updating user data.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    
      const handleChangePasswordClick = () => {
        setIsChangingPassword(true);
      };
    
      // A jelszóváltoztatás visszavonása
      const handleCancelChangePassword = () => {
        setIsChangingPassword(false);
      };

  return (
    <div className='userprofile-container'>
        {isChangingPassword ? (
            <ChangePassword user={savedUser || user} onSave={handleSaveEdit} onCancel={handleCancelChangePassword} />
        ) : (
            <Fragment>
            {savedUser || user ? (
                <div>
                    <h1>Profil</h1>
                    <table>
                        <tr>
                            <p>Felhasználónév:</p>
                        <td>
                            <p>{savedUser ? savedUser.username : user.username}</p>
                        </td>
                        </tr>
                        <tr>
                            <p>Név:</p>
                        <td>
                            <p>{savedUser ? savedUser.FirstName + " " + savedUser.SecondName : user.FirstName + " " +user.SecondName}</p>
                        </td>
                        
                        </tr>
                        <tr>
                            <p>Email:</p>
                        <td>
                            <p>{savedUser ? savedUser.email : user.email}</p>
                        </td>
                        </tr>
                        <tr>
                            <p>Mobil:</p>
                        <td>
                            <p>{savedUser ? savedUser.mobile : user.mobile}</p>
                        </td>
                        </tr>
                        <tr>
                        <p>Születésnap:</p>
                        <td>
                            <p>
                            {savedUser ? savedUser.birthdate : user.birthdate}
                            </p>
                        </td>
                        </tr>
                    </table>
                    <button onClick={handleChangePasswordClick}>Jelszó megváltoztatása</button>
                </div>):(
                    <p>Nem vagy bejelentkezve.</p>
                )}
            </Fragment>
        )}
    </div>
  )
}

export default UserProfile