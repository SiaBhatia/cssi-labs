let googleUser;
 
window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) { 
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  }); 
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  const noteTag = document.querySelector('#noteTag');
  // 2. Format the data and write it to our database
  let tagList = noteTag.value.toLowerCase().split(",");
  for(let i = 0; i<tagList.length; i++){
    firebase.database().ref(`users/${googleUser.uid}/${tagList[i].trim()}`).push({
    title: noteTitle.value,
    text: noteText.value,
    tag: noteTag.value
     });
  }
  //clear form so we can input new
  noteTitle.value = "";
  noteText.value = "";
  noteTag.value = "";

  
 
}
