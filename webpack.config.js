/*
 * @Descripttion: 
 * @version: 
 * @Author: youname
 * @Date: 2020-01-01 10:02:48
 * @Email: rufeike@163.com
 */
const path = require('path');
module.exports = {
    mode:'development',
    entry:{
        index:'./src/js/test.js'
    },
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'bundle.min.js'//单入口
    },
    module:{
        rules:[
            {
                test:/\.js$/i,
                exclude:/node_modules/,//排除相关文件
                loader:'eslint-loader',
                options:{
                    
                }

            }
        ]
    },
    devtool:'source-map'
}