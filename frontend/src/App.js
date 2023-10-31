import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import PostFeed from './pages/PostFeed';
import Messages from './pages/Messages';
function App() {
  return (
    <> 
    <Router>
      <div className = 'container'>
        <Header/>
        <Routes>
          <Route path = '/' element = {<Dashboard/>}></Route>
          <Route path = '/login' element = {<Login/>}></Route>
          <Route path = '/register' element = {<Register/>}></Route>
          <Route path = '/post' element = {<PostFeed/>}> </Route>
          <Route path = '/message' element = {<Messages/>}></Route>
        </Routes>
      </div>
    </Router>
    <ToastContainer/>
    </>
    
  );
}

export default App;
