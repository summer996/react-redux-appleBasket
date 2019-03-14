import { fromJS } from 'immutable';

const initialState = {
    isPicking: false,
    apple: [
        {
            id:0,
            weight: 233,
            isEaten: false
        },
        {
            id:0,
            weight: [
                {
                    jinzhong: 200
                },
                {
                    pizhong: 100
                }
            ],
            isEaten: false
        }
    ],
    apples: [
        {
            id:0,
            weight: 233,
            isEaten: false
        },
        {
            id:1,
            weight: 236,
            isEaten: false
        },
        {
            id:2,
            weight: 223,
            isEaten: false
        }
    ]
};

console.log(fromJS(initialState))
const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'BEGIN_PICK_APPLE':
            let weight = Math.floor(Math.random()*100 + 200);
            let newApple = {
                id: state.apples.length,
                weight: weight,
                isEaten: false
            };
            return fromJS(state).update('apples', list => list.push(newApple)).toJS();
        case 'EAT_APPLE':
            return fromJS(state).setIn(['apples', action.payload, 'isEaten'], true).toJS();
        default:
            return state;
    }
}
export default reducers;

