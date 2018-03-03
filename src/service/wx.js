import fetch from 'node-fetch';
module.exports = class extends think.Service {
  	constructor(module) {
    	super();
        this.module = think.isObject(module) ? module : think.config(module || 'scan_master');
    	this.appid = this.module.appid;
    	this.secret = this.module.secret;
    	this.session_key_url = this.module.session_key_url;
        this.access_token_url = this.module.access_token_url;
  	}
  	/**
  	* @description: 获取access token
  	* @param {code}	
  	* @return 
  	**/
  	getSessionKey(code) {

  		let params = [`js_code=${code}`, `appid=${this.appid}`, `secret=${this.secret}`, 'grant_type=authorization_code'];
  		
        return new Promise((resolve, reject) => {
  			fetch([this.session_key_url, '?', params.join('&')].join(''))
		    .then(function(res) {
		        let {status} = res;
		        if (status !== 200) {
		        	return reject('网络错误')
		        }
		        resolve(res.json())
		    })
  		}) 
  	}
    async getAccessToken() {
        let access_token_key = this.module['WX_ACCESS_TOKEN_CACHE'];
        let _access_token = await think.cache(access_token_key);

        if (_access_token) {
            return Promise.resolve(_access_token);
        }

        let params = [`appid=${this.appid}`, `secret=${this.secret}`, 'grant_type=client_credential'];
        return new Promise((resolve, reject) => {
            fetch([this.access_token_url, '?', params.join('&')].join(''), {
                method: 'GET'
            })
            .then(function(res) {
              return res.json();
            }).then((data) => {
                if (data.errcode) {
                    reject(data.errmsg);
                } else {
                    let {access_token, expires_in} = data;
                    think.cache(access_token_key, access_token, {
                        type: 'file',
                        file: {
                            timeout: expires_in * 1000
                        }
                    });
                    resolve(access_token);
                }
            })
      }) 
    }
    /**
    *   根据openid 和session_key 生成sessionid
    */
    getSessionID(openid, session_key){
        let wx_session_secret = think.config('session.wx_secret');
        return think.md5(openid + wx_session_secret + session_key);
    }
}
