import React from 'react';
import SearchBar from './SearchBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold text-center mt-5">Search Bar Example</h1>
        <SearchBar />
      </header>
    </div>
  );
}

export default App;
