const INITIAL_STATE = {
    sessionGroup: null,
    sessionId: null,
    users: [],
    error: ''
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

const replaceSub = (target, new_val, current) => {
    for (const i in target){
        if (typeof target[i] === 'object' && current[i]){
            current[i] = replaceSub(target[i], current[i])
        }
        else {
            current[i] = new_val;
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
            return payload.session ? insertSub(payload.session, state) : state;
        case 'update':
            return payload.props.session ? replaceSub(payload.prop.session, payload.value, state) : state;
        case 'exit':
            return {...INITIAL_STATE, sessionId: payload.sessionId, users: payload.users};
        case 'exit failed': 
            return {...state, error: 'Error: failed to exit session ' + this.sessionId}
       default:
            return {...state};
    }
}

