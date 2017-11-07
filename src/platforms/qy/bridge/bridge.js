/* @flow */

import { inApp , inWeb , ctx } from './bridge-util';
import bridgePatch from './bridge-patch';
import { triggerEvent } from './bridge-event';


const bridge = new Object({
    // patch to webview , patchData is the main carrier
    doPatch : ():void =>{
        if(bridgePatch.isEmpty()){
            return;
        }
        if( inApp ){
            const patchJson = JSON.stringify(bridgePatch.patchData);
            global.__base__.postPatch(`__bridge__.on_recv_patch_command(${patchJson})`);
        }
        if( inWeb ){
            window.__bridge__.on_recv_patch_command(diff);
        }        
        bridgePatch.clearDiff();
    },
    // get event call from webview
    getEvent : (eventObj):void=>{
        triggerEvent( eventObj );
    }
})

export default QiyiBridge;




