var countries = [];
var availableCountries = []
var teams = [];
var arrayIndex = [];
var countriesLength = 0;
var playersLength = 0;
var maxPayersPerCountry = $("#txtMaxPlayers").val();
var teamNames = ["Lao Tzu", "Confucius", "Seneca", "Aristotle", "Socrates", "Plato", "Hypatia", "Marcus Aurelius", "Thomas Aquinas", "Giordano Bruno", "John Locke", "Voltaire", "David Hume", "Immanuel Kant", "Arthur Schopenhauer", "Henry David Thoreau", "Soren Kierkegaard", "Friedrich Nietzsche", "Sigmund Freud", "Rudolf Steiner", "Ludwig Wittgenstein", "Albert Camus", "Alan Watts"]

function Init() {
	$("#btnDistribute").click(function(){
		DistributePlayers();
		ShowPlayers();
	  });
	  $("#btnShow").click(function(){
			ShowPlayers();
	  });
	  $("#btnAddCountry").click(function(){
			AddCountry();
	  });
	  $("#btnAddPlayer").click(function(){
			AddPlayer();
	  });
	  $("#listCountries").on('change', function(){
			BindPlayers();
	  });
	  $("#btnReset").click(function(){
			Reset();
	  });
	  
	  BindDefaultData();
}

function BindDefaultData() {
	
	countries = [ {name: "Slovenia", usedPlayersCount:0, players: [ {name: 'Slovenia 1'}, {name: 'Slovenia 2'}, {name: 'Slovenia 3'}, {name: 'Slovenia 4'}, {name:'Slovenia 5'}, {name: 'Slovenia 6'}]}, {name: "Portugal", usedPlayersCount:0, players: [ {name: 'Portugal 1'}, {name: 'Portugal 2'}, {name: 'Portugal 3'}, {name: 'Portugal 4'}, {name: 'Portugal 5'}, {name: 'Portugal 6'}]}, {name: "France", usedPlayersCount:0, players: [{name: 'France 1'}, {name: 'France 2'}, {name: 'France 3'}, {name: 'France 4'}, {name: 'France 5'}, {name: 'France 6'}]}, {name: "Poland", usedPlayersCount:0, players: [{name: 'Poland 1'}, {name: 'Poland 2'}, {name:  'Poland 3'}, {name: 'Poland 4'}, {name: 'Poland 5'}, {name: 'Poland 6'}]}, {name: "Belgium", usedPlayersCount:0, players: [{name: 'Belgium 1'}, {name: 'Belgium 2'}, {name: 'Belgium 3'}, {name: 'Belgium 4'}, {name: 'Belgium 5'}, {name: 'Belgium 6'}]}, {name: "Germany", usedPlayersCount:0, players: [{name: 'Germany 1'}, {name: 'Germany 2'}, {name: 'Germany 3'}, {name: 'Germany 4'}, {name: 'Germany 5'}, {name: 'Germany 6'}]}, {name: "Austria", usedPlayersCount:0, players: [{name: 'Austria 1'}, {name: 'Austria 2'}, {name: 'Austria 3'}, {name: 'Austria 4'}, {name: 'Austria 5'}, {name: 'Austria 6'}]}, {name: "Bulgaria", usedPlayersCount:0, players: [{name: 'Bulgaria 1'}, {name: 'Bulgaria 2'}, {name: 'Bulgaria 3'}, {name: 'Bulgaria 4'}, {name: 'Bulgaria 5'}, {name: 'Bulgaria 6'}]}, {name: "Spain", usedPlayersCount:0, players: [{name: 'Spain 1'}, {name: 'Spain 2'}, {name: 'Spain 3'}, {name: 'Spain 4'}, {name: 'Spain 5'}, {name: 'Spain 6'}]}, {name: "Cyprus", usedPlayersCount:0, players: [{name: 'Cyprus 1'}, {name: 'Cyprus 2'}, {name: 'Cyprus 3'}, {name: 'Cyprus 4'}, {name: 'Cyprus 5'}, {name: 'Cyprus 6'}]}, {name: "Hungary", usedPlayersCount:0, players: [{name: 'Hungary 1'}, {name: 'Hungary 2'}, {name: 'Hungary 3'}, {name: 'Hungary 4'}, {name: 'Hungary 5'}, {name: 'Hungary 6'}]}, {name: "Greece", usedPlayersCount:0, players: [{name: 'Greece 1'}, {name: 'Greece 2'}, {name: 'Greece 3'}, {name: 'Greece 4'}, {name: 'Greece 5'}, {name: 'Greece 6'}]}, {name: "Italy", usedPlayersCount:0, players: [{name: 'Italy 1'}, {name: 'Italy 2'}, {name: 'Italy 3'}, {name: 'Italy 4'}, {name: 'Italy 5'}, {name: 'Italy 6'}]} ];
	
	for(var i = 0; i< countries.length; i++) {
		$('#listCountries').append("<option value=" + countries[i].name + ">" + countries[i].name + "</option>");
	}
	BindPlayers();
}

function DistributeTeamPlayers() {
	maxPayersPerCountry = $("#txtMaxPlayers").val();
	for(var i = 0; i < teams.length; i++) {		
		while(teams[i].players.length < maxPayersPerCountry) {
			
			if(availableCountries.length == 0){
				arrayIndex = GetRandomOrder(countriesLength, arrayIndex);
				for(var c = 0; c < countriesLength; c++){
					availableCountries.push(countries[arrayIndex[c]])
				}				
			}
			
			var country = availableCountries.pop();
			
			for(var p = 0; p < teams[i].players.length; p++) {
				if(teams[i].players[p].country == country.name){
					availableCountries.unshift(country);
					country = availableCountries.pop();
				}
			}
			
			teams[i].players.push({ name: country.players[country.usedPlayersCount].name, country: country.name});
			for(var c = 0; c < countriesLength; c++){
				if(countries[c].name == country.name){
					countries[c].usedPlayersCount++;
					break;
				}
			}
		}
	}
}

function GetRandomOrder(i, arrayIndex) {
	var ranNums = [];
	var j = 0;
	while (i--) {
		j = Math.floor(Math.random() * (i+1));
		ranNums.push(arrayIndex[j]);
		arrayIndex.splice(j,1);
	}
	return ranNums;
}

function DistributePlayers() {
	countriesLength = countries.length;
	teams = [];	
	arrayIndex = [];	
	teamNames = GetRandomOrder(teamNames.length, teamNames);
	for(var i = 0; i < countriesLength; i++) {
		countries[i].usedPlayersCount = 0;
		var team = { name: teamNames[i], players: []  }
		teams.push(team);
		arrayIndex.push(i);
	}
	
	DistributeTeamPlayers();
}

function ShowPlayers() {
	$('#divResults').html('');
	arrayIndex = GetRandomOrder(countriesLength, arrayIndex);
	for(var i = 0; i < countriesLength; i++){
		var cont = document.getElementById('divResults');
		
		var div = document.createElement('div');
		div.className = "col-4";
		
		var ul = document.createElement('ul');
		var span = document.createElement('span');
		span.innerHTML = "Team " + (i+1) + ' ' + teams[arrayIndex[i]].name;
    
		div.appendChild(span);
		for(var j = 0; j < teams[arrayIndex[i]].players.length; j++){
			var li = document.createElement('li');
			li.innerHTML = teams[arrayIndex[i]].players[j].name;	
			ul.appendChild(li);  
		}
		
		div.appendChild(ul);
		cont.appendChild(div);
	}
}

function AddCountry() {
	var countryName = $("#txtCountry").val();
	$('#listCountries').append("<option value=" + countryName + ">" + countryName + "</option>");
	var country = { name: countryName, players: []  }
	countries.push(country);
}

function AddPlayer() {
	var selectedCountryName = $("#listCountries").val();
	var country = $.grep(countries, function(obj){ return obj.name === selectedCountryName; })[0];
	maxPayersPerCountry = $("#txtMaxPlayers").val();
	if(country.players.length < maxPayersPerCountry) {
		var playerName = $("#txtPlayer").val();	
		var player = { name: playerName};
		country.players.push(player);
		$('#divPlayers').append("<div>" + playerName + "</div>");
	}
	else{
		alert('You are not allowed to enter more than ' + maxPayersPerCountry + ' players per country.');
	}
}

function BindPlayers() {
	var selectedCountryName = $("#listCountries").val();
	var country = $.grep(countries, function(obj){ return obj.name === selectedCountryName; })[0];
	$('#divPlayers').html('');
	for(var i = 0; i < country.players.length; i++) {
		$('#divPlayers').append("<div>" + country.players[i].name + "</div>");
	}
}

function Reset(){
	countries = [];
	$('#listCountries').html('');
	$('#divPlayers').html('');
}