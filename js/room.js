import { APP_ID } from './env.js '

let appID = APP_ID
let token = null
let uid = String(Math.floor(Math.random() * 232))
let room = 'default'


let initiate = async () => {
    const rtmClient = await AgoraRTM.createInstance(appID)

    await rtmClient.login({ uid, token })

    const channel = await rtmClient.createChannel(room)
    await channel.join()

    channel.on('ChannelMessage', (messageData, memberId) => {
        let data = JSON.stringify(messageData.text)
        console.log('Data: ', data)
    })

    let sendMessage = async (e) => {
        e.preventDefault()
        let message = e.target.message.value
        channel.sendMessage({ text: JSON.stringify({ 'message': message }) })
        e.target.reset()
    }


    let messageForm = document.getElementById('message__form')
    messageForm.addEventListener('submit', sendMessage)
}

initiate()