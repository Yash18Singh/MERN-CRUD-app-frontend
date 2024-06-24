import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import User from './components/getUser/User';
import Add from './components/addUser/Add';
import Edit from './components/editUser/Edit';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" exact element={<User/>}/>
                <Route path="/add" exact element={<Add/>}/>
                <Route path="/edit/:id" exact element={<Edit/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
