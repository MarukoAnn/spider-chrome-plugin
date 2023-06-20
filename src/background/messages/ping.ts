import type { PlasmoMessaging } from "@plasmohq/messaging"
import {getStorage} from "~utils/storage";
import Http from "~utils/XHRScript";
const https = new Http();
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    // const message = await querySomeApi(req.body.id)
    // let [, data] = await getStorage('queryProduct-body')
    // console.log('x-ser', data)
    // https.post(`https://m.ctrip.com/restapi/soa2/18631/queryProducts?_fxpcqlniredt=09031061419988735556`, data).then(val => {
    //     console.log(val, 'xxx');
    // });

    // do something with response here, not outside the function
    res.send({
        message: 'sss'
    })
}

export default handler