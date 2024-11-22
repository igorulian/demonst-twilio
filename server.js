import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Twilio from 'twilio'

dotenv.config()

const PORT = process.env.PORT ?? 3000

console.log('Iniciando servido...')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/send-sms', async (req,res) => {

    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env

    const sendobj = {
        body: req.body.message,
        from: `${TWILIO_PHONE_NUMBER}`,
        to: `+55${req.body.to}`,
    }

    const client = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    try {
        const message = await client.messages.create(sendobj)
        console.log('Mensagem enviada:', message.sid)
    
        return res.status(200).send({ message })
    } catch (error) {
        return res.status(400).send({ version })
    }
})

app.listen(PORT, () => {
    console.log("Servidor iniciado")
})