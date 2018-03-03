// default config
import error from './error'
module.exports = {
  	workers: 1,
    session: {
      secret: 'xxx!@#',
      wx_secret: '123!@#$'
    },
  	error,
  	ai: {
  		ocr: [{
  			id:  "10847886",
  			key: "BvsuwL5NeQGBeGF3jTzF8yzZ",
  			secret: "qARaGwH85xgK770jrg4oDlwknQYW1daf"
  		}]
  	},
  	scan_master: {
        WX_ACCESS_TOKEN_CACHE: 'wx_access_token',
  		appid: 'wx0bd9558656e6e372',
  		secret: '26bd96c6e05317ad405a36e8d1d0a922',
  		session_key_url: 'https://api.weixin.qq.com/sns/jscode2session',
  		access_token_url: 'https://api.weixin.qq.com/cgi-bin/token',
  		result_notify_url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send',
            template: {
                RESULT_NOTIFY: {
                  template_id: 'AZJwroBgUl3qQiapQ3RUh1Mp3zcPlPlGiX64J0ye_tw',
                  page: 'pages/result/index?from=notify&record_id={record_id}' // 开始不能加/，坑要注意
                }
          }
	},
};
