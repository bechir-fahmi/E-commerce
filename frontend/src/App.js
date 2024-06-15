import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWindow from './components/ChatWindow';
import Context from './context';
import SummaryApi from './common';
import './App.css';
import logo from './logo.png';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [chatOpen, setChatOpen] = useState(false); // State for chat window

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    } else {
      toast.error(dataApi.message);
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <Context.Provider value={{
      fetchUserDetails, // user detail fetch 
      cartProductCount, // current user add to cart product count,
      fetchUserAddToCart
    }}>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Header />
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet />
        <button onClick={() => setChatOpen(true)} className="fixed bottom-5 right-5 bg-blue-600 text-white p-2 rounded-lg">
          Open Chat
        </button>
        {chatOpen && <ChatWindow onClose={() => setChatOpen(false)} />}
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;
