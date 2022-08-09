var config_2 = { 
    apiKey: "AIzaSyAVHvAgxudBPJ-mu3uE-oiISXnUlmVcLU8",
    authDomain: "bolumangal-2.firebaseapp.com",
    databaseURL: "https://bolumangal-2-default-rtdb.firebaseio.com",
    projectId: "bolumangal-2",
    storageBucket: "bolumangal-2.appspot.com",
    messagingSenderId: "745747594928",
    appId: "1:745747594928:web:8453afe68b1bd49d55c575"
};

var sube_2 = firebase.initializeApp(config_2,"sube_2")
var db = sube_2.database();
var re = sube_2.database().ref();

function update_2(veri){
    var to_save_2 = sube_2.database().ref();
    to_save_2.set(veri, function () {
        console.log("sube2 dones")
    })
}

function remove_2(veri){
    var re = sube_2.database().ref();
    re.set(veri, function () {
        console.log("silindi")
    })
}