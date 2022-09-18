const firebaseConfig = {

    apiKey: "AIzaSyBmGXPXiSs98zbFU_H5qWR621KjsTr7z-Y",

    authDomain: "kaccounts-1e9fd.firebaseapp.com",

    databaseURL: "https://kaccounts-1e9fd-default-rtdb.firebaseio.com",

    projectId: "kaccounts-1e9fd",

    storageBucket: "kaccounts-1e9fd.appspot.com",

    messagingSenderId: "983353111158",

    appId: "1:983353111158:web:bc2e34aab3f06e219c2557"

  }; 

firebase.initializeApp(firebaseConfig);

var CONTANTFORMDB = firebase.database().ref(singinform);

document.GetElementById('singinform).AddEventListener("submit", SubmitForm);

function SubmitForm(e)  {
    e.PreventDefault();
    
    var name = GetElementVal('name');
    var emailid = GetElementVal('emailid'); 
    var passworld = GetElementVal('passworld'); 
    
    
} 

const Savemessages(name, Emailid, passworld) => {
    var newsinginform = singinformDB.push();
    
    Newsinginform.set({
        
        name: name, 
        Emailid: emailid, 
        Passworld: passworld, 

});    
   } 

const getelementval = (id) => {
    return document.GetElementById(id).value;
} 
