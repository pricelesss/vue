/* @flow */

// keep the event data in thread ,so that webview can trigger event by _uid & event name

import { ctx } from './bridge-util';

const eventKeep = new Object();

export function saveEvent( 
    _uid : number ,
    event : string ,
    handler : Function 
) : void {
    eventKeep[_uid] || (eventKeep[_uid] = {});
    eventKeep[_uid][event] || (eventKeep[_uid][event] = []);
    eventKeep[_uid][event].push(handler);
}

export function removeEvent( 
    _uid : number , 
    event : string
) : void {
    eventKeep[_uid] && eventKeep[_uid][event] && ( delete eventKeep[_uid][event] );
}

export function triggerEvent( eventObj ) : void {
    if(eventKeep[eventObj._uid] 
       && typeof eventKeep[eventObj._uid][eventObj.event] === 'function'){
           eventKeep[eventObj._uid][eventObj.event].call(null,eventObj.params)
    }
}
export default eventKeep;


