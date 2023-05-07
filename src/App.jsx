import React from 'react';
import UploadPage from './components/UploadPage';
import ListPage from './components/ListPage';
import Upload from './assets/images/upload.png';
import List from './assets/images/list.png';

function App() {
    return (
      <div className="min-h-screen w-full">
    		<UploadPage/>
    		<ListPage/>
      </div>
    );
  }

export default App;
