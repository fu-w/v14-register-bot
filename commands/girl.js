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

let member = (message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.reply(`Bir kullanıcı belirt.`)
if(member.id === message.author.id) return message.reply('Kendini kayıt edemezsin.')
if(member.id === message.guild.ownerID) return message.reply('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)

let tag = ayarlar.tag;
let name = args[1]
if(!name) return message.reply('Bir İsim Belirt Kanka.')
let yas = args[2]
if(!yas) return message.reply("Bir Yaş Belirt Kanka.")



  
member.setNickname(`${tag} ${name} | ${yas}`)
member.roles.add(ayarlar.kızrol)
member.roles.remove(ayarlar.kayıtsız)

 

  const furki = new EmbedBuilder()
  .setTitle("Kayıt Başarılı Şekilde Yapıldı")

  .setThumbnail(member.user.avatarURL({dynamic: true}))
  .setDescription(`
  > **Kayıt Başarılı**

•**Kayıt Edilen Kullanıcı**: ${member}
•**Kayıt Eden Yetkili** <@!${message.author.id}>
•**Verilen Roller** <@&${ayarlar.kızrol}>
•**Yeni İsim** \`${tag} ${name} | ${yas}\`
•**Kayıt Türü** \`Cinsiyet / kız\`
  
`)
  message.reply({embeds : [furki], components : [button]})
  
 
};

exports.conf = {
  aliases: ['k',"girl"],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'kız',
  description: 'Belirttiğiniz kişiyi sunucuda erkek rolü verir.',
  usage: 'erkek üye',
 
};
