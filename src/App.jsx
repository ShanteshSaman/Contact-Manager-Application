import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContactManager from './ContactManagerApplication/ContactManager'
import Contact from './ContactManagerApplication/Contact'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
 

  return (
    <>
      {/* <h1>Hello</h1> */}
      {/* <ContactManager/> */}
       <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Contact/>
    </>
  )
}

export default App
