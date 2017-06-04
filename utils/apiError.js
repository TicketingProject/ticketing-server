/**
 * 自定义Api异常
 */
class ApiError extends Error {

    //构造方法
    constructor(info, message) {
        super();
        this.name = 'API_ERROR';
        if (message) {
          info.message += `: ${message}`;
        }
        this.code = info.code;
        this.message = info.message;
    }
}

module.exports = ApiError;