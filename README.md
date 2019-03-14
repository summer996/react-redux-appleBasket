



# 关于该空项目
## 1) 该空项目使用
#### `git clone git@gitlab.beisen.co:next/generator-talentUI.git`
#### `cd generator-talentUI`
#### `git checkout-index -f -a --prefix=../test/` 其中`../test/`为你要新建的项目的位置和名字
#### `cd ../test && npm install --registry=http://reg.beisen.co` 


#### `npm run start`
#### 修改package.json文件内项目名称和作者名


## 2) 项目开发规范
### 1.项目的文件夹结构是什么样的？
```
generator-talentUI

───dist   
  │
───server
  │
  │─── index.html(承载页)
───src
  │    
  │─── components（组件）
  │    │──── common
  │    │     │───footer
  │    │     │   │
  │    │     │   │─── index.js 
  │    │     │....
  │    │
  ├─── containers
  │    │
  │    │──── App
  │    │     │─── index.js（一级频道）
  │    │ .... 
  │    │
  │─── redux
  │    │──── modules
  │    │     │─── demo.js（demo的reducer文件）
  │    │     │─── index.js（合并reducer）
  │    │ .... 
  │    │
  │─── tests（测试文件）
  │─── entry.js（项目入口）
  │
───static（静态资源）
  │
───webpack（webpack开发版和产品版配置）
  │
───package.json
  │
───karma.config.js（karma测试配置）

```

### 2.如何新建一个频道（频道名称需首字母大写）

#### 1> 在src/containers中新建一个频道，如Test，即新建一个Test文件夹，文件夹下新建一个index.js文件，
文件内容为
```
import React, {Component} from 'react';

export default class Test extends Component {
  render() {
    return (
          <div>
              <h1>test</h1>
          </div>
    );
  }
}
```

#### 2> 在浏览器中输入http://localhost:3000/test则出现频道test对应的内容

### 3.注意事项
#### 1> React组件使用首字母大写来命名
#### 2> 位置及命名规范：
+ 一级频道建立位置及命名：src/containers/一级频道名/index.js
+ 二级频道建立位置及命名：src/containers/一级频道名/二级频道名/index.js
+ 同一频道中对应的reducer文件位置：src/redux/modules/名称.js
+ type命名：一级频道大写/action名称，如APP/ADD、APP/DELETE等

***注：一般type常量、actioncCreator及reducer函数应统一置于reducer文件中，若一个频道涉及内容较多，可根据数据source分多个reducer文件存放***
#### 3> container中组件规范：
+ 使用import来导入scss文件或引入包
+ 组件中必须定义propTypes，如

```
static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }
```
#### 4> components中组件规范：
+ 不可使用connect将components组件与redux的state和dispatch关联，应由父组件将数据和actionCreator通过props传入

#### 5> i18n相关：
+ a、i18n使用：在webpack配置中调用geti18n.js文件的方法，如

     var makeAllFile = require("./getI18n").makeAllFile;

     makeAllFile("./src/i18n/*", ["./src/components/*","./node_modules/@beisen/*"],"./dist/i18nAll/" )

  注：其中第一个参数表示项目中i18n中语言文件存放的位置，第二个表示component下组件中i18n文件夹的位置，第三个参数
  表示引用的组件的i18n文件夹的位置

+ b、i18n语言文件规范：项目和组件中若要支持i18n，则需在项目和组件下有一个i18n文件夹，文件夹下存放对应的语言文件
     语言文件中必须是个JSON结构，如

      {
        "header":"头部",
        "nav1": "首页",
        "nav2": "示例",
        "nav3": "关于"
      }
      
##### 详细规范及学习资料请访问：http://book.beisen.co/ui/TalentUI/_book/index.html