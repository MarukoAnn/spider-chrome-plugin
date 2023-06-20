import type { PlasmoCSConfig } from "plasmo";
import {getStorage} from "~utils/storage";
import { sendToBackground } from "@plasmohq/messaging"
import Http from "~utils/XHRScript";
export const config: PlasmoCSConfig = {
    matches: ["https://m.ctrip.com/webapp/*"]
}
const http = new Http();

class Content {
    constructor() {
        this.init();
        this.addListener();
    }
    async init() {
        // setTimeout(async () => {
        //     const[, data] = await getStorage('queryProduct-body');
        //     console.log(data, 'xx-da')
        // }, 5000);
        const resp = await sendToBackground({
            name: "content-ping",
            body: {
                id: 123
            }
        });
        console.log('content-resp',resp)
    }
    addListener() {
        chrome.runtime.onMessage.addListener(
            (request, sender, sendResponse) => {
                console.log("%c Line:14 🍺 type", "color:#42b983", request);
                if(request.type == 'start') {
                    this.getPageList()
                }
            }
        );
    }
    async getPageList() {
        const [, data] = await getStorage('queryProduct-body');
        http.post(`https://m.ctrip.com/restapi/soa2/18631/queryProducts?_fxpcqlniredt=09031061419988735556`, data).then(res => {
            console.log("%c Line:14 🍺 type", "color:#42b983", res);
        })
    }

}

new Content();


// relayMessage({
//     name: "ping"
// })
// window.addEventListener("load", () => {
//     let  xhr = new XHRScript();
//     xhr.onreadystatechange = () => {
//         console.log(xhr);
//     }
//     console.log('加载了')
//
// })
// window.addEventListener("readystatechange", (res) => {
//     console.log('xx', res);
// });
//
//
