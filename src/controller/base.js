import {GetRandomNum} from '../lib/utils';
const AipOcrClient = require('baidu-aip-sdk').ocr;
module.exports = class extends think.Controller {
	constructor(ctx) {
		super(ctx);
		let ocrs = this.config('ai.ocr');
   		let len = ocrs.length;
   		let index = GetRandomNum(0, len - 1);
   		let ocr = ocrs[index];
   		let {id, key, secret} = ocr;
   		this.ocrClient = new AipOcrClient(id, key, secret);
	}
   	__before() {
  	}
};
