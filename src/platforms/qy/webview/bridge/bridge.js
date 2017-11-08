/* @flow */

export function registerBridge(){
    // regist patch receiver
    window.__bridge__ = {
        on_recv_patch_command : ()=>{
            directJsonToDom(patch);
        }
    }
}

function directJsonToDom(patch:string):void{
    for(let v of patch){
        v.forEach(direct => {
            qnodeOps[direct.op].call(null,direct.val)
        })
    }
}
