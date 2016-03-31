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

function postUserBdd(nom, prenom, pseudo, email, password) {
    postUserGeneric(nom, prenom, pseudo, email, password, "v1/user/");
}

function postUserGeneric(nom, prenom, pseudo, email, password, url) {
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		data : JSON.stringify({
			"nom" : nom,
			"prenom" : prenom,
			"pseudo" : pseudo,
			"email" : email,
			"password" : password
		}),
		success : function(data, textStatus, jqXHR) {
			afficheUser(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('postUser error: ' + textStatus);
		}
	});
}

function postEventBdd(intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin) {
	postEventGeneric(intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin, "v1/evenement");
}

function postEventGeneric(intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin, url) {
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		data : JSON.stringify({
			"intitule" : intitule,
			"type" : type,
			"dateDebut" : dateDebut,
			"dateFin" : dateFin,
			"lieu" : lieu,
			"idUser" : idUser,
			"nbMax" : nbMax,
			"nbMin" : nbMin
		}),
		success : function(data, textStatus, jqXHR) {
			//afficheUser(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('postUser error: ' + textStatus);
		}
	});
}

function listUsersBdd() {
    listUsersGeneric("v1/user/");
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
	html += "<td>Intitule</td><td> Type</td><td> Date de debut</td><td> Date de fin</td><td> Lieu</td><td> Id user</td><td> nbMax</td><td> nbMax</td>";
	for (index = 0; index < data.length; ++index) 
	{
		html += "<tr>";
		html += "<td>" + data[index].intitule +"</td>";
		html += "<td>" + data[index].type +"</td>";
		html += "<td>" + data[index].dateDebut +"</td>";
		html += "<td>" + data[index].dateFin +"</td>";
		html += "<td>" + data[index].lieu +"</td>";	
		html += "<td>" + data[index].idUser +"</td>";	
		html += "<td>" + data[index].nbMax +"</td>";	
		html += "<td>" + data[index].nbMin +"</td>";	
		html += "</tr>";
	}
	html += "</table>";
	$("#listEvent").html(html);
}
//Fin listEvent

//Event affichage section
function listEvent() {
	$("#loginUser").hide();
	$("#createUser").hide();
	$("#createEvent").hide();
	$("#listEvent").show();
	$("#principal").show();
}

function loginUser() {
	$("#loginUser").show();
	$("#createUser").hide();
	$("#createEvent").hide();
	$("#listEvent").hide();
	$("#principal").hide();
}

function createUser() {
	$("#loginUser").hide();
	$("#createUser").show();
	$("#createEvent").hide();
	$("#listEvent").hide();
	$("#principal").hide();
}

function createEvenement() {
	$("#loginUser").hide();
	$("#createUser").hide();
	$("#createEvent").show();
	$("#listEvent").hide();
	$("#principal").hide();
}

//fonctions envoie donnees formulaires

function sendLogin() {
	var pseudo = $("#pseudo").val();
	var password = $("#password").val();
}

function sendCreateEvenement() {
	var intitule = $("#intitule").val();
	var type = $("#type").val();
	var dateDebut = $("#dateDebut").val();
	var dateFin = $("#dateFin").val();
	var lieu = $("#lieu").val();
	var idUser = $("#nomOrganisateur").val();
	var nbMax = $("#nombreMin").val();
	var nbMin = $("#nombreMax").val();
	postEventBdd(intitule, type, dateDebut, dateFin, lieu, 1, nbMax, nbMin);
}

function sendCreateUser() {
	var nom = $("#nom").val();
	var prenom = $("#prenom").val();
	var pseudo = $("#pseudo").val();
	var email = $("#email").val();
	var password = $("#password").val();
}