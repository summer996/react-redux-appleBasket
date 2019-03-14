let actions = {
    
    pickApple: () => ({
        type: 'BEGIN_PICK_APPLE'
    }),
    
    eatApple: appleId => ({
        type: 'EAT_APPLE',
        payload: appleId
    })
}

export default actions;