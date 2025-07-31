import axios from 'axios';
import 'dotenv/config';

// async function getArtists(){
// const url = 'http://localhost:8686/api/v1/artist';
// const options = {
// 	headers: {
// 		'X-Api-Key': process.env.LIDARR_API,
// 	}
// };
// const artists = await got(url, options).json<any[]>();
// return artists.length;
// }
if (!process.env.LIDARR_API) throw new Error (`LIDARR_API hasn't been found`)
const lidarrApiKey = process.env.LIDARR_API

if (!process.env.LAZYLIBRARIAN_API) throw new Error (`LAZYLIBRARIAN_API hasn't been found`)
const llApiKey = process.env.LAZYLIBRARIAN_API


async function getArtists(){
const response = await axios({
	method: 'get',
	url: `http://localhost:8686/api/v1/artist`,
	responseType: 'json',
	headers: {
		'X-Api-Key': lidarrApiKey
	}
})
	const artists = response.data
	return artists.length;
}

async function getBooks(){
const response = await axios({
	method: 'get',
	url: `http://localhost:5299/api?apikey=${llApiKey}&cmd=getAllBooks`,
	responseType: 'json'
})
	const books = response.data
	return books.length;
}

async function getAuthors(){
const response = await axios({
	method: 'get',
	url: `http://localhost:5299/api?apikey=${llApiKey}&cmd=getIndex`,
	responseType: 'json'
})
	const authors = response.data
	return authors.length;
}

export {
    getArtists,
	getBooks,
	getAuthors
}