$(document).ready(function () {

    // CONFIGURACION DE FIREBASE
    const firebaseConfig = {
        apiKey: "AIzaSyAmmc9l3oyvStOPML_VIvAHGCe3TFXiEfQ",
        authDomain: "hello-v0.firebaseapp.com",
        projectId: "hello-v0",
        storageBucket: "gs://hello-v0.appspot.com",
        messagingSenderId: "1032642006768",
        appId: "1:1032642006768:web:136ae3e041e2f4fc26fc35",
        measurementId: "G-HG60EWBQ2V"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    console.log(app);

    // Initialize Firebase Authentication
    const auth = firebase.auth();

    // Initialize Firebase Authentication and get a reference to the service GOOGLE
    var provider = new firebase.auth.GoogleAuthProvider();

    // Initialize Cloud Firestore and get a reference to the service
    // var storage = firebase.storage();


    // // REGISTRANDO USUARIO CON CORREO Y PASSWORD
    $("#btonRegistrarse").click(function (e) {
        e.preventDefault()
        var registerUserName = $("#registerUserName").val();
        var registerEmail = $("#registerEmail").val();
        var registerPassword = $("#registerPassword").val();

        // console.log(registerEmail, registerPassword, registerUserName);

        firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
                console.log("Ya estas registrado");
                window.location.href = "html/principal.html";
                addUserName(registerUserName);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log("error");
                console.log(errorCode, "-", errorMessage);
            });
        // var userName = $(#registerUserName).val().toString();

    });

    // INICIANDO SESION USUARIO CON CORREO Y PASSWORD

    $("#btonSignIn").click(function (e) {
        e.preventDefault();
        //Capturamos los datos en variables
        var loginEmail = $("#emailSignIn").val();
        var loginPassword = $("#passwordSignIn").val();

        console.log(loginEmail, loginPassword);

        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
                console.log("ups! error");
                window.location.href = "html/principal.html";
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });

    });





    // REGISTRARSE CON GOOGLE 
    $("#registerGoogle").click(function () {

        console.log("google");

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                window.location.href = "html/principal.html";

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(errorMessage, "F");
            });
    });

    // INICIAR SESION CON GOOGLE 
    $("#iniciarGoogle").click(function () {

        console.log("google");
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                window.location.href = "principal.html";

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(errorMessage, "F");
            });
    });

    // CERRAR SESION
    $("#btnClose").click(function () {
        console.log("Cerraste Sesión");
        // var sweetAlert = Swal.fire(
        //     'Good job!',
        //     'You clicked the button!',
        //     'success'
        // );
        firebase.auth().signOut().then(() => {
            window.location.href = "index.html";

        }).catch((error) => {
            alert("Ups, algo salio mal");
        });


    });

    // USUARIO ACTIVO
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;

            var photo = user.photoURL;

            console.log(user);
            console.log(user.displayName, user.email);
            // ...

            if (photo == null) {
                $('.userPhoto').attr('src', "img/perfil-img.jpg");
            } else {
                $('.userPhoto').attr('src', photo);
            }
            $("#userNameResult1").text(user.displayName + "!");
            $(".userName-Result").text(user.displayName);
            $(".userName-Result").text(user.displayName);
            $("#usernameResult5").text("@" + user.displayName.toLowerCase().split(' ')[0] + "_" + user.displayName.toLowerCase().split(' ')[1]);
            $(".userName-Result").text(user.displayName);

            captarDatos();
        } else {
            // User is signed out
            // ...
        }
    });

    //AÑADIR NOMBRE DE USUARIO
    function addUserName(registerUserName) {

        const user = firebase.auth().currentUser; //datos del usuario

        user.updateProfile({
            displayName: registerUserName,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            var uid = user.uid;
            var email = user.email;
            var nombre = user.displayName;
            var photo = user.photoURL;

            // Obtén la referencia a la imagen de perfil en Firebase
            // $('#photoUser').attr('src', user.photoURL);

            // Update successful
            // ...
            // Guardamos el texto en la base de datos de Firebase
            console.log(nombre, email);

        }).catch((error) => {
            // An error occurred
            alert("algo salio mal  ");
            // ...
        });

    };

    // Initialize Cloud Firestore and get a reference to the service - publicaciones
    const db = new firebase.firestore();

    //PUBLICACION

    $("#btnPublic").click(function (e) {
        e.preventDefault();
        var publicacion = $("#crearPost").val();
        const user = firebase.auth().currentUser;
        console.log(publicacion, user.displayName);

        db.collection("publicacionesHello").add({
            userPublicacion: publicacion,
            photoUser: user.photoURL,
            idUser: user.uid,
            nameUser: user.displayName
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                console.log("guardado");
                window.location.reload(); //recarga la pagina
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // An error occurred
                // ...
                console.log(errorCode, errorMessage);
                console.error("Error adding document: ", error);
            });

    });

    //MOSTRAR PUBLICACION

    function imprimirDatos(data) {
        const user = firebase.auth().currentUser;
        if (data.length > 0) {
            console.log("mostrar datos");
            $("#publicPost").empty();
            var html = "";
            data.forEach((doc) => {
                var publicacion = doc.data();
                console.log("este es mi post ", publicacion);
                var div = "";
                if (user.uid == publicacion.idUser) {
                    div = `
                          <div class="publicacion shadow-drop-center">
                                  <div class="textPublic" id="textPublicResult">
                                          <p>${publicacion.userPublicacion}</p>
                                  </div>
                                  <div class="userPublic" id="userPublicResult">
                                      <img id="photoUser" src="${publicacion.photoUser}">
                                      <p>Publicado por ${publicacion.nameUser}</p>
                                  </div>
                          </div>
                      `
                } else {
                    div = `
                      <div class="other shadow-drop-center">
                          <div class="textPublic" id="textPublicResult">
                              <p>${publicacion.userPublicacion}</p>
                          </div>
                          <div class="userPublic" id="userPublicResult">
                              <img id="photoUser" src="${publicacion.photoUser}">
                              <p>Publicado por ${publicacion.nameUser}</p>
                          </div>
                      </div>
                      `;
                }

                html += div
            });

            $("#publicPost").append(html);

        } else {
            alert("No hay publicaciones")

        }
    }


    // VER LOS POST EN HTML
    function captarDatos() {
        db.collection("publicacionesHello").get().then((querySnapshot) => {
            var data = querySnapshot.docs;
            console.log(data);
            imprimirDatos(querySnapshot.docs);
        });
    }

});
