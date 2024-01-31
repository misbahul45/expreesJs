import { Schema, model } from "mongoose";

const discordUser=new Schema({
    username:{
        type:Schema.Types.String,
        required:true,
    },
    discordId:{
        type:Schema.Types.String,
        required:true,
        unique:true
    }
})

const DiscordUser=model("discord-user", discordUser)

export default DiscordUser
