// (function(xhr) {
//     var XHR = xhr.prototype;
//     var open = XHR.open;
//     var send = XHR.send;
//
//     // 对open进行patch 获取url和method
//     XHR.open = function(method, url) {
//         this._method = method;
//         this._url = url;
//         return open.apply(this, arguments);
//     };
//     // 同send进行patch 获取responseData.
//     XHR.send = function(postData) {
//         this.addEventListener('load', function() {
//             var myUrl = this._url ? this._url.toLowerCase() : this._url;
//             if(myUrl) {
//                 if ( this.responseType != 'blob' && this.responseText) {
//                     // responseText is string or null
//                     try {
//                         var arr = this.responseText;
//
//                         // 因为inject_script不能直接向background传递消息, 所以先传递消息到content_script
//                         window.postMessage({'url': this._url, "response": arr}, '*');
//                     } catch(err) {
//                         console.log(err);
//                         console.log("Error in responseType try catch");
//                     }
//                 }
//             }
//         });
//         return send.apply(this, arguments);
//     };
// })(XMLHttpRequest);
import {getStorage} from "~utils/storage";
import {to} from 'await-to-js'
class  Http {
    constructor() {
    }
    //
    // get(url, data= {}){
    //     return fetch(url, data)
    // }

    async post(url, data) {
        let [,headers] = await getStorage('headers');
        let hedOptions = {};
        headers.forEach(val => {
            console.log(val,'xx')
            hedOptions[val.name] = val.value
        })
        console.log(hedOptions, 'headers');
       const res = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                ...hedOptions
            },
            body: data
        }).then(res => res.json());
        // res.json().then(val => {
        //     console.log(val)
        // });
       // console.log()
       return new Promise((resolve, reject) => {
           resolve(res);
           return;
       })
    }
}
export default  Http;

