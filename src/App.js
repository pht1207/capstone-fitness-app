import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import FitnessPage from './pages/FitnessPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NutritionPage from './pages/NutritionPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

//test commit message




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
