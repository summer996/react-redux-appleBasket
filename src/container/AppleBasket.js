import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AppleBasket.scss';
import AppleItem from '../component/Apple.js'
import { bindActionCreators } from 'redux';
import actions from '../redux/actions/actions.js'


class AppleBasket extends Component {
    // 计算当前已吃和未吃的苹果的状态
    calculate (arr) {
        let arrs = arr.reduce((acc, cur) => {
            let weight = acc.weight + cur.weight;
            let quantity = acc.quantity + 1;
            return {
                weight,
                quantity
            }
        }, {quantity: 0, weight: 0});
        return arrs;
    }
    calculateStatus() {
        let status = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            }
        };
        // 这是最开始的写法，虽然这样也没有错，但是可读性不好，没有代码的逻辑性在里面
        // this.props.appleBasket.apples.forEach(apple => {
        //     let selector = apple.isEaten ? 'appleEaten' : 'appleNow';
        //     status[selector].quantity ++;
        //     status[selector].weight += apple.weight;
        // });
        // 根据第二版代码可提出来，生成的第三版，主要是利用一个计算函数返回值
        let apples = this.props.appleBasket.apples;
        let appleNows = apples.filter(apple => {
            return apple.isEaten === false;
        });
        let appleEatens = apples.filter(apple => {
            return apple.isEaten;
        });
        
        status.appleNow = this.calculate.bind(this, appleNows)();
        status.appleEaten = this.calculate.bind(this, appleEatens)();
        // 这是第二版
        // status.appleNow = appleNows.reduce((acc, cur) => {
        //     let weight = acc.weight + cur.weight;
        //     let quantity = acc.quantity + 1;
        //     return {
        //         weight,
        //         quantity
        //     };
        // }, {quantity: 0, weight: 0})

        // status.appleEaten = appleEatens.reduce((acc, cur) => {
        //     let weight = acc.weight + cur.weight;
        //     let quantity = acc.quantity + 1;
        //     return {
        //         weight,
        //         quantity
        //     };
        // }, {quantity: 0, weight: 0})

        return status;
    }

    // 获取未吃苹果的组件数量
    getAppleItem(apples, actions) {
        let data = [];
        apples.forEach(apple => {
            if(apple.isEaten === false) {
                data.push(<AppleItem apple={apple} eatApple={actions.eatApple} key={apple.id} />)
            }
        });
        if(data.length === 0) {
            data.push(<div className="emptyTip" key="empty">苹果篮子空空</div>);
        }
        return data;
    }

    render() {
        let { appleBasket, actions} = this.props;
        
        let { apples } = appleBasket;
        let status = this.calculateStatus.bind(this)();
        let {
            appleNow: {quantity: notEatenQuantity,weight: notEatenWeight},
            appleEaten: {quantity: EatenQuantity,weight: EatenWeight}
        } = status;

        return (
            <div className="appleBasket">
                <div className="title">
                    苹果篮子
                </div>
                <div className="states">
                    <div className="section firstSection">
                        <div className="head">当前</div>
                        <div className="content">{notEatenQuantity}个苹果，{notEatenWeight}克</div>
                    </div>
                    <div className="section">
                        <div className="head">已吃掉</div>
                        <div className="content">{EatenQuantity}个苹果，{EatenWeight}克</div>
                    </div>
                </div>
                <div className="appleList">
                    { this.getAppleItem(apples, actions) }
                </div>
                <div className="btnDiv">
                    <button onClick={actions.pickApple}>摘苹果</button>
                </div>
            </div>   
        )
    }
}


function mapStateToProps(state) {
    // 这个函数是用于建立组件和store的state的映射关系，作为一个函数，可以传入两个参数，结果一定要返回一个object
    // 传入参数state之后，会订阅store的状态改变，在每次store的state发生改变的时候，这个函数都会被调用
    // 而第二个参数ownProps代表了组件本身的props，如果书写第二个参数，及当props发生变化的时候，mapStateToProps就会被调用，
    // 父组件发生一个变化，也会调用函数
    return {
        appleBasket: state
    }
}
function mapDispatchToProps(dispatch) {
    // 用于建立组件和store.dispatch的映射关系
    // return {
    //     pickApple: () => dispatch({
    //         type: 'BEGIN_PICK_APPLE'
    //         //payload: appleWeight
    //     }),
    //     eatApple: appleId => dispatch({
    //         type: 'EAT_APPLE',
    //         payload: appleId
    //     })
    // }
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppleBasket)