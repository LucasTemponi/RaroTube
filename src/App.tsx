import React from 'react';
import './App.css';
import { VideoList } from './components/VideoList/VideoList';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div  className='flex flex-row'>
          <VideoList vertical={false}/>
        </div>
      </header>
    </div>
  );
}

export default App;
