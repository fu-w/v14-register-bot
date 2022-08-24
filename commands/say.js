const {EmbedBuilder , Guild} = require("discord.js");

module.exports.run = async (client, message, args) => {
  let kayıt= require("../kayıt.json")
 

   var tag = kayıt.tag
   var ailem = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == "0245").size;
   var üye =  message.guild.memberCount
   var etikettag = message.guild.members.cache.filter(m => m.user.discriminator == "Etiket Giriniz").size
   var tag = message.guild.members.cache.filter(a => a.user.username.includes(tag)).size
   var booster = message.guild.premiumSubscriptionCount
   var boostLevel =  message.guild.premiumTier

  
   const say = new EmbedBuilder()
   .setTimestamp()
  .setColor("Black")
  .setThumbnail(message.guild.iconURL())
  .setAuthor({name : `${message.author.tag} Tarafından Sunucu İstatiği İstendi`, iconURL : message.author.displayAvatarURL({ dynamic: true })})
.setDescription(`

**Sunucumuzun Toplam Üyesi** \`${üye}\`

**Sunucumuzun Toplam Taglı Üyesi** \`${ailem}\`

**Sunucumuzun Sembol Tagı Alan Üyemiz** \`${tag}\`

**Sunucumuzun Toplam Etiket Tagını Alan Üyemiz**  \`${etikettag}\`

**Toplamda **\`${booster}\`** adet boost basılmış! ve Sunucu **\`${boostLevel}\`** seviye**



`)
  message.reply({embeds : [say]})
  
  
  
  
  
}

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say','kişi'],
    permLevel: 0,
}

exports.help = {
      name: "say"  
  
}