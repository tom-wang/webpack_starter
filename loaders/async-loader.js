module.exports = function(content, map, meta) {
    const callback = this.async();
    setTimeout(() => {
        this.callback(null, content, map, meta);
    }, 1000);
}
