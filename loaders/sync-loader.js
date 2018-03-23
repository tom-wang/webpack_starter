// Loader导出一个函数
// 同步loader中，该函数可以返回一个字符串或者Buffer（最终也会转换为字符串）
// 也可以调用this.callback(err, ...values)返回多个值
// 出现错误可以同步抛出，或者传递为this.callback的第一个参数
module.exports = function(content, map, meta) {
    // return `new content`;
    this.callback(null, content, map, meta);
}
