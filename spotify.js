//
//
// var getFromApi = function(endpoint, query={}) {
//     const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
//     Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
//     return fetch(url).then(function(response) {
//         if (!response.ok) {
//             return Promise.reject(response.statusText);
//         }
//         return response.json();
//     });
// };




let artist;

var getFromApi = function(endpoint, query) {
	const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
	Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
	console.log(url);
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
		console.log(response);
		let resultID = response.artists.items[0].id;
		return response;
	 })

	.catch(function(err) {
		console.error(err);
	})
};
var getArtist = function(name) {
//https://api.spotify.com/v1/artists/{id}/related-artists
	let query = {
		 q: name,
		 limit: 5,
		 type: 'artist'
	};
	artist = getFromApi('search', query);
  return getFromApi(`artists/${resultID}/related-artists`, query);
};

// var artist;

//
// function getArtist(name) {
//
// 	artist = { artist: name.artists.items[0] };
// 	let relatedArtists = [];
//
// 	for(let i = 1; i < name.artists.items.length; i++) {
// 		relatedArtists.push(name.artists.items[i]);
// 	}
// 	artist.related = relatedArtists;
// 	return artist;
// }
//
// getFromApi(getSkrillex);
