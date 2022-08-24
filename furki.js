const {ButtonBuilder ,EmbedBuilder, SelectMenuBuilder, AttachmentBuilder , Client, GatewayIntentBits , Collection , Partials  } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment")
const db = require("nrc.db")
const fs = require("fs");
const set = require("./furki.json")
const bot = require("./bot.json")
const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });
require("./eventler")(client);
require("moment-duration-format")
let token = set.token;
let prefix = set.prefix;
let botdurum = bot.botdurum;
//Furki#0001 Tarafından Kodlandı
client.on("ready", ()=>{

console.log(`[Furki] Bot Başarıı Bir Şekilde Aktif Oldu`)
console.log(`[Furki] Bot İsim ${client.user.username}`)
client.user.setActivity(botdurum)
client.user.setStatus("dnd")

})

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  };
  
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
      let props = require(`./commands/${f}`);
      log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
  client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./commands/${command}`)];
        let cmd = require(`./commands/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
  client.load = command => {
    return new Promise((resolve, reject) => {
      try {
        let cmd = require(`./commands/${command}`);
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
  client.unload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./commands/${command}`)];
        let cmd = require(`./commands/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };




client.login(token).catch(err => {console.error("Tokene bağlanılamıyor tokeni yenileyin!")});
//Furki#0001 Tarafından Kodlandı
//Furki#0001 Tarafından Kodlandı

////////////////////////////////////////////////////////////////////////////////////////////////
let kayıt = require("./kayıt.json")
client.on("guildMemberAdd", member => {
    let guild = member.guild;
    let kanal = kayıt.kayıtkanal;
    let kayıtlı = kayıt.register;
    let aylartoplam = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
    };
    let aylar = aylartoplam;
  
    let user = client.users.cache.get(member.id);
   
  
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const ayyy = moment.duration(kurulus).format("M");
    var kontrol = [];
  
    if (ayyy < 1) {
      kontrol = " :x: **Şüpheli** ";
    }
    if (ayyy > 1) {
      kontrol = ":ballot_box_with_check: **Güvenilir** ";
    }
  
    if (!kanal) return;
  
  
  
  const embed = new EmbedBuilder()
  .setColor("Random")
  
  .setDescription(`
   **Selam Sunucuya  Hoşgeldin** ${member.user}
  
   **Senin Gelmenle Sunucumuz** \`${guild.memberCount}\` **Kişi Oldu**
   
   **Sunucuya Kayıt Olmak İçin Sol Taraftaki <#KAYIT_SES_KANAL_İD> Odalarına Geçiş Yapabilirsin **
  
   **Kayıt Olmak İçin Yetkilileri Beklemelisin** <@&${kayıtlı}>

   **Tagımızı Alarak Bizi Mutlu Edebilirsin** \`${kayıt.tag}\` 
  
   **Hesabın    
   ${aylar[moment(user.createdAt).format("MM")]} ${moment(
    user.createdAt
  ).format(
    "YYYY HH:mm:ss"
   )}  Zamanında Açılmış** 
  ${kontrol} 
  
  `)
  .setThumbnail(
    user.avatarURL({
      dynamic: true,
      format: "gif",
      format: "png",
      format: "jpg",
      size: 2048
    
    
    })
  )
  client.channels.cache.get(kanal).send(`<@&${kayıtlı}>, ${member.user}`)
  client.channels.cache.get(kanal).send({embeds:[embed]})
  })//Furki#0001 Tarafından Kodlandı
  

  client.on("messageCreate", sanctus => {
	if (sanctus.content.toLowerCase() === "tag") {
	  //TAG
	  sanctus.reply(`\`${kayıt.tag}\``);
	}
  });

client.on("messageCreate", sanctus => {
	if (sanctus.content.toLowerCase() === ".tag") {
	  //TAG
	  sanctus.reply(`\`${kayıt.tag}\``);
	}
  });


client.on("messageCreate", sanctus => {
	if (sanctus.content.toLowerCase() === "!tag") {
	  //TAG
	  sanctus.reply(`\`${kayıt.tag}\``);
	}
  });
  ////////////////////////////////////////////////////////////////////////////Furki#0001 Tarafından Kodlandı

  client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = kayıt.sunucu
    const roleID = kayıt.tagrol
    const tag = kayıt.tag
    const chat = kayıt.genelchat 
    const log2 = kayıt.taglog
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new EmbedBuilder().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter({text:'TagRol Sistemi'});
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send({ embeds: [new EmbedBuilder().setDescription(` ${newUser} Tagı  isminden  çıkartarak ailemizden ayrıldı!`)] })
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send({ content: `Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})` })
            client.channels.cache.get(log2).send({ embeds: [new EmbedBuilder().setDescription(`  ${newUser}  İsmine ${kayıt.tag}  Tagını alarak ailemize katıldı`)] })
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "etikettagınız" && newUser.discriminator !== "etikettagınız") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send({ embeds: [new EmbedBuilder().setDescription(`  ${newUser}  etiketinden \`etikettagınız\` çıakrtarak ailemizden ayrıldı!`) ]})
        } else if (oldUser.discriminator !== "etikettagınız" && newUser.discriminator == "etikettagınız") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send({ embeds : [new EmbedBuilder() .setDescription(` ${newUser}  etiketine \`etikettagınız\` alarak ailemize katıldı`) ]})
            client.channels.cache.get(chat).send({ content: `Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#etikettagınız)` })
        }
    }
  })
  //Furki#0001 Tarafından Kodlandı
  client.on('guildMemberAdd', async member => {
    if(member.user.username.includes(kayıt.tag)){
      await member.roles.add(kayıt.taglırolu)
      client.channels.cache.get(kayıt.taglog).send({ embeds: [new MessageEmbed().setDescription(`${member} adlı kişi taglı bir şekilde giriş yaptı`)]})
    }
  })
  ////////////////////////////////////////////////////////////////////////////////////
  client.on("guildMemberAdd" , async member =>{

//Furki#0001 Tarafından Kodlandı
member.roles.add(kayıt.kayıtsız)
member.setNickname(`${kayıt.tag} İsim | Yaş`)


  })

  client.on("guilMemberAdd", async member =>{

    member.roles.add(kayıt.kayıtsız)
    member.setNickname(`${kayıt.tag} İsim | Yaş`)


  })//Furki#0001 Tarafından Kodlandı