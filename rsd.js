var countries = []
var teams = []
var arrayIndex = [];
var countriesLength = 0;
var playersLength = 0;
var maxPayersPerCountry = 6;

function BindDefaultData() {
	
	countries = [ {name: "Slovenia", players: [ {name: 'Slovenia 1'}, {name: 'Slovenia 2'}, {name: 'Slovenia 3'}, {name: 'Slovenia 4'}, {name:'Slovenia 5'}, {name: 'Slovenia 6'}]}, {name: "Portugal", players: [ {name: 'Portugal 1'}, {name: 'Portugal 2'}, {name: 'Portugal 3'}, {name: 'Portugal 4'}, {name: 'Portugal 5'}, {name: 'Portugal 6'}]}, {name: "France", players: [{name: 'France 1'}, {name: 'France 2'}, {name: 'France 3'}, {name: 'France 4'}, {name: 'France 5'}, {name: 'France 6'}]}, {name: "Poland", players: [{name: 'Poland 1'}, {name: 'Poland 2'}, {name:  'Poland 3'}, {name: 'Poland 4'}, {name: 'Poland 5'}, {name: 'Poland 6'}]}, {name: "Belgium", players: [{name: 'Belgium 1'}, {name: 'Belgium 2'}, {name: 'Belgium 3'}, {name: 'Belgium 4'}, {name: 'Belgium 5'}, {name: 'Belgium 6'}]}, {name: "Germany", players: [{name: 'Germany 1'}, {name: 'Germany 2'}, {name: 'Germany 3'}, {name: 'Germany 4'}, {name: 'Germany 5'}, {name: 'Germany 6'}]}, {name: "Austria", players: [{name: 'Austria 1'}, {name: 'Austria 2'}, {name: 'Austria 3'}, {name: 'Austria 4'}, {name: 'Austria 5'}, {name: 'Austria 6'}]}, {name: "Bulgaria", players: [{name: 'Bulgaria 1'}, {name: 'Bulgaria 2'}, {name: 'Bulgaria 3'}, {name: 'Bulgaria 4'}, {name: 'Bulgaria 5'}, {name: 'Bulgaria 6'}]}, {name: "Spain", players: [{name: 'Spain 1'}, {name: 'Spain 2'}, {name: 'Spain 3'}, {name: 'Spain 4'}, {name: 'Spain 5'}, {name: 'Spain 6'}]}, {name: "Cyprus", players: [{name: 'Cyprus 1'}, {name: 'Cyprus 2'}, {name: 'Cyprus 3'}, {name: 'Cyprus 4'}, {name: 'Cyprus 5'}, {name: 'Cyprus 6'}]}, {name: "Hungary", players: [{name: 'Hungary 1'}, {name: 'Hungary 2'}, {name: 'Hungary 3'}, {name: 'Hungary 4'}, {name: 'Hungary 5'}, {name: 'Hungary 6'}]}, {name: "Greece", players: [{name: 'Greece 1'}, {name: 'Greece 2'}, {name: 'Greece 3'}, {name: 'Greece 4'}, {name: 'Greece 5'}, {name: 'Greece 6'}]}, {name: "Italy", players: [{name: 'Italy 1'}, {name: 'Italy 2'}, {name: 'Italy 3'}, {name: 'Italy 4'}, {name: 'Italy 5'}, {name: 'Italy 6'}]} ];
	
	for(var i = 0; i< countries.length; i++) {
		$('#listCountries').append("<option value=" + countries[i].name + ">" + countries[i].name + "</option>");
	}
	BindPlayers();
}

function DistributeCountryPlayers(country, countryIndex) {
	console.log('----------------');
	arrayIndex = GetRandomOrder(countriesLength, arrayIndex);
	var next = 0;
	for (var i = 0; i < country.players.length; i++) {
		if(i + next > countriesLength-1){
			next -= countriesLength;
		}
		var indexValue = arrayIndex[i + next];
		while(teams[indexValue].players.length > playersLength-1){
			next++;
			if(i + next > countriesLength-1){
				next -= countriesLength;
			}
			indexValue = arrayIndex[i + next];
		}
		console.log(indexValue + ' ' + countryIndex);
		teams[indexValue].players.push(country.players[i]);		
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
	playersLength = countries[0].players.length;
	teams = [];
	arrayIndex = [];
	for(var i = 0; i < countriesLength; i++) {
		var team = { name: "Team " + (i+1), players: []  }
		teams.push(team);
		arrayIndex.push(i);
	}	
	for(var i = 0; i < countriesLength; i++){
		DistributeCountryPlayers(countries[i], i);
	}
}

function ShowPlayers() {
	$('#divResults').html('');
	for(var i = 0; i < countriesLength; i++){
		var cont = document.getElementById('divResults');
		
		var ul = document.createElement('ul');
    
		$('#divResults').append(teams[i].name);
		for(var j = 0; j < teams[i].players.length; j++){
			var li = document.createElement('li');
			li.innerHTML = teams[i].players[j].name;
	
			ul.appendChild(li);  
		}
		cont.appendChild(ul);
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
	if(country.players.length < maxPayersPerCountry) {
		var playerName = $("#txtPlayer").val();	
		var player = { name: playerName};
		country.players.push(player);
		$('#divPlayers').append("<div>" + playerName + "</div>");
	}
	else{
		alert('You are not allowed to enter more than 6 players per country.');
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