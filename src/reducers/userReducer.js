const INITIAL_STATE = {
    groups: [],
    displayName: null,
    email: null,
    type: 'temp',
    history: {
        personal: [],
        group: []
    }
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
        case 'insert':
            return payload.user ? insertSub(payload.auth, state) : state;
        case 'overwrite':
            return payload.prop.user ? replaceSub(payload.prop.auth, payload.value, state) : state;
        case 'login':
            return insertSub({...payload.user, newUser: payload.newUser})
        default:
            return {...state};
    }
}

