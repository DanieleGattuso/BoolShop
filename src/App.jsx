// Import manage route from module react-router

import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import default layout

import DefaultLayout from './layout/DefaultLayout'


// Import pages
import HomePage from "./pages/HomePage"

// Import wine page
import Winespage from "./pages/WinePage"






export default function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/winespage" element={<Winespage />} />




          </Route>

        </Routes>


      </BrowserRouter >
    </>
  )
}


