import firebase from "../firebase_config/firebaseConfig";

function SocialMediaAuth(provider) {

    return (
        firebase.auth().signInWithPopup(provider).then((res) => {
            return res;
        }).catch((er) => {
            alert(er);
            return er;
        })
    )
}

export default SocialMediaAuth;
