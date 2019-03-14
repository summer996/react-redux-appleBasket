import React, { Component } from 'react';

import './Apple.scss';

export default class AppleItem extends Component {
    shouldComponentUpdate (nextProps) {
        return nextProps.state !== this.props.state;
    }
    render () {
        let { apple, eatApple } = this.props;
        return (
            <div className="appleItem">
                <div className="apple"> </div>
                <div className="info">
                    <div className="name">红苹果-{apple.id}号</div>
                    <div className="weight">{apple.weight}g</div>
                </div>
                <div className="btnDiv">
                    <button onClick={eatApple.bind(this, apple.id)}>吃掉</button>
                </div>
            </div>
        )
    }
}