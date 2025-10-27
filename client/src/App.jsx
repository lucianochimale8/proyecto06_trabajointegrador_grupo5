import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './pages/Layout';

import Proyects from './pages/Proyects';
import Home from './pages/Home';

function App() {

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Layout/>} >
            <Route path='/home' element={<Home />}/>
            <Route path="/proyects" element={<Proyects />} />
          </Route>
        </Routes>
      
    </>
  )
};

export default App;
