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



room_name = localStorage.getItem("room_name")
user_name = localStorage.getItem("user_name")
document.getElementById("room_name_label").innerHTML = "Room Name: " + room_name

function sendMessage()
{
     msg = document.getElementById("msg").value
     firebase.database().ref(room_name).push({
           name: user_name,
           message: msg,
           likes: 0,
           dislikes: 0
     })
     document.getElementById("msg").innerHTML = ""
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        console.log(firebase_message_id)
        console.log(message_data)
        id = message_data ['name']
        message = message_data['message']
        likes = message_data['likes']
        dislikes = message_data['dislikes']
        
        name_with_tag = id + ": " + "<img src = 'tick.png' class = 'user_tick'>"
        message_with_tag =" <br>" +  message +  "</br>"
        like_button = "<button class='but btn-success' id = "  + firebase_message_id+" onclick = 'updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ likes +"</span></button>"
        dislike_button = "<button class='but btn-success' id = "  + firebase_message_id +" onclick = 'updateDislike(this.id)'>";
        span_also_with_tag = "<span class='glyphicon glyphicon-thumbs-down'>Dislike: "+ dislikes +"</span></button> <BR>"
        row = name_with_tag+message_with_tag+like_button+span_with_tag+dislike_button+span_also_with_tag
        document.getElementById("output").innerHTML += row
         }
    });
  });
}

getData();

function updateLike(message_id)
{
      button_id = message_id
      like = document.getElementById(button_id).value
      updatedLikes = Number(like) + 1
      firebase.database().ref(room_name).child(message_id).update({
             likes: updatedLikes });
}

function updateDislike(message_msg)
{
      button_msg = message_msg
      dislike = document.getElementById(button_msg).value
      updatedDislikes = Number(dislike) + 1
      firebase.database().ref(room_name).child(message_msg).update({
             dislikes: updatedDislikes });
}

function logout() {
    localStorage.removeItem("user_name")
    localStorage.removeItem("room_name")
    window.location = "index.html"
  }