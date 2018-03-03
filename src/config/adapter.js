const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const {File, DateFile, Console} = require('think-logger3');

const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
    type: 'mongoose',
    common: {
        logConnect: isDev,
        logSql: isDev,
        logger: msg => think.logger.info(msg)
    },
    mysql: {
        handle: mysql,
        database: '',
        prefix: 'think_',
        encoding: 'utf8',
        host: '127.0.0.1',
        port: '',
        user: 'root',
        password: 'root',
        dateStrings: true
    },
    mongo: {
        // handle: mongo,
        host: '127.0.0.1',
        port: '27000',
        user: 'fb_ocr',
        password: '123456',
        prefix: 'fb_',
        database: 'fb_ocr', //这里要配置数据库名称
        encoding: 'utf8',
        nums_per_page: 10,
        log_sql: true,
        log_connect: true,
        cache: {
             on: true,
             type: '',
             timeout: 3600
        },
        options: {
             //authSource: 'admin'
         }
    },
   mongoose: {
        // handle: mongo,
        host: '127.0.0.1',
        port: '27000',
        user: 'fb_ocr',
        password: '123456',
        prefix: 'fb_',
        database: 'fb_ocr', //这里要配置数据库名称
        encoding: 'utf8',
        nums_per_page: 10,
        log_sql: true,
        useCollectionPlural: false,
        log_connect: true,
        cache: {
             on: true,
             type: '',
             timeout: 3600
        },
        options: {
             //authSource: 'admin'
         }
    }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'fb_ocr',
      keys: ['fb_ocr', '123456'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

exports.logger = {
    type: isDev ? 'console' : 'app',
    console: {
        handle: Console
    },
    app: {
        handle: DateFile,
        level: 'ALL',
        absolute: true,
        pattern: '-yyyy-MM-dd',
        alwaysIncludePattern: false,
        filename: path.join(think.ROOT_PATH, 'logs/app/app.log')
    },
    request: {
        handle: DateFile,
        level: 'ALL',
        absolute: true,
        pattern: '-yyyy-MM-dd',
        alwaysIncludePattern: false,
        filename: path.join(think.ROOT_PATH, 'logs/request/request.log')
    }
}
