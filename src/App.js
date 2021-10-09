import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import Login from './Login';
import './App.css';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout());
      };
    });
  }, []);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <img 
            src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg'
            className='app__logo'
          />
          <div className='app__body'>
          <div className='app__bodyBackground'>
            <Switch>
              <Route exact path='/chats/view'>
                <ChatView />
              </Route>
              <Route exact path='/chats'>
                <Chats />
              </Route>
              <Route exact path='/preview'>
                <Preview />
              </Route>
              <Route exact path='/'>
                <WebcamCapture />
              </Route>
            </Switch>
          </div>
          </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
