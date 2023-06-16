class ServerWorker {
    constructor (){
        this.init();
    }

    init(){
    console.log('234222')
    console.log('chrome.declarativeNetRequest', chrome.declarativeNetRequest);
    chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
        const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
        console.log(msg);
    });
        // chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((res) => {
        //     console.log(res, 'res');
        // })
    }
}

new ServerWorker();