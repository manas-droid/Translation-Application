import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Home from './Home';
import {Routes, Route, Navigate } from 'react-router-dom';
import SavedWords from './user-saved-words/saved.words.component';
import Login from './auth/Login';
import SignUp from './auth/Signup';
import { auth } from './utils/firebase';
import { User } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<(User|null)>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  

  return (
    <>
      <Sidebar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/saved-words' element={user ? <SavedWords/> : <Login/> }/>
        <Route path='/sign-in' element = {authorizedUserRoutes(<Login/>, user)} />
        <Route path='/sign-up' element = {authorizedUserRoutes(<SignUp/>, user)} />
      </Routes>
    </>
  );
}

function authorizedUserRoutes(component:JSX.Element, user:User|null, to:string='/saved-words'):JSX.Element{
  if(user){
    return <Navigate  to={to}/>
  }
  return component;
}


export default App;
