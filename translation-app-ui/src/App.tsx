import React from 'react';
import Sidebar from './Sidebar';
import Home from './Home';
import {Routes, Route } from 'react-router-dom';
import SavedWords from './user-saved-words/saved.words.component';

const App: React.FC = () => {
  return (
    <>
      <Sidebar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/saved-words' element={<SavedWords/>}/>
      </Routes>
    </>
  );
}

export default App;
