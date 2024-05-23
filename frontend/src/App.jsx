import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import DefaultLayOut from './layout/default/DefaultLayOut';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import NewQuestion from './pages/newQuestion/NewQuestion';
import Question from './pages/question/Question';
import PrivateRoute from './HOC/PrivateRoute';
import NotFound from './components/NotFound';

function App() {
   return (
      <Router>
         <Routes>
            <Route
               path="/"
               element={
                  <PrivateRoute>
                     <DefaultLayOut />
                  </PrivateRoute>
               }
            >
               <Route path="/" element={<Home />} index></Route>
               <Route path="/user" element={<User />}></Route>
               <Route path="/new-user" element={<NewUser />}></Route>
               <Route path="/question" element={<Question />}></Route>
               <Route path="/new-question" element={<NewQuestion />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />}></Route>
         </Routes>
      </Router>
   );
}

export default App;
