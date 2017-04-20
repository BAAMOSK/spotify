let artist;

var getFromApi = function(endpoint, query={}) {
	const url = new URL(`https://api.spotify.com/v1/${endpoint}`);		
	Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));	
	
	return fetch(url).then(function(response) {
		if (!response.ok) {
			return Promise.reject(response.statusText);
		}		
		return response.json();
	});
};

var getArtist = function(name) {	
	let query = {
	  q: name,
		limit: 10,
		type: 'artist'
	};
	
	return getFromApi('search', query).then(response => {
		artist = response.artists.items[0];		
		let id = artist.id;		
		
		return getFromApi(`artists/${id}/related-artists`, query).then(relatedResponse => {
			artist.related = relatedResponse.artists;			
			let relatedArtistsId = artist.related.map(val => {
				let topSongsUrl = `artists/${val.id}/toptracks`;
				let topSongsQuery = {country: 'US'};				
				return getFromApi(topSongsUrl, topSongsQuery);
			});			
			
			return Promise.all(relatedArtistsId).then(response => {
				artist.tracks = response.tracks;
				return artist;
			});
		}).catch(err => console.error(err));		
	});
};