import { userConstants } from "./constants";
import firebase, { auth, firestore } from 'firebase';
import { storage } from '../index';

export const getRealtimeUsers = (uid) => {
    return async (dispatch) => {
        dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

        const db = firestore();
        const unsubscribe = db.collection("users")
        .onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function(doc) {
                if(doc.data().uid !== uid){
                    users.push(doc.data());
                }
            });
            dispatch({ 
                type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                payload: { users }
            });
        });
        return unsubscribe;
    }
}

export const updateMessage = (msgObj) => {
    return async()=> {
        
        const db = firestore();
        var conversationObj = db.collection('conversations').doc();

        conversationObj.set({
            ...msgObj,
            isView: false,
            createdAt: new Date(),
            id: conversationObj.id
        })
        .then((data) => {
            console.log(data)   

        })
        .catch(error => {
            console.log(error)
        });
    }
}

export const getRealtimeConversations = (user) => {
    return async dispatch => {

        const db = firestore();
        db.collection('conversations')
        .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot) => {
            const conversations = [];

            querySnapshot.forEach(doc => {
                if(
                    (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                    || 
                    (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                ){
                    conversations.push(doc.data())
                }
            });

            dispatch({
                type: userConstants.GET_REALTIME_MESSAGES,
                payload: { conversations }
            })

            console.log("all messages:",conversations);
        })
    }
}

export const getLastMessage = (reciever, sender) =>{
    return async() =>{
        const db = firestore();
        db.collection('conversations')
        .where('user_uid_1', "in", [reciever, sender])
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot) => {
            const lastMessage = '';

            querySnapshot.forEach(doc=>{
                if(doc.data().user_uid_1 === sender && doc.data().user_uid_2 === reciever){

                }
            })
        })
    }
}

export const deleteMessage = (conversationid) => {

    return async() => {
        const db = firestore();
        db.collection('conversations')
        .doc(conversationid)
        .delete()
        .then(()=>{
            console.log('Message deleted successfully!');
        }).catch(()=>{
            console.error('Error deleting the message.')
        })
    }
}

export const updateConversation = (uid, newMessage) => {
    return async() => {
        const db = firestore();
        db.collection('conversations')
        .doc(uid)
        .update({
            message: newMessage
        })
        .then(()=>{
            console.log('Updated');
        }).catch((error)=>{
            console.log('Couldnt update message. Error: '+error);
        })
    }
}

export const updateUserPassword = (cpass, npass) => {
    return async()=>{
        try{
            var user = auth().currentUser;
            const cred = firebase.auth.EmailAuthProvider.credential(user.email, cpass);
            user.reauthenticateWithCredential(cred)
            .then(()=>{
                var user = firebase.auth().currentUser;
                user.updatePassword(npass)
                .then(()=>{
                    console.log('Password updated!');
                    localStorage.clear();
                    window.location.reload();
                })
                .catch((updatePasswordError)=>{
                    console.log('Couldnt update password. Try again. Error: ', updatePasswordError);
                })
            })
            .catch((userReauthenticationError)=>{
                console.log('Couldnt re-authenticate user. Error: ', userReauthenticationError);
            });
        }   
        catch(error){
            console.log('Wrong password! Error: ', error)
        }
    }
}

export const updateUserEmail = (cpass, email) => {
    return async()=>{
        try{
            var user = auth().currentUser;
            const cred = firebase.auth.EmailAuthProvider.credential(user.email, cpass);
            user.reauthenticateWithCredential(cred)
            .then(()=>{
                user.updateEmail(email)
                .then(()=>{
                    console.log('Email updated to '+email+'.');
                    localStorage.clear();
                    window.location.reload();
                })
                .catch((updateError)=>{
                console.log('Couldnt update email. Error: ', updateError)
                })
            })
            .catch((authenticationerror)=>{
                console.log('Couldnt reauthenticate user. Error: ', authenticationerror)
            })
        }
        catch(error){
            console.log('Wrong password! Error: ', error)
        }
    }
}

export const updateDisplayName = (uid, fname, lname) => {
    return async()=>{
        var user = auth().currentUser;
        var names = [];
        if(fname === ''){
            names = user.displayName.split(" ");
            fname = names[0];
        }
        if(lname === ''){
            names = user.displayName.split(" ");
            lname = names[1]
        }
        user.updateProfile({
            displayName: fname + " " +lname
        })
        .then(()=>{
            const db = firestore();
            db.collection('users')
            .doc(uid)
            .update({
                firstName: fname,
                lastName: lname
            })
            .then(()=>{
                localStorage.clear();
                window.location.href="#";
                 window.location.reload();

            })
            .catch((updateDbError)=>{
                console.log('Couldnt save data to DB. Error: ', updateDbError)
            })
        })
        .catch((updateDisplaynameError)=>{
            console.log('Couldnt update displayname. Error: ', updateDisplaynameError)
        })
    }
}

export const uploadPicture = (uid, file) => {
    return async(dispatch)=>{
        const uploadTask = storage.ref(`images/${uid}/profile`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref(`images/${uid}`)
            .child("profile")
            .getDownloadURL()
            .then(url => {
                var user = auth().currentUser;
                const db = firestore();
                db.collection('users').doc(uid).update({image: url})
                user.image = url;
            })
            .catch((uploadError)=>{
                console.log('Couldnt update database with picture. Error: ', uploadError)
            })
        });
    }
}