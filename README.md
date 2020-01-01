<!--
 * @Descripttion: 
 * @version: 
 * @Author: youname
 * @Date: 2020-01-01 09:43:58
 * @Email: rufeike@163.com
 -->
# webpack.config.js配置
>主要用于代码打包，使用各种loader，由于webpack只能处理js文件，需要处理其他类型文件时，需要使用各种loader进行处理，再进行webpack打包
>`注意：`loader执行顺序会影响打包结果

## 安装
>全局安装，`webpack`安装需要同时安装`webpack-cli`
```shell
$ npm install webpack webpack-cli -g
```

## webpack.config.js说明
基本结构
```js
module.exports = {
    mode:'模式',//'none','production','development'
    entry:{
        index:'./src/js/index.js',
    },//打包入口文件名
    output:{
        path:'打包输出文件夹路径',
        filename:'输出文件名称'
    },
    module:{//模块
        rules:[],//模块处理规则，使用各种loader
    },
    plugins:[//插件

    ],
    devtool:'source-map'//保留js调试代码格式
}

```
- mode模式
    - none 
    - production  生存模式
    - development 开发模式

- entry入口

单入口模式`webpack.config.js`配置
```js
const path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/js/utils.js',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'bundle.js'
    }
}
```

多入口模式`webpack.config.js`配置

```js
const path = require('path');
module.exports = {
    mode:'development',
    entry:{
        index:'./src/js/utils.js',
        admin:'./src/js/test.js'
    },
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'[name].min.js'//[name]会自动读取entry入口中的键名
    }
}
```

## css文件打包
>需要使用`style-loader`和`css-loader`进行处理，把处理规则放在model.rolus中
- css-loader 用于处理css文件后，才能拿打包 
- style-loader 用于压缩后的文件编译输出到html中，如果不引用，会导致css无法使用,主要把打包的css样式变成页面中的一个style标签。
- 注意：rules规则中`{test:/\.css$/,use:['style-loader','css-loader']}`,`style-loader`需要写在`css-loader`前面，因为webpack执行规则是从右往左执行，需要先对css文件进行编辑，再输出文件
```shell
$ npm install style-loader css-loader -D
```
打包css文件的`webpack.config.js`文件配置
```js
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
            {test:/\.css$/i,use:['style-loader','css-loader']}
        ]
    }
}
```

## 对css样式进行处理（加前缀兼容浏览器）
>`postcss-loader` 和 `autoprefixer`(插件)，可以处理css样式在不同浏览器兼容性问题，会自动在需要写前缀的css样式，自动增加对应的前缀样式，如`transform:rotate(30)`，会增加`-webkit-transform:rotate(30)`兼容性样式
- 需要添加postcss.config.js配置文件
```shell
$ npm install postcss-loader autoprefixer -D
```
postcss.config.js配置
```js
module.exports = {
    plugins:[
        require('autoprefixer')
    ]
}
```

css文件增加浏览器兼容的`webpack.config.js`文件配置
```js
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
            {test:/\.css$/i,use:['style-loader','css-loader','postcss-loader']},
        ]
    }
}
```

## 任意文件打包`file-loader`和`url-loader`
>注意：`url-loader`包含`file-loader`的所有功能，打包图片文件，如果在文件中引入，需要慎重考虑图片路径问题，如css中引入的路径是相对路径，最终css样式会输出在html的style标签中，会影响图片引入。`file-loader`一般用于处理大文件，`url-loader`可以定义文件与base64的格式打包到文件中。

图片文件打包处理的`webpack.config.js`文件配置
```js
const path = require('path');
module.exports = {
    mode:'development',
    entry:{
        index:'./src/js/test.js'
    },
    output:{
        path:path.resolve(__dirname,'build'),//打包输出目录
        filename:'bundle.min.js'//单入口
    },
    module:{
        rules:[
            {test:/\.css$/i,use:['style-loader','css-loader','postcss-loader']},
            // {test:/\.(jpg|png|gif)$/i,use:{
            //     loader:'file-loader',
            //     options:{
            //         outputPath:'images/'//相对打包输出目录
            //     }
            // }},
            {test:/\.(jpg|png|gif)$/i,use:{
                loader:'url-loader',
                options:{
                    outputPath:'images/',//相对打包输出目录
                    limit:38*1024//小于或等于38k的与base64的格式输出的文件中,大于的与文件格式输出
                }
            }}
        ]
    }
}
```

## 编译less文件
>需要安装`less-loader`和`less`，需要对应的环境和loader进行处理
编译规则
```js
{test:/\.less$/i,use:['style-loader','css-loader','less-loader']}
```

## ES6语法兼容处理
>需要安装babel相关的处理loader和环境模块
```shell
$ npm install babel-loader @babel/core @babel/preset-env -D
```

处理ES6兼容的`webpack.config.js`的文件配置
```js
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
            {test:/\.css$/,use:['style-loader','css-loader','postcss-loader']},
            // {test:/\.(jpg|png|gif)$/i,use:{
            //     loader:'file-loader',
            //     options:{
            //         outputPath:'images/'
            //     }
            // }},
            {test:/\.(jpg|png|gif)$/i,use:{
                loader:'url-loader',
                options:{
                    outputPath:'images/',//相对打包输出目录
                    limit:38*1024//小于或等于38k的与base64的格式输出的文件中,大于的与文件格式输出
                }
            }},
            {
                test:/\.jsx?$/i,
                exclude:/node_modules/,//排除相关文件
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }

            }
        ]
    }
}

```

## js代码保留原格式拍错`source-map`
>代码打包编译后，会改变js的结构和格式，如果在程序运行过程中出现错误，不方便查找错误和拍错，需要开启`devtool:'source-map'`
```js
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
            {test:/\.css$/,use:['style-loader','css-loader','postcss-loader']},
            // {test:/\.(jpg|png|gif)$/i,use:{
            //     loader:'file-loader',
            //     options:{
            //         outputPath:'images/'
            //     }
            // }},
            {test:/\.(jpg|png|gif)$/i,use:{
                loader:'url-loader',
                options:{
                    outputPath:'images/',//相对打包输出目录
                    limit:38*1024//小于或等于38k的与base64的格式输出的文件中,大于的与文件格式输出
                }
            }},
            {
                test:/\.jsx?$/i,
                exclude:/node_modules/,//排除相关文件
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }

            }
        ]
    },
    devtool:'source-map'//编译保留原js格式，方便排查错误
}
```

## 代码质量编译（风格）`eslint-loader`
>可以检查代码风格，如空格，引号，分号控制器，需要安装`elint`和`elint-loader`
```shell
$ npm install eslint-loader eslint -D
```
需要配置`.eslintrc`文件
```json
{
    "parserOptions":{
        "ecmaVersion":6,
        "sourctType":module",
        "ecmaFeatures":{
            "jsx":true
        }
    },
    "rules":{
        "indent":["error",2],//缩进2个空格，报错级别
        "linebreak-style":["error","unix"],//换行风格unix,
        "quoter":["error","double"],//双引号
        "semi":["error","always"]//结尾必须带分号
    }
}

```

## 代码热更新和监控编译
- 注意：
- 需要动态更新，热更新的文件路径是相对'/'目录的
- `webpack-dev-server`开发环境监控服务，用于热更新监控。需要在nodejs的配置文件`package.json`中增加启动指令，webpack-dev-server不能直接启动，只能通过`npm run start`; webpack-dev-server 会监控weback.config.js中的相关配置
``js
"scriptes":{
    ...,
    "start":"webpack-dev-server"

}
```
需要在项目本地安装`webpack webpack-cli webpack-dev-server`
```shell
$ npm install webpack webpack-cli webpack-dev-server -D
```



