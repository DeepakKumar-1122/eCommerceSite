import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { logout } from './slices/authSlice';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export const URL = process.env.FRONTEND_URL || "http://localhost:5000";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet/>
      </Container>
      <Footer />
    </>
  );
};

export default App;
