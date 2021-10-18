class CustomPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const hooks = compiler.hooks;
    hooks.beforeRun.tap('CustomPlugin', (c) => {
      console.log('在开始执行一次构建之前调用，compiler.run 方法开始执行后立刻进行调用。');
    });
    hooks.emit.tap('CustomPlugin', (c) => {
      console.log('---统计文件大小 start---');
      Object.entries(c.assets).forEach(([filename, object]) => {
        console.log(filename, object.size() + 'b');
      });
      console.log('---统计文件大小 end---');
    });
  }
}

module.exports = CustomPlugin;
