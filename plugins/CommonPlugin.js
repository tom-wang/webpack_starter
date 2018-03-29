/**
 * plugin需要提供apply方法，该方法接收compiler作为参数
 */
const Tapable = require('tapable');

const hook = new Tapable.AsyncParallelBailHook(['args']);
hook.tap('AAA', args => {
    console.log('sync1', args);
    return 1;
});
hook.tap('AAA', args => {
    console.log('sync2', args);
    return 1;
});
hook.tapAsync('AAc', (args, callback) => {
    console.log('async', args);
    setTimeout(() => {
        callback(null, 5);
    }, 3000);
});
hook.tapPromise('AAb', args => {
    console.log('promise', args);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 2000);
    });
});

//hook.call(100);
//hook.callAsync(100, ret => console.log(ret));
//hook.promise(100).then(ret => console.log(ret)).catch(err => console.log(err));

class CommonPlugin {
    apply(compiler) {
        Object.keys(compiler.hooks).forEach((hookName) => {
            compiler.hooks[hookName].tap(hookName, function() {
                console.log(hookName);
            });
        });

        compiler.hooks.make.tap('make', compilation => {
            Object.keys(compilation.hooks).forEach(hookName => {
                compilation.hooks[hookName].tap(hookName, function() {
                    console.log(hookName);
                })
            })
        })
        compiler.hooks.emit.tap('test', compilation => {
            compilation.assets['test.html'] = {
                size: () => 1000,
                source: () => 'hello, test'
            };
        });
        compiler.hooks.afterEmit.tap('test', compilation => {
            console.log(compilation);
        });
        /*
        compiler.hooks.environment.tap('testEnvironment', () => {
            console.log('1');
            compiler.hooks.afterEnvironment.tap('testAfterEnvironment', () => {
                console.log('2');
            });

        });
        compiler.hooks.afterEnvironment.tap('testAfterEnvironment', () => {
            console.log('3');
            compiler.hooks.environment.tap('testEnvironment', () => {
                console.log('4');
            });

        });
        */
    }
}

module.exports = CommonPlugin;
