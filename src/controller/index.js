const Base = require('./base.js');

module.exports = class extends Base {
  	indexAction() {
    // return this.display();

    	let config = this.config('scan_master');
    	return this.success(config);
  	}
  	
};
