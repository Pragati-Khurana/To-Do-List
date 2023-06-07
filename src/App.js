import React from 'react'
import MainPage from './Components/MainPage'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import {Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/main' element={<MainPage />} />
    </Routes>
  )
}

export default App
