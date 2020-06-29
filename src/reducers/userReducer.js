const INITIAL_STATE = {
    groups: [],
    displayName: null,
    email: null,
    type: 'temp',
    history: {
        personal: [],
        group: []
    },
    socket: null,
    error: null
}

const insertSub = (target, current) => {
    for (const i in target){
        if (typeof target[i] === 'object' && current[i]){
            current[i] = insertSub(target[i], current[i])
        }
        else {
            current[i] = target[i];
        }
    }
    if (current.filter){
        return current.filter(el => el !== undefined);
    }
    return {...current};
}

const replaceSub = (target, newVal, current) => {
    for (const i in target){
        if (typeof target[i] === 'object' && current[i]){
            current[i] = replaceSub(target[i], newVal, current[i])
        }
        else {
            current[i] = newVal;
        }
    }
    if (current.filter){
        return current.filter(el => el !== undefined);
    }
    return {...current};
}

export default (state=INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'update':
            return payload.user ? {...state, payload} : state;
        case 'overwrite':
            return payload.prop.user ? replaceSub(payload.prop.user, payload.value, state) : state;
        default:
            return {...state};
    }
}

