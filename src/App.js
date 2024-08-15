import React from 'react';
import Questionnaire from './Questionnaire';

function App() {
  return (
    <div className="App" dir="rtl">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">שאלון תכנון וילה</h1>
      </header>
      <main className="container mx-auto mt-8">
        <Questionnaire />
      </main>
    </div>
  );
}

export default App;