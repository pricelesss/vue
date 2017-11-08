/* @flow */
import { nextTick } from 'core/util/index';
import { inApp , inWeb , ctx } from './bridge-util';
import bridgePatch from './bridge-patch';
import { triggerEvent } from './bridge-event';

const bridge = new Object({
    // patch to webview , patchData is the main carrie
    registerPatch : ():void=>{
        nextTick(()=>{
            bridge.doPatch();
        },10)
    },
    doPatch : ():void =>{
        if(bridgePatch.isEmpty()){
            return;
        }
        if( inApp ){
            const patchJson = JSON.stringify(bridgePatch.patchData);
            global.__base__.postPatch(`__bridge__.on_recv_patch_command(${patchJson})`);
        }
        if( inWeb ){
            window.__bridge__.on_recv_patch_command(bridgePatch.patchData:object);
        }        
        bridgePatch.clear();
    },
    // get event call from webview
    getEvent : (eventObj):void=>{
        triggerEvent( eventObj );
        bridge.registerPatch();
    }
})

export default bridge;




