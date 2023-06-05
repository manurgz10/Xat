function enviar() {
    var ehttp = new XMLHttpRequest();
    var mail = document.getElementById("mail").value;
    var password = document.getElementById("password").value;
    ehttp.open("GET", "http://localhost:8080/Xat/Login?mail="+mail+"&password="+password, true); 
    console.log(mail);
    console.log(password);
    ehttp.send();
    ehttp.onreadystatechange= function(){
        if (this.readyState==4 && this.status==200){
            var session = ehttp.responseText;
            console.log(session);
            if(session!="false"){
                window.sessionStorage.setItem("mail",mail);
                window.sessionStorage.setItem("session", session);
                window.location.replace("menu.html");
            }      
        }
    }
}

function getCountry(){
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');

    let ehttp = new XMLHttpRequest();

    ehttp.open("GET","http://localhost:8080/Xat/Register?mail="+mail+"&session="+session,true);
    ehttp.send();

    ehttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var countries = JSON.parse(ehttp.responseText);
            var select = document.getElementById("codecountry");

            select.innerHTML = "";

            countries.forEach(function(country, index) {
                if (index % 2 === 0) {
                var option = document.createElement("option");
                option.text = country.name;
                option.value = country.code;
                select.add(option);
            }});
        }
    }
}

function enviar1() {
    var user = document.getElementById("user").value;
    var mail = document.getElementById("mail").value;
    var pass = document.getElementById("password").value;
    var codecountry = document.getElementById("codecountry").value;

    var ehttp = new XMLHttpRequest();

    console.log(mail);
    console.log(user);
    console.log(pass);
    console.log(codecountry);

    ehttp.open("POST","http://localhost:8080/Xat/Register?user="+user+"&mail="+mail+ "&password="+pass+"&codecountry="+codecountry, true)

    ehttp.onload = function() {
        if (ehttp.status == 200) {
            var response = ehttp.responseText;
           
                console.info("Usuario registrado");
                alert("Usuario registrado correctamente");

                document.getElementById("user").value = "";
                document.getElementById("mail").value = "";
                document.getElementById("password").value = "";
                document.getElementById("codecountry").value = "";

        } else {
            console.error("Error:", ehttp.status);
        }
    };
    ehttp.send();
    window.location.href = "login.html"
}

function enviar2() {
    var friend = document.getElementById("friend").value;
    var mail = sessionStorage.getItem("mail");
    var session = sessionStorage.getItem("session");

    var ehttp = new XMLHttpRequest();

    console.log(friend);
    ehttp.open("POST","http://localhost:8080/Xat/Friend?mail="+mail+"&session="+session+ "&friend="+friend, true)

    ehttp.onload = function() {
        if (ehttp.status == 200) {
            var response = ehttp.responseText;
            if (response == 1) {
                console.info("Usuario agregado");
                alert("Usuario agregado correctamente");
            }
            else if (response == 2) {
                alert("Amigo no encontrado");
            }
            else if (response == 3) {
                alert("Sesión expirada. Debes logearte de nuevo.")
                window.location.href = "login.html";
            }
            else if (response == 0) {
                console.error("Error:", ehttp.status);
                }
    
            }
        }
        ehttp.send();
    }

function getFriends() {
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');

    let ehttp = new XMLHttpRequest();

    ehttp.open("GET","http://localhost:8080/Xat/Friend?mail="+mail+"&session="+session,true);
    ehttp.send();

    ehttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var friends = JSON.parse(ehttp.responseText);
            var select = document.getElementById("friends");

            select.innerHTML = "";

            friends.forEach(function(friend) {
                var option = document.createElement("option");
                option.text = friend;
                option.value = friend;
                select.add(option);
            });
        }
    }
}

function enviarXat() {
    var mail = sessionStorage.getItem("mail");
    var session = sessionStorage.getItem("session");
    var receptor = document.getElementById("friends").value;
    var sms = document.getElementById("message").value;
    var ehttp = new XMLHttpRequest();
  
    ehttp.open("POST","http://localhost:8080/Xat/Xat?mail="+mail+"&session="+session+ "&receptor="+receptor+"&sms="+sms, true);
  
    ehttp.onload = function() {
      if (ehttp.status == 200) {
        var response = ehttp.responseText;
        var messageContainer = document.getElementById("message-container");
        var newMessage = document.createElement("div");
        newMessage.classList.add("message", "sent"); // Agrega las clases CSS "message" y "sent"
        
        var contenidoElement = document.createElement("div");
        contenidoElement.classList.add("content");
        contenidoElement.textContent = "Tú: " + sms;
        
        newMessage.appendChild(contenidoElement);
        messageContainer.appendChild(newMessage);
        
        document.getElementById("message").value = ""; // Limpiar el campo de entrada después de enviar el mensaje
        getMessage();
      } else {
        console.error("Error:", ehttp.status);
      }
      getMessage();
    };
    ehttp.send();
  }
  
  function getMessage() {
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');
  
    var ehttp = new XMLHttpRequest();
  
    ehttp.open("GET", "http://localhost:8080/Xat/Xat?mail=" + mail + "&session=" + session, true);
    ehttp.send();
  
    ehttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = ehttp.responseText;
        console.log("Respuesta del servidor:", response);
  
        try {
          var message = JSON.parse(response);
          console.log("Mensaje recibido:", message);
  
          var messageContainer = document.getElementById("message-container");
          var text = message.text;
          var emisor1 = message.emisor;
          var newMessage = document.createElement("div");
          newMessage.classList.add("message", "received"); // Agrega las clases CSS "message" y "received"
          
          var contenidoElement = document.createElement("div");
          contenidoElement.classList.add("content");
          contenidoElement.textContent = "De: " + emisor1 + ": " +  text;
          
          newMessage.appendChild(contenidoElement);
          messageContainer.appendChild(newMessage);
        } catch (error) {
          console.error("Error al analizar la respuesta JSON:", error);
        }
      }
    };
  }




function logOut() {
    sessionStorage.removeItem("mail")
    sessionStorage.removeItem("session")
    window.location.href = "login.html";
}


function redirigir() {
    window.location.href = "login.html";
  }
  
function redirigir1() {
    window.location.href = "registre.html";
}

function redirigir2() {
    window.location.href = "agregaramigo.html";
}

function redirigir3() {
    window.location.href = "menu.html";
}

function redirigir5() {
    window.location.href = "xat.html"
}