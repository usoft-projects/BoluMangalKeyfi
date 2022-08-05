
function init(){
var config = {
    apiKey: "AIzaSyDwzi9ETDKbMTkP4lWkAnd2Di6oMBSmA10",
    authDomain: "bolumangalkeyfi-63388.firebaseapp.com",
    databaseURL: "https://bolumangalkeyfi-63388-default-rtdb.firebaseio.com",
    projectId: "bolumangalkeyfi-63388",
    storageBucket: "bolumangalkeyfi-63388.appspot.com",
    messagingSenderId: "547222676335",
    appId: "1:547222676335:web:efa725ed4782066ac03e9a"
};

firebase.initializeApp(config);
var database = firebase.database();

var ref = firebase.database().ref();
var key = []
var data = []
ref.on("value", function(snapshot) {
    var list_categories = document.getElementById("menu-flters")
    var test = snapshot.val()
    var keys = Object.keys(test);
    var datas =  Object.values(test) 
    key =  keys
    data =  datas
    // console.log(keys)
    // console.log(Object.values(test))
    list_categories.innerHTML = '<li>Tümü</li>'
    for(var i=0;i<keys.length;i++){
        list_categories.innerHTML += '<li> <a href="#'+keys[i]+'"> '+keys[i]+'</a></li>'
    }

    var list_menu = document.getElementById("menu_tabs")
    list_menu.innerHTML = ""
    for(var i=0; i<keys.length;i++){
        for(var k=0; k<datas[i].length;k++){
             list_menu.innerHTML += '<div class="col-lg-6 menu-item filter-'+keys[i]+'" id="'+keys[i]+'"> <img src="'+datas[i][k].image+'" class="menu-img" alt=""> <div class="menu-content">'+
            '<a href="#">'+datas[i][k].name+'</a><span>'+datas[i][k].price+' TL</span></div> <div class="menu-ingredients">'+datas[i][k].details+'</div></div>'
        
        }
    }
   
},function (error) {
    console.log("Error: " + error.code);
});

}
init()
function usoft(){
    Swal.fire({
        toast: true,
        title: 'USoft - <b><u>USoft the clear choice</b></u> ',
        html:"You can reach us at <a href='mailto:usoft-projects@gmail.com'><b><u> this address.</b></u></a> <br> <p>&copy;Copyright 2022. All Rights Reserved.<br> <b>USoft </b></p>",
        imageUrl: 'assets/img/rocket.png',
        imageAlt: 'Custom image',
      });
}
setInterval(
    () => {
        firebase.database().goOffline();
        console.log("offline")
    },
    20000,
)