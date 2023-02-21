import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ClassificationPage from './ClassificationPage';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate('/login', { replace: true });
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/" element={<ClassificationPage />} />
    </Routes>
  );
}

export default App;
