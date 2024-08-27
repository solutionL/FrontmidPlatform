// 全局注册指令
export default {
    async install(app){
        /* 
            directives是一个对象 每一个键是文件名 值是代码块
            {
                './module/lazy.js' : default{文件的代码块}，
                './module/other.js' : default{文件的代码块}
            }
        */
        const directives = import.meta.glob('./module/*.js')
        /* 
            Object.entries(): {
                ['./module/lazy.js' : default{文件的代码块}]，
                ['./module/other.js' : default{文件的代码块}]
            }
        */
        for( const [key,value] of Object.entries(directives) ){
            // 得到指令名
            const str = key.split('/')
            const name = str[str.length-1].replace('.js','')
            // 动态导入模块
            const module = await value(); // 使用 await 加载模块
            // 注册指令 访问默认导出
            app.directive(name,module.default)
        }
    }
}