const Base = require('./base.js');

module.exports = class extends Base {
	constructor(ctx){
        super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
        // 其他额外的操作
        this.wxService = think.service('wx', 'scan_master');
    }
  	indexAction() {
    // return this.display();

    	let config = this.config('scan_master');
    	return this.success(config);
  	}
  	
  	async loginAction(){
  		let {code,nickName, gender, avatarUrl} = this.post();
        const WXUser = this.mongoose('user');
        gender = gender || 1;

        if (!code) {
        	return this.fail.apply(this, this.config('error.REQUEST_WRONG_PARAMS'))
        }
		try{
			let result = await this.wxService.getSessionKey(code);
			if (result.errcode) {
				return this.fail(result.errcode, result.errmsg);
			}

			let {session_key, expires_in, openid} = result;

			//根据opendid判断是否存在 
			let sessionid = this.wxService.getSessionID(openid, session_key);

			await WXUser.login({
				nickName,
				avatarUrl,
				gender,
				sessionid,
				session_key,
				expires_in,
				openid
			});
			
            let user = await WXUser.findOne({sessionid});
            let {is_push_result} = user;
			return this.success({sessionid, is_push_result}); 

		}catch(e) {
			return this.fail(e.message);
		}
  	}

	async isExpireAction(){
		let {sessionid} = this.post();
	    const WXUser = this.mongoose('user');
	    if (!sessionid) {
	    	return this.success({status: 1})
	    }
		try{
			let model = await WXUser.findOne({sessionid});
			if(think.isEmpty(model)) {
	    		return this.success({status: 2})
			}

			let {expires_in, last_login_time} = model;

			if (new Date - last_login_time > expires_in * 1000) {
	    		return this.success({status: 4})
			} else {
	    		return this.success({status: 8})
			}
		}catch(e) {
			return this.fail(e.message);
		}	
	}
};
