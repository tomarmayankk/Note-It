import './App.css';
import Textedit from './pages/Textedit';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to a new document with a UUID */}
        <Route
          path="/"
          element={<Navigate to={`/document/${uuidV4()}`} />}
        />

        {/* Render the Textedit page for a specific document */}
        <Route
          path="/document/:id"
          element={
            <div className="flex bg-gray-50">
              <Textedit />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
