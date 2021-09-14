import { MessageEmbed, User, MessagePayload, MessageOptions, TextBasedChannels, TextChannel, DMChannel, BaseGuildTextChannel, Message, ColorResolvable } from "discord.js";
import App from "..";
import DiscordProvider from "../providers/Discord";
import Logger from "./Logger";

const emotes = {
    "yumiloading": "<a:yumiloading:887350424938627173>"
};

export function makeEmbed(icon: string | undefined, title: string, description: any, color: ColorResolvable, fields: any, user: User, setTimestamp: boolean) {
    
    const embed = new MessageEmbed();
    embed.setColor(color || '#FFFFFF');

    if(typeof icon === 'undefined')
        embed.setTitle(title);
    else
        embed.setTitle(`${icon}  ${title}`);

    if (typeof description !== 'undefined')
        embed.setDescription(description)

    if(setTimestamp)
        embed.setTimestamp();

    if(typeof user !== 'undefined')
        embed.setFooter(`${user.username}  |  v${App.version}`, (user.avatarURL() || ''));
    
    if (typeof fields !== 'undefined')
        embed.addFields(fields);
    
    return embed;

}

export function makeSuccessEmbed(options: any) {
    return makeEmbed(options.icon || "✅", options.title, options.description, '#B5EAD7', options.fields, options.user, options.setTimestamp || true);
}

export function makeErrorEmbed(options: any) {
    return makeEmbed(options.icon || "❌", options.title, options.description, '#FF9AA2', options.fields, options.user, options.setTimestamp || true);
}

export function makeProcessingEmbed(options: any) {
    return makeEmbed(options.icon || getEmotes().yumiloading, options.title, options.description, '#C7CEEA', options.fields, options.user, options.setTimestamp || true);
}

export async function sendMessage(channel: TextChannel | DMChannel | BaseGuildTextChannel | TextBasedChannels, user: User | undefined, options: string | MessagePayload | MessageOptions) {
    
    let message;

    try { message = await channel.send(options); }
    catch(error) {
        if(typeof user === 'undefined') return;
        try { message = await user.send(options); }
        catch(errorDM) {
            Logger.error(`Cannot find available destinations to send the message CID: ${channel.id} UID: ${user.id} C_ERR: ${error} DM_ERR: ${errorDM}`);
            return;
        }
    } finally {
        return message;
    }
    
}


export async function sendReply(rMessage: Message, options: string | MessagePayload | MessageOptions) {
    
    let message;

    try { message = await rMessage.reply(options); }
    catch(error) {
        try { message = await rMessage.author.send(options); }
        catch(errorDM) {
            Logger.error(`Cannot find available destinations to reply the message to. MID: ${rMessage.id} CID: ${rMessage.channel.id} UID: ${rMessage.author.id} C_ERR: ${error} DM_ERR: ${errorDM}`);
            return;
        }
    } finally {
        return message;
    }
    
}

export function getEmotes() {
    return emotes;
}