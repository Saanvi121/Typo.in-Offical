user_name = localStorage.getItem("user_name")
  document.getElementById("username").innerHTML = "Welcome " + user_name + "!"

var firebaseConfig = {
  apiKey: "AIzaSyAzYH_oXIHSyADZqKwjLAMKHEfKMSnSf4Q",
  authDomain: "connectbook-e63d8.firebaseapp.com",
  databaseURL: "https://connectbook-e63d8-default-rtdb.firebaseio.com",
  projectId: "connectbook-e63d8",
  storageBucket: "connectbook-e63d8.appspot.com",
  messagingSenderId: "869959528124",
  appId: "1:869959528124:web:e076a2ee2ad57afd692ab9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function addRoom()
{
  room_name = document.getElementById("roomName").value
  firebase.database().ref("/").child(room_name).update({purpose:"adding room", name:"typo.in"})
  user_name = localStorage.getItem("user_name")
  document.getElementById("username").innerHTML = "Welcome " + user_name + "!"
  document.getElementById("roomName").innerHTML = ""
}
function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
  
      console.log("Room Name - " + Room_names);
       row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
        document.getElementById("output").innerHTML += row;
    });
  });

}
getData();

function redirectToRoomName(roomname)
{
  localStorage.setItem("room_name", roomname)

      window.location = "typo_page.html"
}

function logout() {
  localStorage.removeItem("user_name")
  localStorage.removeItem("room_name")
  window.location = "index.html"
}