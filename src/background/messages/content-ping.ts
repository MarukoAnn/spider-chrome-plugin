import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    // const message = await querySomeApi(req.body.id)
    console.log('x-content', req.body )
    res.send({
        message: 'sss'
    })
}

export default handler