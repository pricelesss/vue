import { inApp , inWeb } from '../util/index';
import { addParamsToUrl , searchToObject } from './api-util';
import { isDef } from 'shared/util';

// 奇艺api对象，调用方式：qiyi.request()

const noop = ()=>{};

const qiyiApi = {
    bodyEvents : {} ,
    request:function(url , options = {} , cbs_success = noop , cbs_error = noop){
        if( inApp ){
            console.log('network start : ' + url);
            network.get( url , options , (res)=>{
                console.log('network result : ' + url );
                cbs_success(JSON.parse(res));
            } , cbs_error );
        }else if( inWeb ){

            // fetch empty solution
            const _parseJSON = function(response) {
                return response.text().then(function(text) {
                    return text ? JSON.parse(text) : {}
                })
            }

            fetch(url , options).then(json=>{
                console.log(json)
                return _parseJSON(json)
            })
            .then((res)=>{
                cbs_success.call(null,res)
            })
            .catch((err)=>{
                console.log(err)
                //cbs_error.cal(null)
            });
        }else{
            console.error('env error');
        }
    },
    goPage:function(page , data){
        if(inApp){
            console.log('startData' + JSON.stringify(data))
            __base__ && __base__.start(page,data);
        }else if(inWeb){
            let arr = window.location.pathname.split(/\//);
            arr[arr.length-1] = page + '.html';
            let url = arr.join('/');
            window.location.href = addParamsToUrl(url , data);
        }else{
            console.error('env error');
        }
    },
    getPageData:function(){
        let pageData = {};
        if( inApp ){
            console.log('getData' + __page__data)
            pageData = __page__data;
        }else if( inWeb ){
            pageData = searchToObject();
        }
        return pageData;
    },
    share:function( page , data ){
        if(inApp){
            let url = addParamsToUrl( `http://10.127.18.211:8003/123/web/src/_html/${page}.html` , data );
            console.log('shareUrl : ',url)
            __base__.share(url); 
        }else if(inWeb){
            let url = addParamsToUrl( `http://10.127.18.211:8003/123/web/src/_html/${page}.html` , data );
            console.log('shareUrl : ',url)
        }
    },
    goBrowser:function( page , data ){
        if(inApp){
            let url = addParamsToUrl( `http://10.127.18.211:8003/123/web/src/_html/${page}.html` , data );
            console.log('browserUrl : ',url)
            __base__.goBrowser(url); 
        }else if(inWeb){
            let url = addParamsToUrl( `http://10.127.18.211:8003/123/web/src/_html/${page}.html` , data );
            console.log('browserUrl : ',url)
        }
    },
    addBodyEvent:function(event,fn){
        (this.bodyEvents[event] = this.bodyEvents[event] || []).push(fn);
    },
    triggerBodyEvent:function(event){
        console.log('qiyiApi.triggerBodyEvent : '+ event);
        Array.isArray(this.bodyEvents[event]) && this.bodyEvents[event].forEach((fn)=>{
            isDef(fn) && fn.call(null);
        })
    },
}
export default qiyiApi;



