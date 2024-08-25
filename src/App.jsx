import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './component/Home/Home.jsx'
import { ImageCheck } from './component/ImageCheck/ImageCheck.jsx'
import { Cams } from './component/Cams/Cams.jsx'
import { Inform } from './component/inform/Inform.jsx'
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-check" element={<ImageCheck />} />
        <Route path="/cams" element={<Cams />} />
        <Route path="/inform" element={<Inform />} />
      </Routes>
    </Router>
  )
}

export default App;
