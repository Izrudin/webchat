import React, { useEffect, useState } from 'react';
import './homepage.css';
import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage, getRealtimeConversations, deleteMessage } from '../../actions';

const User = (props) => {

  const {user, onClick} = props;

  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img src="https://www.kxan.com/wp-content/uploads/sites/40/2019/07/MGN_1280x720_80820P00-PDQMR.jpg" alt="" />
      </div>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
         <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
        <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
      </div>
    </div>
  );
}

const HomePage = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;

  useEffect(() => {

    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
    .then(unsubscribe => {
      return unsubscribe;
    })
    .catch(error => {
      console.log(error);
    })
  });

  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then(f => f()).catch(error => console.log(error));
    }
  });

  const initChat = (user) => {

    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid);

    console.log(user);  

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  }

  const submitMessage = () => {

    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message
    }

    if(message !== ""){
      dispatch(updateMessage(msgObj))
      .then(() => {
        setMessage('')
      });
    }
    console.log(msgObj);
  }

  return (
    <Layout>
      <section className="chatCointainer">
        <div className="listOfUsers">
          {
            user.users.length > 0 ?
            user.users.map(user => {
              return (
                <div className="singleUserElement">
                  <User 
                  onClick={initChat}
                  key={user.uid} 
                  user={user} 
                  />
                </div>
              );
            }) : null
          }

        </div>
        <div className="chatArea">
            
            <div className="chatHeader"> 
            {
              chatStarted ? chatUser : ''
            }
            </div>
            <div className="messageSections">
                {
                  chatStarted ? 
                  user.conversations.map(con =>
                    <div style={{ textAlign: con.user_uid_1 === auth.uid ? 'right' : 'left' }}>
                      <div className="message">
                        <p className="messageStyle">{con.message}</p>
                        <input type="button" value="x" onClick={deleteMessage(con.id)}></input>
                      </div>
                  </div>)
                  : null
                }
            </div>
            {
              chatStarted ? 
              <div className="chatControls">
                <input type="button" value="Send" id="sendMessageBtn" onClick={submitMessage}/>
                <input type="text" 
                  id="sendMessageInput"
                  value={message}
                  onKeyPress={(event) => {
                    if(event.key === 'Enter') {
                      submitMessage();
                    }
                  }}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Send a Message"
                />
            </div> : null
            }
        </div>
    </section>
  </Layout>
  );
}

export default HomePage;