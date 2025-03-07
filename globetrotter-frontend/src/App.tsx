import { Route, Routes } from 'react-router-dom'
import './App.css'
import Quiz from './components/Quiz'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Quiz />} />
      </Routes>
    </div>
  )
}

export default App
