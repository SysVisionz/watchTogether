const INITIAL_STATE = {
    groups: [],
    sessionId: null,
    current: null,
    privileges: {
        video: false,
        seek: false,
        play: true,
        pause: true,
        buffer: true
    },
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
            return payload.group ? insertSub(payload.group, state) : null;
        case 'update':
            return payload.props.group ? replaceSub(payload.prop.group, payload.value, state) : null;
        case 'exit':
            return {...state, current: INITIAL_STATE.current};
        case 'exit failed': 
            return {...state, error: 'Error: failed to exit group'}
       default:
            return {...state};
    }
}

