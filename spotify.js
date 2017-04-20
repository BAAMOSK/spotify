const getSkrillex = `searc?q=skrillex&limit=1&type=artist`;

var getFromApi = function(endpoint) {
	const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
	//Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
	return fetch(url).then(function(response) {
		if (!response.ok) {
			return Promise.reject(response.statusText);
		}
		return response.json();
	}).then(response => { getArtist(response) });
};


var artist;

var getArtist = function(name) {
	artist = name.artists.items[0];
	console.log(artist);
	return artist;
};

getFromApi(getSkrillex);