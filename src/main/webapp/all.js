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
			$("#createUser").append("Utilisateur ajouté");
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
			$("#createEvent").append("Evénement ajouté");
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
	html += "<table class='table table-bordered table-striped'>";
	html += "<tr>";
	html += "<td>Intitule</td><td> Type</td><td> Date de debut</td><td> Date de fin</td><td> Lieu</td><td> Id utilisateur</td><td>Participants minimum</td><td>Participants maximum</td><td>Editer</td><td>Participer</td>";
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
		html += "<td> <button onClick='editEvenement(\""+ data[index].intitule +"\")' class='btn btn-primary'><span class='glyphicon glyphicon-edit'></span></button></td>";
		html += "<td> <button onClick='editEvenement(\""+ data[index].intitule +"\")' class='btn btn-success'><span class='glyphicon glyphicon-plus'></span></button></td>";
		html += "</tr>";
	}
	html += "</table>";
	$("#listEvent").html(html);
}

//Fin listEvent

//Event affichage section
function listEvent() {
	listEventBdd();
	$("#loginUser").hide();
	$("#createUser").hide();
	$("#createEvent").hide();
	$("#listEvent").show();
	$("#principal").show();
	$("#editEvent").hide();
}

function loginUser() {
	$("#loginUser").show();
	$("#createUser").hide();
	$("#createEvent").hide();
	$("#listEvent").hide();
	$("#principal").hide();
	$("#editEvent").hide();
}

function editEvenement(intitule) {
	$("#loginUser").hide();
	$("#createUser").hide();
	$("#createEvent").hide();
	$("#listEvent").hide();
	$("#principal").hide();
	$("#editEvent").show();
	
	getEventBdd(intitule);
}

function getEventBdd(intitule) {
	getEventGeneric("v1/evenement/"+intitule);
}

function getEventGeneric(url) {
	$.getJSON(url, function(data) {
		afficheEvent(data)
	});
}

function afficheEvent(data)
{
	$("#Eintitule").val(data.intitule);
	$("#Etype").val(data.type);
	$("#EdateDebut").val(data.dateDebut);
	$("#EdateFin").val(data.dateFin);
	$("#Elieu").val(data.lieu);
	$("#EnomOrganisateur").val(data.idUser);
	$("#EnombreMin").val(data.nbMax);
	$("#EnombreMax").val(data.nbMin);
}

function createUser() {
	$("#loginUser").hide();
	$("#createUser").show();
	$("#createEvent").hide();
	$("#listEvent").hide();
	$("#principal").hide();
	$("#editEvent").hide();
}

function createEvenement() {
	$("#loginUser").hide();
	$("#createUser").hide();
	$("#createEvent").show();
	$("#listEvent").hide();
	$("#principal").hide();
	$("#editEvent").hide();
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
	postUserBdd(nom, prenom, pseudo, email, password);
}