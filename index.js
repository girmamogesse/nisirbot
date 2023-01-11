const Telegraf = require('telegraf');
const express = require('express');

const bot = new Telegraf('5677505583:AAGd_enhKeP6A9zu9WNk8UGqMkwikrTlvtM')
const app = express()

app.get('/get',(req,res)=>{
    res.send('user: '+req.query.user);
    bot.telegram.sendMessage("1913438485" , req.query )
})

app.listen(3000,()=>{
    console.log("server started listening on port 3000")
})


function sendStartMessage(ctx){
  
    const introMsg = "Hello "+ctx.chat.first_name+", Welcome to Harmony Online Education BOT🙌\n"+
    "A place where You can Get:\n"+
    "   ▫️ Usefull Notes,\n"+
    "   ▫️ Previous Mid Exam , Final as Well as Model Exam questions,\n"+
    "   ▫️ Previous Matric Exam Questions with a Brief Answere Explanation💡,\n"+
    "For any help, you can contact us on @aminadab12."

    const startPayload = ctx.startPayload

    if(startPayload != null) {
        bot.telegram.sendMessage(ctx.chat.id , "ℹ️ You were invited by user "+startPayload);
    }   
    
    if(startPayload === "2327"){
        bot.telegram.sendPhoto(ctx.chat.id, {
            source: "res/harmony.png",
            
        },{ caption: "Dear "+ctx.chat.first_name+", Welcome! You are Invited as a Cofounder Of Harmony Education Bot(🔕Only admins can see this Msg)"})
    }
    else if(startPayload == "1"){
        bot.telegram.sendMessage(ctx.chat.id , "Answere for the Question💡\n The Capital City of Ethiopia is Addis Ababa:- ");
    }
    else if(startPayload == "2"){
        bot.telegram.sendMessage(ctx.chat.id , "Answere for the Question💡");
        
    }
    else if(startPayload == "3"){
        bot.telegram.sendMessage(ctx.chat.id , "Answere for the Question💡\n The Capital City of Ethiopia is Addis Ababa:- ");
    }
    else{
        //  bot.telegram.sendMessage(ctx.chat.id , "ℹ️ You were invited by user "+startPayload);
         bot.telegram.sendPhoto(ctx.chat.id, {
            source: "res/harmony.png",            
        },{
            caption: introMsg
        })
  }
}
function getBack(ctx){
    bot.telegram.sendMessage(
        ctx.chat.id,
        "Back to Main!",
        {
            reply_markup: {
                keyboard: [
                                [
                                    { text: "🔙 Back"},
                                ],                          
                          ], 
                resize_keyboard: true,
            }
        }
    )
}
function mainMenu(ctx){
    bot.telegram.sendMessage(
        ctx.chat.id,
        "Select Opetions",
        {
            reply_markup: {
                keyboard: [
                    [
                        { text: "📚 Study Materials"},
                        { text: "📄 Entrance Exam Questions"},
                    ],
                    
                    [
                        { text: "📝 Ask Question"},
                        { text: "🧩 My Questions"},
   
                    ],
                    [
                        { text: "✅ አስጠኚ እፈልጋለሁ"},
                        { text: "⏩ More"},
   
                    ],                               
                ],
 
 
                resize_keyboard: true,
            }
        }
    ) 
}


bot.start((ctx)=>{
   console.log(ctx.chat.id)
   if(ctx.startPayload != "" && ctx.startPayload.length > 4 ) {
    
    bot.telegram.getChat(ctx.startPayload)
        .then(
            chat => {
                console.log(chat.first_name)
                bot.telegram.sendMessage(ctx.chat.id , "ℹ️ You were invited by user "+chat.first_name);
            }
        )
        .catch(err => console.error(err));
   
        
   }

   let chooseLan = "Select Language/ ቋንቋ ይምረጡ"
   bot.telegram.sendMessage(ctx.chat.id, chooseLan , {
    reply_markup: {
       
        inline_keyboard: [
            [  {
                    text: "English 🇬🇧",
                    callback_data: 'en'
                },

                {
                    text: "አማርኛ 🇪🇹",
                    callback_data: 'amh'
                },

            ],
            

        ]
    }
  })
})


// am lang 
bot.action('amh', ctx => {
    bot.telegram.sendMessage(ctx.chat.id , '♻️ በአማርኛ ቋንቋ በቅርብ ቀን ይጠብቁን...');
})

// eng lang 
bot.action('en', ctx => {
    sendStartMessage(ctx)
    mainMenu(ctx)  
})

bot.hears("🔙 Back" , (ctx)=>{
    mainMenu(ctx) 
})

bot.hears("⏩ More"  , (ctx) =>{

    bot.telegram.sendMessage(
        ctx.chat.id,
        "Select Opetions",
        {
            reply_markup: {
                keyboard: [
                    [
                        { text: "🔙 Back"},
                        { text: "🌐 Language / ቋንቋ"},
                    ],
 
                    // [
                    //     { text: "⁉️ FAQ"},
                    //     { text: "📃 Rules"},
                    // ],
                    [
                     { text: "💭 Feedback"},
                     { text: "📥 Contact us"},                     
                    ], 
                    [
                      { text:"🗣 Invite Friends"}
                    ]                               
                ],
 
                resize_keyboard: true,
            }
        }
    ) 
})

bot.hears("📚 Study Materials",ctx=>{
    bot.telegram.sendMessage(
        ctx.chat.id,
        "Select Your Grade",
        {
            reply_markup: {
                keyboard: [
                    [
                        { text: "📌 Grade 9"},
                        { text: "📌 Grade 10"},
                    ],
 
                    [
                        { text: "📌 Grade 11"},
                        { text: "📌 Grade 12"},
                    ],
                    [
                    { 
                        text: "🔙 Back"},                    
                    ],                                
                ],
 
                resize_keyboard: true,
            }
        }
    )
})

let grades = ["📌 Grade 9","📌 Grade 10","📌 Grade 11","📌 Grade 12"]

bot.hears(grades, ctx=>{
    
    bot.telegram.sendMessage(
        ctx.chat.id,
        "Select Subject",
        {
            reply_markup: {
                keyboard: [
                    [
                        { text: "📙 Maths"},
                        { text: "📙 Physics"},
                    ],
 
                    [
                        { text: "📙 Chemistry"},
                        { text: "📙 Biology"},
                    ],
                    [
                    { 
                        text: "🔙 Back"},                    
                    ], 
                                                   
                ],
 
                resize_keyboard: true,
            }
        }
    )
    
    getBack(ctx)
})

let subjectsList = [ "📙 Maths","📙 Physics", "📙 Chemistry", "📙 Biology"]
bot.hears(subjectsList, ctx=>{
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/no-content.png",            
    },{
        caption: "❌ no content yet!"
    })
    getBack(ctx)
})

let others = ["📄 Entrance Exam Questions","📝 Ask Question","🧩 My Questions"]

bot.hears(others, ctx=>{
    console.log(ctx) 
    let joinAlert = `Hey ${ ctx.chat.first_name} 👋 \n\n It seems like you haven't joined our Group yet, the channel is where we post questions asked by you and others, Join using the button below!`
    bot.telegram.sendMessage( ctx.chat.id,joinAlert,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Join" , url: 'http://telegram.me/harmonyedubot?start=1913438485'},
                  ],]}
        })
    getBack(ctx)   
})


bot.hears("🌐 Language / ቋንቋ" , ctx=>{
    let chooseLan = "Select Language/ ቋንቋ ይምረጡ"
    bot.telegram.sendMessage(ctx.chat.id, chooseLan , {
     reply_markup: {
         inline_keyboard: [
             [  {
                     text: "English 🇬🇧",
                     callback_data: 'en'
                 },
 
                 {
                     text: "አማርኛ 🇪🇹",
                     callback_data: 'amh'
                 },
 
             ],           
 
         ]
     }
   })
   getBack(ctx)
})

bot.hears("📥 Contact us" , ctx=>{
    bot.telegram.sendMessage(ctx.chat.id , "📥 Contact us \n\n✍️ Support: https://t.me/aminadab12");    
    getBack(ctx)
})

bot.hears("💭 Feedback" , ctx=>{
    bot.telegram.sendMessage(ctx.chat.id , "💭 Send us your Feedback \n\n✍️ at:- https://t.me/aminadab12");    
    getBack(ctx)
})

bot.hears("🗣 Invite Friends" , ctx=>{
    bot.telegram.sendMessage(
        ctx.chat.id,
        `👥 Successful invites:  0 People \n 💰 Cashed out Amount:  0 Birr \n  ----------------------------------------------\n 💵 Current Reward per one Invite is 1 Birr\n 👇 Share following link to invite:\n http://telegram.me/harmonyedubot?start=${ctx.chat.id} `
    )
    getBack(ctx)
})

/****  For those who want Tutor Givers */
const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "resize_keyboard": true,
        "keyboard": [
            [{
                text: "My phone number",
                request_contact: true,
                one_time_keyboard: true
            }],

        ]
    }
};

bot.hears('✅ አስጠኚ እፈልጋለሁ', (ctx, next) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Send Us your phone number  we will Call You', requestPhoneKeyboard);    
})

bot.on('contact' , (ctx, next) => {
    const phone = ctx.update.message.contact.phone_number
    bot.telegram.sendMessage(ctx.chat.id , '✅ Your Phone Number is '+phone+" we will Call As soon as possible!");
    getBack(ctx)
})
