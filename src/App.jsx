import { useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components';


function App() {

  return (
    <div className=' w-full block'>

        <ToastContainer />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
  )
}

export default App
