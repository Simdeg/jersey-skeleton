function getUserBdd(name) {
	getUserGeneric(name, "v1/userdb/");
}

function getUserGeneric(name, url) {
	$.getJSON(url + name, function(data) {
		afficheUser(data);
	});
}

function getForAll() {
	getSecure("v1/secure/forall");
}

function getByAnnotation() {
	getSecure("v1/secure/byannotation");
}

 function getSecure(url) {
 if($("#userlogin").val() != "") {
     $.ajax
     ({
       type: "GET",
       url: url,
       dataType: 'json',
       beforeSend : function(req) {
        req.setRequestHeader("Authorization", "Basic " + btoa($("#userlogin").val() + ":" + $("#passwdlogin").val()));
       },
       success: function (data) {
        afficheUser(data);
       },
       error : function(jqXHR, textStatus, errorThrown) {
       			alert('error: ' + textStatus);
       		}
     });
     } else {
     $.getJSON(url, function(data) {
     	    afficheUser(data);
        });
     }
 }

function postUserBdd(name, alias, pwd) {
    postUserGeneric(name, alias, pwd, "v1/userdb/");
}

function postUserGeneric(name, alias, pwd, url) {
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		data : JSON.stringify({
			"name" : name,
			"alias" : alias,
			"password" : pwd,
			"id" : 0
		}),
		success : function(data, textStatus, jqXHR) {
			afficheUser(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('postUser error: ' + textStatus);
		}
	});
}

function listUsersBdd() {
    listUsersGeneric("v1/userdb/");
}

function listUsersGeneric(url) {
	$.getJSON(url, function(data) {
		afficheListUsers(data)
	});
}

function afficheUser(data) {
	console.log(data);
	$("#reponse").html(data.id + " : <b>" + data.alias + "</b> (" + data.name + ")");
}

function afficheListUsers(data) {
	var html = '<ul>';
	var index = 0;
	for (index = 0; index < data.length; ++index) {
		html = html + "<li>"+ data[index].name + "</li>";
	}
	html = html + "</ul>";
	$("#reponse").html(html);
}

// Debut listEvent
function listEventBdd() {
	listEventGeneric("v1/evenement");
}

function listEventGeneric(url) {
	$.getJSON(url, function(data) {
		afficheListEvent(data)
	});
}

function afficheListEvent(data) {
	var html = "<br/>";
	var index = 0;
	html += "<table>";
	html += "<tr>";
	html += "<td>Intitule</td><td> Type</td><td> Date de debut</td><td> Date de fin</td><td> Lieu</td>";
	for (index = 0; index < data.length; ++index) 
	{
		html += "<tr>";
		html += "<td>" + data[index].intitule +"</td>";
		html += "<td>" + data[index].type +"</td>";
		html += "<td>" + data[index].dateDebut +"</td>";
		html += "<td>" + data[index].dateFin +"</td>";
		html += "<td>" + data[index].lieu +"</td>";	
		html += "</tr>";
	}
	html += "</table>";
	$("#listEvent").html(html);
}
//Fin listEvent

//Event affichage section
function listEvent() {
	document.getElementById(loginUser).toggle();
	document.getElementById(createUser).toggle();
	document.getElementById(createEvent).toggle();
	document.getElementById(listEvent).style.display = block;
	document.getElementById(principal).style.display = block;
}

function loginUser() {
	document.getElementById(loginUser).style.display = block;
	document.getElementById(createUser).toggle();
	document.getElementById(createEvent).toggle();
	document.getElementById(listEvent).toggle();
	document.getElementById(principal).toggle();
}

function createUser() {
	document.getElementById(loginUser).toggle();
	document.getElementById(createUser).style.display = block;
	document.getElementById(createEvent).toggle();
	document.getElementById(listEvent).toggle();
	document.getElementById(principal).toggle();
}

function createEvent() {
	document.getElementById(loginUser).toggle();
	document.getElementById(createUser).style.display = block;
	document.getElementById(createEvent).toggle();
	document.getElementById(listEvent).toggle();
	document.getElementById(principal).toggle();
}