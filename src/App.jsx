import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './component/Home/Home.jsx'
import { ImagePreview } from './component/ImagePreview/ImagePreview.jsx'
import { ImageCheck } from './component/ImageCheck/ImageCheck.jsx'
import { Cams } from './component/Cams/Cams.jsx'
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-preview" element={<ImagePreview />} />
        <Route path="/image-check" element={<ImageCheck />} />
        <Route path="/cams" element={<Cams />} />
      </Routes>
    </Router>
  )
}

export default App;
