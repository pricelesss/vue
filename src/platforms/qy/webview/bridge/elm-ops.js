/* @flow */

// html element 操作相关
const elms = new Object();

export function createElm( qnode ){
    let elm;
    if(qnode.tag == 'text'){
        elm = document.createTextNode(qnode.text)
    }else if( qnode.tag == 'comment' ){
        elm = document.createComment( qnode.text || qnode._uid );
    }else{
        elm = document.createElement( qnode.tag );
        elm.setAttribute( '_uid',qnode._uid );
    }
    setElm( qnode._uid , elm );
    return elm;
}

export function setElm( _uid , elm ){
    elms[_uid] = elm;
}
export function removeElm( _uid ){
    delete elms[_uid];
}
export function getElm( qnode ){
    return elms[qnode._uid] || createElm( qnode );
}
export function getParentElm( qnode ){
    return elms[qnode.parent._uid] || createElm({
        _uid : qnode.parent._uid,
        tag : qnode.parent.tag
    })
}

export function getElmByUid( _uid ){
    return elms[_uid];
}
export function getRefElm( qnode ){
    return elms[qnode.ref._uid] || createElm({
        _uid : qnode.ref._uid,
        tag : qnode.ref.tag
    })
}
export default elms;

