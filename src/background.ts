class ServerWorker {
    constructor (){
        this.init();
    }

    init(){
    console.log('234222')
    chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
        console.log("拦截到请求:", details);
    }, { urls: ["https://m.ctrip.com/restapi/soa2/18631/queryProduct*","https://m.ctrip.com/restapi/soa2/18631/queryVehicleDetailList*"] },
    ["extraHeaders", "requestHeaders"])
    // console.log('chrome.declarativeNetRequest', chrome.declarativeNetRequest);
    // chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
    //     const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
    //     console.log(msg);
    // });
        // chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((res) => {
        //     console.log(res, 'res');
        // })
    }
}

new ServerWorker();