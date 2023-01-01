const Telegraf = require('telegraf');

const bot = new Telegraf('5955160501:AAH34xdOJt4lREzoQF44y7-tsPPCt-Gmmng')

bot.start((ctx)=>{

    // "ማንኛውንም አይነት የትምህርት መረጃ በዚህ bot ላይ ልታስቀምጡልን ትችላላችሁ እኛም አጣርተን ቻናላችን ላይ እናሳውቃችኃለን። በተጨማሪም አጋዥ መፅሐፎችን ምትፈልጉም አናግሩን 📩 "
    
    // "ትምህርት ቤት መደበኛ ትምህርቱን እስከሚጀምር ድረስ ቤት ውስጥ ፍሬያማ የሆነ ጊዜ እንድታሳልፉ በበጎ ፈቃደኞች በነፃ የተዘጋጀ ነው"

    // "ለሌሎች ማጋራት መልካምነት ነውና ያጋሩ"


    const startPayload = ctx.startPayload

    if(startPayload === "2327"){
        bot.telegram.sendPhoto(ctx.chat.id, {
            source: "res/harmony.png",
            
        },{ caption: "💬 Dear "+ctx.chat.first_name+", Welcome! You are Invited as a Cofounder Of Harmony Education Bot(🔕Only admins can see this Msg)"})
    
    }
    else{
         bot.telegram.sendPhoto(ctx.chat.id, {
            source: "res/harmony.png",
            
        },{ caption: "💬 Dear "+ctx.chat.first_name+" Welcome to Harmony Education Official Telegram Bot🤖"})
         
        let animalMessage = `Choose Language`;

        bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
        reply_markup: {
            inline_keyboard: [
                [  {
                        text: "English",
                        callback_data: 'English'
                    },

                    {
                        text: "አማርኛ",
                        callback_data: 'አማርኛ'
                    },

                ],

            ]
        }
    })
    }
    
    

})

bot.action('አማርኛ', ctx => {
    bot.telegram.sendMessage(ctx.chat.id , '♻️ በቅርቡ ይጠብቁ...');
})

//method that returns image of a cat 
bot.action('English', ctx => {
    bot.telegram.sendMessage(ctx.chat.id , '♻️ comming soon...');
})


/****   Register Students Using their Phone Number */

const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My phone number",
                request_contact: true,
                one_time_keyboard: true
            }],
        ]
    }
};

bot.hears('register', (ctx, next) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Can we get access to your phone number?', requestPhoneKeyboard);
    
})

bot.on('contact' , (ctx, next) => {
    const phone = ctx.update.message.contact.phone_number
    bot.telegram.sendMessage(ctx.chat.id , '✅ Your Phone Number '+phone+" is Registered Successfully!");
    
})

bot.launch()