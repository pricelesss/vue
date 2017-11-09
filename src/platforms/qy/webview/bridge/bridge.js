/* @flow */
import * as nodeOps from './node-ops';

export function registerBridge(){
    // regist patch receiver
    window.__bridge__ = {
        on_recv_patch_command : patch=>{
            directJsonToDom(patch);
        }
    }
}

export function renderQueueDirect(){
    if(window.__patchQueue__ && Array.isArray(window.__patchQueue__)){
        window.__patchQueue__.forEach(patch=>{
            directJsonToDom(patch);
        })
    }
}

const directSort = ['direct_dom','direct_attr','direct_com','direct_native'];
function directJsonToDom(patch:string):void{
    directSort.forEach(key =>{
        patch[key].forEach(direct=>{
            nodeOps[direct.op].call(null,direct.val)
        })
    })
}

