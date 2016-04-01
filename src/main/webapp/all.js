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
			$("#spanCreateUser").text("Utilisateur ajouté");
			listEvent();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('postUser error: ' + textStatus);
		}
	});
}

function postEventBdd(intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin, participe) {
	postEventGeneric(intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin, participe, "v1/evenement");
}

function postEventGeneric(intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin, participe, url) {
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
			"nbMin" : nbMin,
			"participe" : participe
		}),
		success : function(data, textStatus, jqXHR) {
			$("#spanCreateEvent").text("Evénement ajouté");
			$(this).delay(3000);
			listEvent();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('postEvent error: ' + textStatus);
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
	html += "<td>Intitule</td><td> Type</td><td> Date de debut</td><td> Date de fin</td><td> Lieu</td><td> Id utilisateur</td><td>Participants minimum</td><td>Participants maximum</td><td>Participants</td><td>Editer</td><td>Participer</td>";
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
		html += "<td>" + data[index].participe +"</td>";
		html += "<td> <button onClick='editEvenement(\""+ data[index].id +"\")' class='btn btn-primary'><span class='glyphicon glyphicon-edit'></span></button></td>";
		html += "<td> <button onClick=' upParticipeBdd("+ JSON.stringify(data[index]) +")' class='btn btn-success'><span class='glyphicon glyphicon-plus'></span></button></td>";
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

function editEvenement(id) {
	$("#spanVerif").text("");
	$("#loginUser").hide();
	$("#createUser").hide();
	$("#createEvent").hide();
	$("#listEvent").hide();
	$("#principal").hide();
	$("#editEvent").show();
	
	getEventBdd(id);
}

function getEventBdd(id) {
	getEventGeneric("v1/evenement/id/"+id);
}

function getEventGeneric(url) {
	$.getJSON(url, function(data) {
		afficheEvent(data)
	});
}

function afficheEvent(data)
{
	$("#Eintitule").val("");
	$("#Etype").val("");
	$("#EdateDebut").val("");
	$("#EdateFin").val("");
	$("#Elieu").val("");
	$("#EnomOrganisateur").val("");
	$("#EnombreMin").val("");
	$("#EnombreMax").val("");
	
	$("#Eintitule").val(data.intitule);
	$("#Etype").val(data.type);
	$("#EdateDebut").val(data.dateDebut);
	$("#EdateFin").val(data.dateFin);
	$("#Elieu").val(data.lieu);
	$("#EnomOrganisateur").val(data.idUser);
	$("#EnombreMin").val(data.nbMax);
	$("#EnombreMax").val(data.nbMin);
	
	$("#boutonEditer").attr("onclick", "modifEvenement(\""+data.id+"\")");
	$("#boutonSupprimer").attr("onclick", "supprEvenement(\""+data.id+"\")");
}

function modifEvenement(id)
{
	var intitule = $("#Eintitule").val();
	var type = $("#Etype").val();
	var dateDebut = $("#EdateDebut").val();
	var dateFin = $("#EdateFin").val();
	var lieu = $("#Elieu").val();
	var idUser = $("#EnomOrganisateur").val();
	var nbMax = $("#EnombreMin").val();
	var nbMin = $("#EnombreMax").val();
	upEventBdd(id, intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin);
	$("input").val("");
}

function upEventBdd(id, intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin) {
	upEventGeneric(id, intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin, "v1/evenement/"+id);
}

function upEventGeneric(id, intitule, type, dateDebut, dateFin, lieu, idUser, nbMax, nbMin, url) {
	$.ajax({
		type : 'PUT',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		data : JSON.stringify({
			"id" : id,
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
			$("#spanVerif").text("Evènement modifié");
			listEvent();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('postUser error: ' + textStatus);
		}
	});
}

function supprEvenement(id)
{
	var url = "v1/evenement/"+id;
	
	$.ajax({
		type : 'DELETE',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$("#spanVerif").text("Evénement supprimer");
			listEvent();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('postUser error: ' + textStatus);
		}
	});
	$("input").val("");
}

function createUser() {
	$("#spanCreateUser").text("");
	$("#loginUser").hide();
	$("#createUser").show();
	$("#createEvent").hide();
	$("#listEvent").hide();
	$("#principal").hide();
	$("#editEvent").hide();
}

function createEvenement() {
	$("#spanCreateEvent").text("");
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
	$("input").val("");
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
	var participe = 1;
	postEventBdd(intitule, type, dateDebut, dateFin, lieu, 1, nbMax, nbMin, participe);	
	$("input").val("");
}

function sendCreateUser() {
	var nom = $("#nom").val();
	var prenom = $("#prenom").val();
	var pseudo = $("#pseudo").val();
	var email = $("#email").val();
	var password = $("#password").val();
	postUserBdd(nom, prenom, pseudo, email, password);
	$("input").val("");
}

//participe

function upParticipeBdd(data) {
	data.participe += 1;
	upParticipeGeneric(data, "/v1/evenement/participe/"+data.id);
}

function upParticipeGeneric(data, url) {
	$.ajax({
		type : 'PUT',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		data : JSON.stringify(data),
		success : function(data, textStatus, jqXHR) {
			listEvent();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('postParticipe error: ' + textStatus);
		}
	});
}