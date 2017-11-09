/* @flow */

import { callThreadEvent } from '../event/bridge';
import { FilteredEvent } from '../event/FilteredEvent';
import {
    setElm,
    removeElm,
    createElm,
    getElm,
    getParentElm,
    getRefElm
} from './elm-ops';

// 操作相关
export function setRoot( qnode ){
    let elm = createElm( qnode );
    setElm( qnode._uid , elm );
    document.getElementById('page').appendChild( elm );
}
export function appendCh( qnode ){
    let child = getElm( qnode );
    let parent = getParentElm( qnode )
    parent.appendChild( child );
}
export function removeCh( qnode ){
    let child = getElm( qnode )
    if( child ){
        child.parentNode.removeChild( child );
    }
}
export function insertBefore( qnode ){
    let parent = getParentElm( qnode );
    let child = getElm( qnode );
    let ref = getRefElm( qnode );
    parent.insertBefore( child , ref );
}
export function setAttr( qnode ){
    let elm = getElm( qnode );
    // set value
    if(elm.tagName === 'INPUT' && qnode.key === 'value'){
        elm.value = qnode.val;
    }else{
        elm.setAttribute( qnode.key , qnode.val );
    }
}
export function removeAttr( qnode ){
    let elm = getElm( qnode );
    elm.removeAttribute( qnode.key );
}

export function setClass( qnode ){
    let elm = getElm( qnode );
    elm.className =  qnode.cls ;
}
export function setStyle( qnode ){
    let elm = getElm( qnode );
    Object.assign(elm.style,qnode.style);
}
export function addEvent( qnode ){
    let elm = getElm( qnode );
    elm.addEventListener( qnode.event ,(e)=>{
        callThreadEvent(qnode,qnode.event,new FilteredEvent(e))
    })
}

export function removeEvent( qnode , event  ){
    let elm = getElm( qnode );
    elm.removeEventListener( event );
}

export function setText( qnode ){
    let elm = getElm( qnode );
    elm.textContent = qnode.text;
}

