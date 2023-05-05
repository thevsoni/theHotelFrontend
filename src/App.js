import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* <Route path='/' exact Component={Landingscreen} /> */}
          {/* <Route path='/home' exact Component={Homescreen} /> */}
          {/* <Route path='/book/:roomid' exact Component={Bookingscreen} /> */}
          {/* <Route path='/book/:roomid/:fromdate/:todate' exact Component={Bookingscreen} />
          <Route path='/register' exact Component={Registerscreen} />
          <Route path='/login' exact Component={Loginscreen} />

          <Route path='/profile' exact Component={Profilescreen} />
          <Route path='/admin' exact Component={Adminscreen} /> */}

          <Route path='/' element={<Landingscreen />} />
          <Route path='/home' element={<Homescreen />} />
          {/* <Route path='/book/:roomid' element={<Bookingscreen/>} /> */}
          <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen />} />
          <Route path='/register' element={<Registerscreen />} />
          <Route path='/login' element={<Loginscreen />} />

          <Route path='/profile' element={<Profilescreen />} />
          <Route path='/admin' element={<Adminscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
