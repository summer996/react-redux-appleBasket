import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
// import reducer from './index.reducer'
import reducer from './redux/reducers/reducers.js'
// import App from './App';
import AppleBasket from './container/AppleBasket.js'

// 定义中间件对象
// logger函数接受一个对象作为参数，对象的参数上有两个字段，分别代表redux store上的两个同名函数，但需要注意的是并不是所有的中间件
// 都会用到这两个函数。让后donothingmiddleware返回的函数接收一个next类型的参数，这个next是一个特殊的函数，如果调用了它，就意味着当前中间件完成了自己的功能，
// 并将对action控制权交予下一个中间件。

// const logger = ({ getState, dispatch }) => next => action =>{
//     console.log('[logger] 即将执行：', action);
//       // 调用 middleware 链中下一个 middleware 的 dispatch。
//     debugger
//     console.log(action);
//     console.log(next);
//     let returnValue = next(action)

//     console.log('【logger】执行完成后 state:', getState())
//     return returnValue

// }

// 把reducer作为参数，利用redux内置函数createStore创建store树
// 把store作为参数传递下去，这样provider中每一个子组件都可以获取store的state
// const store = createStore(reducer, applyMiddleware(logger));
const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <AppleBasket />
        
    </Provider>,
    document.getElementById('root'));

