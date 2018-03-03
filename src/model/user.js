'use strict';
const Schema = think.Mongoose.Schema;
const ObjectId = Schema.ObjectId;

module.exports = class extends think.Mongoose {
	get schema() {
		const schema = new think.Mongoose.Schema({
			nickName:{type: String},
	        avatarUrl: {type: String},
	        openid: {type: String},
	        gender: {type: Number},
	        create_at: { type: Date, default: Date.now},
	        status: {type:Number, default: 1} , // 1 :normal ;0:disabled
	        session_key: {type: String},
	        expires_in: {type: Number}, //S
	        sessionid: {type: String}, // 自己维护的sessionid
	        last_login_time: {type: Date , default: Date.now},
            is_push_result: {type: Boolean, default: false}, //是否推送数据 0 false  其他1
            free_number: {type: Number, default: 20},
            day_free_number: {type: Number, default: 10},
            current_fee_number: {type: Number, default: 0}
		});
	    return schema;
	}
	
	async login(data) {

		let {session_key, expires_in, openid, sessionid,nickName, avatarUrl, gender} = data;
		//根据opendid判断是否存在 
		let model = await this.findOne({openid});
		if (think.isEmpty(model)) {
			await this.create({
				nickName,
				avatarUrl,
				gender,
				openid,
				expires_in,
				session_key,
				sessionid
			})
		} else {
			await this.where({openid}).update({$set: {
				nickName,
				avatarUrl,
				gender,
				sessionid,
				session_key,
				expires_in,
				last_login_time: new Date,
			}})
		}
	}
}
