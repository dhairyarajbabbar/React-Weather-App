export const geoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4b0295f8f8msh44ee70f9ebc44a5p13901djsn8ef49936b2b7',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "378c43c7811a8bf57116661315fe82ba";

// try {
// 	const response = await fetch(GEO_API_URL, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
/////////////

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }