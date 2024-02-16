import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import FitnessPage from './pages/FitnessPage/FitnessPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginRegistrationPage/LoginPage';
import RegisterPage from './pages/LoginRegistrationPage/RegisterPage';

import NutritionPage from './pages/NutritionPage/NutritionPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';


function App() {
  return (
    <div className="App">
      {/*Below this text is the navigation bar. The default is the 'home page'. This page shouldn't need to be editted except to change the navigation bar. Change the 'fitnesspage.js', the 'homepage.js', etc. to change each page. */}
      <Router>
            <nav className="NavigationFlexBox">
                <h1>Logo</h1>
                <Link to="/">HomePage</Link>
                <Link to="/FitnessPage">FitnessPage</Link>
                <Link to="/NutritionPage">NutritionPage</Link>
                <Link to="/ProfilePage">ProfilePage</Link>
                {/* Use state to make login button change to username and profile picture if user is logged in */}
                <Link to="/LoginPage">LoginPage</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/FitnessPage" element={<FitnessPage />} />
                <Route path="/NutritionPage" element={<NutritionPage />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/LoginPage" element={<LoginPage />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
