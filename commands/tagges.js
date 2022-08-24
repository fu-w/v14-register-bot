const {EmbedBuilder} = require("discord.js")
const ayarlar = require("../kayıt.json")

exports.run =  async (client, message, args) => {


    if(![(ayarlar.register)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('Administrator'))
    return message.reply(`Bu İşlemi Tek Kayıt Sorumlusu Kardeşimiz Kullana Bilir !`) 
    
    
    
    let member = (message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if(!member) return message.reply(`Bir kullanıcı belirt.`)


    member.roles.add(ayarlar.tagrol)
    let embed = new EmbedBuilder()
    .setTitle("Başarılı")
    .setDescription(`${member} Adlı Üyeye Başarılı Bir Şekilde ${ayarlar.tagrol} Adlı Rol Verildi`)


}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['taglıal','t'],
    permLevel: 0,
}

exports.help = {
      name: "tagges"  
  
}
