// https://webpack.js.org/concepts/loaders/
// https://webpack.js.org/contribute/writing-a-loader/
// https://webpack.js.org/api/loaders/
const { getOptions, stringifyRequest } = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = {
    type: 'object',
    properties: {
        test: {
            type: 'string'
        }
    }
}

module.exports = function(source) {
}

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    console.log('comm-pitch-loader #20');
    return 'xxx';
};
