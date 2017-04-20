const getSkrillex = `search?q=skrillex&limit=1&type=artist`;

var getFromApi = function(endpoint) {
	const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
	//Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
	return fetch(url).then(function(response) {
		if (!response.ok) {
			// throw new error ('no response!');
			return Promise.reject(new Error('querry failed'));
		}
		return response.json();
	}).then(response => {
		if (response.artists.items.length === 0){
			throw new Error('No results! Check query!')
		}
		 getArtist(response)
	 })
	.catch(function(err) {
		console.error(err);
	})
};


var artist;

var getArtist = function(name) {
	artist = name.artists.items[0];
	console.log(artist);
	return artist;
};

getFromApi(getSkrillex);
