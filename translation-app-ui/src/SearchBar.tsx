import React, { useState } from 'react';
import {getWordTranslationInfo} from '../api/linguee-api'
const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Add your search functionality here
    console.log('Searching for:', searchQuery);
    const data = await getWordTranslationInfo(searchQuery);
    console.log(data[0].translations)
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-lg flex">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
          className="w-full py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
