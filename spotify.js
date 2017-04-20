const getSkrillex = `search?q=skrillex&limit=10&type=artist`;

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


let artist;

function getArtist(name) {
	
	artist = { artist: name.artists.items[0] };
	let relatedArtists = [];
	
	for(let i = 1; i < name.artists.items.length; i++) {
		relatedArtists.push(name.artists.items[i]);
	}
	artist.related = relatedArtists;
	return artist;
}

getFromApi(getSkrillex);
