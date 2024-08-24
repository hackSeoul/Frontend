import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './component/Home/Home.jsx'
import { ImagePreview } from './component/ImagePreview/ImagePreview.jsx'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-preview" element={<ImagePreview />} />
      </Routes>
    </Router>
  )
}

export default App;
