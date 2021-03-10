import React, { useEffect, useState } from 'react';
import './homepage.css';
import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage, getRealtimeConversations, deleteMessage } from '../../actions';
import { auth } from 'firebase';

const User = (props) => {

  const {user, onClick} = props;

  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img src={user.image? user.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1uO9yM0Gp_F2e2oAGZT5dBwsG8yf-WhG-KWYAJVEgsTSx0VAJHUmEv7pO8u9Y8CsXZNM&usqp=CAU'} alt="" />
      </div>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '25px 40px'}}>
         <span style={{fontWeight: 600}}>{user.firstName} {user.lastName}</span>
         <span style={{fontWeight: 600}}></span>
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

    console.log("user youre chatting with: ",user);  
    console.log("auth user: ",auth);
    
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
                    <div style={{ textAlign: con.user_uid_1 === auth.uid ? 'right' : 'left'}}>
                      <div className="messageContent">
                        <div className = "message">
                          <p className="messageStyle" style={{ 
                              background: con.user_uid_1 === auth.uid ? "#b9defc" : "#59b1fc", textAlign: "center", maxWidth:"500px", position: "relative"
                            }}>{con.message}</p>
                            {con.user_uid_1 === auth.uid ? <input type="image" onClick={deleteMessage(con.id)} className="deleteMessageBtn" src="https://static.thenounproject.com/png/1290073-200.png" alt="" /> : null }
                        </div>
                      </div>
                  </div>)
                  : null
                }
            </div>
            {
              chatStarted ? 
              <div className="chatControls"> 
                <input type="button" value="Send" className="sendMessageBtn" onClick={submitMessage}/>
                <input type="text" 
                  className="sendMessageInput"
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