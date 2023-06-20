import "@plasmohq/messaging/background"

import {setStorage, getStorage} from "~utils/storage";
import {Buffer} from "buffer";
const HEADER_ENUM: string[] = ['h-cua', 'h-sign', 'h-ts', 'h-ua'];
class ServerWorker {
    constructor (){
        this.init();
        this.addLinstener();
        // this.addLinstenerContent();
    }

    init(){
    console.log('234222')
    chrome.webRequest.onBeforeSendHeaders.addListener( (details) => {
        // console.log("拦截到请求:", details);
        const reqHeader = details.requestHeaders.filter(res => HEADER_ENUM.includes(res.name));
        console.log("拦截到请求:", reqHeader);
        setStorage('headers', reqHeader);
        // let [, headers] = await getStorage('headers');
        // console.log(headers);
        // details
    }, { urls: ["https://m.ctrip.com/restapi/soa2/18631/queryProduct*","https://m.ctrip.com/restapi/soa2/18631/queryVehicleDetailList*"] },
    ["extraHeaders", "requestHeaders"]);

    chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        // 在发送请求之前执行的代码
        // console.log("请求被拦截:", details);
        // @ts-ignore
        const buffer = this.ArrayBufferUTF8ToStr(details.requestBody.raw[0].bytes);
        setStorage('queryProduct-body', buffer);
        // console.log("请求被拦截-DATA:", buffer);
        return {};
        // 如果需要修改请求，可以返回一个修改后的请求对象
        // return { redirectUrl: "http://example.com" };
    },
    { urls: ["https://m.ctrip.com/restapi/soa2/18631/queryProduct*","https://m.ctrip.com/restapi/soa2/18631/queryVehicleDetailList*"] }, // 监听所有请求
        ["extraHeaders", "requestBody"]
    );

        // console.log('chrome.declarativeNetRequest', chrome.declarativeNetRequest);
    // chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
    //     const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
    //     console.log(msg);
    // });
        // chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((res) => {
        //     console.log(res, 'res');
        // })
    }
    ArrayBufferUTF8ToStr(array) {
        let out,i,len,c;
        let char2,char3;
        if (array instanceof ArrayBuffer) {
            array = new Uint8Array(array);
        }
        out = "";
        len = array.length;
        i = 0;
        while(i < len) {
            c = array[i++];
            switch(c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    }
    addLinstener(){
        chrome.runtime.onMessage.addListener(
            async  (request, sender, sendResponse) => {
                console.log(request, 'xx');
                if(request.type == 'start') {
                    await this.sendMessageContent({type: 'start'});
                }
            }
        );
    }
    // addLinstenerPage(){
    //     chrome.runtime.onMessageExternal.addListener(
    //         (request, sender, sendResponse) =>{
    //             console.log(request);
    //
    //         });
    // }
    async sendMessageContent(data){
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, data);
    }
}

new ServerWorker();