import { Route, Routes } from 'react-router-dom';
import './App.css';
import ClassificationPage from './ClassificationPage';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/" element={<ClassificationPage />} />
    </Routes>
  );
}

export default App;
