module.exports = {
	REQUEST_WRONG_METHOD: [10000, '请求方式不正确'],
	REQUEST_WRONG_METHOD_POST: [10001, '请求方式为POST'],
	REQUEST_WRONG_METHOD_GET: [10002, '请求方式为GET'],
	REQUEST_WRONG_METHOD_DELETE: [10003, '请求方式为DELETE'],
	REQUEST_WRONG_METHOD_PUT: [10004, '请求方式为PUT'],

	REQUEST_WRONG_PARAMS: [10010, '参数缺失'],
	CAN_NOT_MATCH_DATA: [20000, '找不到对应数据'],
    EXIST_SAME_DATA: [20010, '已经存在同value的数据'],
	EXCEED_MAX_LIMIT: [20020, '您已经使用了{count}次，免费版本每天可免费使用10次，马上推出专业版本，为您提高更好的服务，敬请期待,谢谢关注'],

	RESPONSE_WRONG_COMMON: [99999, '内部发生错误，请联系管理员'],
	USER_LOGIN_EXPIRES: [40000, '用户登录已经失效，请退出重新进入'],
	USER_NOT_LOGIN: [30000, '用户未登录'],
}
