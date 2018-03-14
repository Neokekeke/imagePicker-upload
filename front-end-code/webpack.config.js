/**
 * Created by HappyEveryDay on 2018/3/14.
 */

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin'); //处理html文件引用js文件的插件

module.exports = {
    entry : './src/script/minify.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename : 'bundle.js'
    },
    plugins : [
        new htmlWebpackPlugin({
            template : 'minify.html', //以根目录下的index.html为模板
            minify : {
                //collapseWhitespace : true, //删除文件空格
                removeComments : true   //删除注释代码
            }
        })
    ]


};