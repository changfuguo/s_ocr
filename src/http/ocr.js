import request from 'request';
const URL_ACCESS_TOKEN = 'https://aip.baidubce.com/oauth/2.0/token';
export function getToken(client_id, client_secret){
	let params = {
		grant_type: 'client_credentials', 
		client_id,
		client_secret
	}
	return new Promise((resolve, reject) => {
		request.post(URL_ACCESS_TOKEN, {form: params}, (err, httpResponse, body) => {
			if (err) {
				return reject(err);
			}
			return resolve(body);
		});
	})
}

const BASIC_RECGNIZE_URL = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic';
export function basicRecgnizeText(params, access_token){
	params.language_type = params.language_type || 'CHN_ENG';
	params.detect_direction = params.detect_direction  === undefined ? !!params.detect_direction : true;
	params.detect_language = params.detect_language  === undefined ? !!params.detect_language : true;

	return new Promise((resolve, reject) => {
		request.post({
			url: [BASIC_RECGNIZE_URL, access_token].join('?'), 
			headers: {
    		'Content-Type': 'application/x-www-form-urlencoded'
			},
			form: params
		}, (err, httpResponse, body) => {
			if (err) {
				return reject(err);
			}
			return resolve(body);
		});
	})
}