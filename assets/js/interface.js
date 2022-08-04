
function init(){
var config = {
    apiKey: "AIzaSyDAl-sAyQGr3tRpK5TwfPz5lVbfyvdD5TM",
    authDomain: "onurfirebase-8f143.firebaseapp.com",
    databaseURL: "https://onurfirebase-8f143.firebaseio.com",
    projectId: "onurfirebase-8f143",
    storageBucket: "onurfirebase-8f143.appspot.com",
    messagingSenderId: "611179792299",
    appId: "1:611179792299:web:dba6f8ab2cc03713c334ee"
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
