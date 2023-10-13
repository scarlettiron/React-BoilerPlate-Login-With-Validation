import './App.css';
import Login from './components/forms/Login';
// Normally I try to structure my applications in a way that is
// easily navigated and scalable

// There are two versions of login forms
// Form1 uses state to handle loading and errors, but a form to
// handle inputs
// Form2 uses state to manage loading and errors as well as all 
// inputs

function App() {
  return (
    <div className="App">
      <Login/> 
    </div>
  );
}

export default App;
