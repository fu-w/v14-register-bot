const {EmbedBuilder, ActionRowBuilder , ButtonBuilder} = require("discord.js");
const datab = require("nrc.db");
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const ayarlar = require('../kayıt.json')

exports.run =  async (client, message, args) => {
if(![(ayarlar.register)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('Administrator'))
return message.reply(`Bu İşlemi Tek Kayıt Sorumlusu Kardeşimiz Kullana Bilir !`) 

let button = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setCustomId("kayit")
.setStyle(3)
.setLabel("Başarılı")
.setDisabled(true)


)

const member = message.guild.members.cache.get(args[0])
if(!member) return message.reply({ content: `Bir kullanıcı belirt.` })
if(member.id === message.author.id) return message.reply({ content: 'Kendini Kayıtsız Yapamazsın .' })
if(member.id === client.user.id) return message.reply({ content: 'Botu Kayıtsız Yapamazsın.' })
if(member.id === message.guild.OwnerID) return message.reply({ content: 'Sunucu sahibini Kayıtsız Yapamazsın.' })
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ content: `Bu kullanıcı sizden üst/aynı pozsiyondadır.` })


member.roles.add(ayarlar.kayıtsız) 
member.roles.cache.forEach(r => {
member.roles.remove(r.id)})

  const furki = new EmbedBuilder()
  .setTitle("Kayıt Başarılı Şekilde Yapıldı")

  .setThumbnail(member.user.avatarURL({dynamic: true}))
  .setDescription(`
  > **Kayıtsız İşlemi Başarılı**

•**Kayıtsıza Atılan Kullanıcı**: ${member}
•**Kayıtsıza Atan  Yetkili** <@!${message.author.id}>
•**Verilen Roller** <@&${ayarlar.kayıtsız}>

  
`)
  message.reply({embeds : [furki], components : [button]})
  
 
};

exports.conf = {
  aliases: ['kayıtsızagitkopeğ',"kayıtsızz"],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'kayıtsız',
  description: 'Belirttiğiniz kişiyi sunucuda Vip rolü verir.',
  usage: 'Vip üye',
 
};
