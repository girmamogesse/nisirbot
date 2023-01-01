  require('dotenv').config()
  const express = require('express')
  const bodyParser = require('body-parser')
  const axios = require('axios')

  const TOKEN = "5664925698:AAGKE7KSbMAP3V2w3MsihYRUnduTHPcifx4"

  const TELEGRAM_API = `https://api.telegram.org/bot5664925698:AAGKE7KSbMAP3V2w3MsihYRUnduTHPcifx4`
  const URI = `/webhook/${TOKEN}`
 
  const app = express()
  app.use(bodyParser.json())

  app.post(URI,async (req,res)=>{
      console.log("processing post request...")
      const chatId = req.body.message.chat.id
      const msg = req.body.message.text

      await axios.post(`${TELEGRAM_API}/sendMessage`,{
          chat_id: chatId,
          text: msg
      })
      
      return res.send()
  })
  app.listen(process.env.PORT || 5000, async () =>{
      console.log(':-> App Running on port', process.env.PORT || 5000)
     
  })