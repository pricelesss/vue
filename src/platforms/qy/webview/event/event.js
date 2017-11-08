/* @flow */
import {
    registerTap
} from './fakeEvent/tap';

export function registerEvent(){
    registerTap();
}

export function nativeCall (
    typeContent,
    dataContent
):void{
    const event = {
        type:typeContent,
        data:dataContent
    }
    if( window.webkit ){
        // ios
        window.webkit && window.webkit.messageHandlers.native_call.postMessage(JSON.stringify(event));
    }else{
        // android
        console.log("hal:" + JSON.stringify(event));
    }
}
