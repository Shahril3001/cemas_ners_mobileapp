import firebase from 'firebase';

export class AuthService {
	signUp(email: string, password: string){  // For SIGNUP (dari firebase)
		return firebase.auth().createUserWithEmailAndPassword(email,password);

	}

	signIn(email: string, password: string){
		return firebase.auth().signInWithEmailAndPassword(email,password);
	}

	getActiveUser(){
		return firebase.auth().currentUser.email;
	}

	checkActiveUser(){
		return firebase.auth().currentUser;
	}

	reauthenticate = (currentPassword) => {
	  var user = firebase.auth().currentUser;
	  var cred = firebase.auth.EmailAuthProvider.credential(
	      user.email, currentPassword);
	  return user.reauthenticateWithCredential(cred);
	}

	changePassword = (currentPassword:string, newPassword:string) => {
	  this.reauthenticate(currentPassword).then(() => {
	    var user = firebase.auth().currentUser;
	    user.updatePassword(newPassword).then(() => {
	      console.log("User's password updated!");
	    }).catch((error) => { console.log(error); });
	  }).catch((error) => { console.log(error); });
	};

	changeEmail = (currentPassword:string, newEmail:string) => {
	  this.reauthenticate(currentPassword).then(() => {
	    var user = firebase.auth().currentUser;
	    user.updateEmail(newEmail).then(() => {
	      console.log("Email updated!");
	    }).catch((error) => { console.log(error); });
	  }).catch((error) => { console.log(error); });
	}

	logout(){
		firebase.auth().signOut();
	}
}