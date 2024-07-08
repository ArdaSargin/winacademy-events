import React from 'react';
import { Route, Routes } from 'react-router-dom';

// All pages & components
import EventsPage from './components/EventsPage';
import EventPage from './pages/EventPage';

function App() {
  return (
      <Routes>
       <Route path='/' element={<EventsPage />}></Route>
       <Route path='/event/:id' element={<EventPage />}></Route>
      </Routes>
  )
}

export default App;
