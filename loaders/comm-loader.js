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
    // 使用loader-utils/schema-utils提供的便捷操作
    const options = getOptions(this);
    validateOptions(schema, options, 'Example Loader');

    // 如果loader使用外部资源（如从文件系统读取文件），必须显式地声明，在watch模式下如果文件有变更loader会重新编译
    //let filePath = 'xxx';
    //this.addDependency(filePath);
    //读取文件内容...

    // 如果要往多个文件中插入公共代码，不需要每个文件都插入，生成一个公共文件，然后在模块内生成调用require即可

    return `export default ${ JSON.stringify(source) }`;
}

//默认情况下传给loader的内容是字符串类型，如果需要传递Buffer类型，则设置raw为true
//loader还是返回字符串或Buffer，webpack负责loader之间传递内容类型的转换
//module.exports.raw = true;
