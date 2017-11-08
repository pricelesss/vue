/* @flow */

// html element 操作相关
const elms = {};

export function createElm( qnode ){
    let elm;
    if(qnode.tagName == 'text'){
        elm = document.createTextNode(qnode.text)
    }else if( qnode.tagName == 'comment' ){
        elm = document.createComment( qnode.text || qnode._uid );
    }else{
        elm = document.createElement( qnode.tagName );
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
        tagName : qnode.parent.tagName
    })
}

export function getElmByUid( _uid ){
    return elms[_uid];
}
export function getRefElm( qnode ){
    return elms[qnode.ref._uid] || createElm({
        _uid : qnode.ref._uid,
        tagName : qnode.ref.tagName
    })
}
export default elms;

