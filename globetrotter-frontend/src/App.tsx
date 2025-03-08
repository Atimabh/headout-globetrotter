import { Route, Routes } from 'react-router-dom'
import './App.css'
import Quiz from './components/Quiz'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home'
import Challenge from './components/Quiz/Challenge'

function App() {
  return (
    <div>
      <ToastContainer autoClose={3000} theme="colored" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </div>
  )
}

export default App
