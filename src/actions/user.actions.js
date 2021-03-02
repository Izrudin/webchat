import { userConstants } from "./constants";
import { firestore } from 'firebase';

export const getRealtimeUsers = (uid) => {

    //console.log('uid', uid)

    return async (dispatch) => {

        dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

        const db = firestore();
        const unsubscribe = db.collection("users")
        //.where("uid", "!=", uid)
        .onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function(doc) {
                if(doc.data().uid !== uid){
                    users.push(doc.data());
                }
            });
            //console.log(users);

            dispatch({ 
                type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                payload: { users }
            });
        });
        return unsubscribe;
    }
}

export const updateMessage = (msgObj) => {
    return async dispatch => {
        
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

export const deleteMessage = (conversationid) => {

    return async() => {
        const db = firestore();
        db.collection('conversations')
        .doc(conversationid)
        .delete()
        .then((data)=>{
            console.log('Message deleted successfully! Conv ID: ', data)
        }).catch((error)=>{
            console.error("Error deleting the message. Log: ", error)
        })
    }
}