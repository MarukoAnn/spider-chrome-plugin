import { sendToBackground } from "@plasmohq/messaging"
function IndexPopup() {
    const startBtn = async () => {
        let editorExtensionId = 'llcegkddhkclbpjfioakodgeipfdpeie';
     // const res = await  sendToBackground({
     //        name: 'ping',
     //        body: {
     //            id: 123
     //        }
     //    })
        const url = 'xx';
        chrome.runtime.sendMessage(editorExtensionId, {type: 'start'},
            function(response) {
                if (!response.success)
                    new Error(url);
            });

        // console.log(res, 'xx-pop');
      // alert(JSON.stringify(res));
    }

  return (
    <div>
         <button onClick={() => startBtn()}>
             开始
         </button>
    </div>
  )
}

export default IndexPopup
