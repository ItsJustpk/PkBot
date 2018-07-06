const Discord = require("discord.js");
const client = new Discord.Client();
const tokens = require("./config.json");
const prefix = "+";
const ms = require("ms");

client.on("ready", () => {
    client.user.setActivity("Imparando...");
    console.log("Online")
});
const commands = {
  'ping': (msg) => {
    msg.channel.send("Pong! " + Math.round(client.ping) + "ms");
  },
  'aiuto': (msg) => {
    msg.channel.send({ embed: { color:0xFF3004,description: 'Controlla i tuoi messaggi privati' + msg.author}})
    msg.author.send({ embed : { color:0xFF3004,description: 'Ciao! Io sono un Bot creato da **ItsJust_pk** e, se vuoi una lista di comandi, digita "+comandi !"'}})
  },
  'ciao': (msg) => {
    msg.channel.send("Ciao, " + msg.author + "!")
  },
  'schifoso': (msg) => {
    msg.channel.send("Non è carino da parte tua :sob:")
  },
  'comandi': (msg) => {
    msg.channel.send(" +ping    +ciao    +aiuto    +schifoso    +infoserver    +spam    +warn(**staff**)     +kick(**staff**)     +banana    +troll(**staff**)    +battuta    +sensodellavita    +saluta [@nome]    +chiama [@nome]    +say(**staff**)     +clear(**staff**)   +domanda [domanda]   +aggjrmod(**staff**)   +rimjrmod(**staff**)")
  },
  'infoserver': (msg) => {
    msg.channel.send("**Nome Server:** " + msg.guild + "   **#ID Server**: " + msg.guild.id + "      **#Chat:** " + msg.guild.channels.size)
  },
  'spam': (msg) => {
    msg.channel.send("**NON** spammare su Discord! :smiley:")
  },
  'kick': (msg) => {
    let user = msg.mentions.members.first();
    if(msg.member.hasPermissions('KICK_MEMBERS')){
      msg.channel.send("è stato kickato l'utente: " + user.user.username);
      user.send("sei stato kickato dal ItsJust_pk Server!")
      user.kick();
    } else {
      msg.channel.send("Non hai i permessi di usare questo comando.");
    }
  },
  'ban': (msg) => {
    let user = msg.mentions.members.first();
    if(msg.member.hasPermissions('BAN_MEMBERS')){
      msg.channel.send("è stato bannato l'utente: " + user.user.username);
      user.send("sei stato bannato su ItsJust_pk Server!")
      user.ban();
    } else {
      msg.channel.send("Non hai i permessi di usare questo comando.");
    }
  },
  'warn': (msg) => {
    let args = msg.content.slice(prefix.length).trim().split(' ');
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Non hai i permessi di usare questo comando");
    let wUser = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
    if(!wUser) return msg.channel.send("Utente non trovato.")
    if(!args[1]) return msg.channel.send("Inserisci un motivo.")
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
      msg.delete();
    let motivo = args.join(" ").slice(22);

    let warnEmbed = new Discord.RichEmbed()
    .setColor("#21ff00")
    .setDescription("**AVVISO**")
    .setAuthor(msg.author.username)
    .addField("Avvisato utente: ", args[1])
    .addField("Motivo: ", "**" + motivo + "**");

    msg.channel.send(warnEmbed);
    wUser.send("Sei stat avvisato per: " + motivo)
    }
  },
  'banana': (msg) => {
      msg.channel.send({ embed: { color:0xDD4545,description: ':banana:I say banana, You say banana. BANANA,banana:banana'}})
  },
  'staff': (msg) =>{
    msg.channel.send("+warn (utente) (motivo)   +mute (utente) (tempo)")
  },
  'domanda': (msg) => {
    let args = msg.content.slice(prefix.length).trim().split(' ');
    if(!args[1]) {
      msg.channel.send("Inserisci una domanda!")
    } else {
    let messaggio = args.join(" ").slice(7);
    let replies = ['Si', 'No', 'Forse', 'Probabilmente si', 'Senti, lasciami in pace!!!', 'Ovviamente!', 'Ma anche no!'];
    let result = Math.floor((Math.random() * 7));


    let oof = replies[result]
    let domandaEmbed = new Discord.RichEmbed()
      .addField("Domanda: ", messaggio)
      .addField("Risposta: ", oof)

    msg.channel.send(domandaEmbed);
  }
  },
  'aggjrmod': (msg) => {
    if(msg.member.hasPermission("MANAGE_ROLES")) {
        let mod = msg.mentions.members.first();
      mod.addRole("464053154607005696")
      msg.channel.send("Dati i permessi do Jr. Mod a " + mod)
    }
  },
  'rimjrmod': (msg) => {
    if(msg.member.hasPermission("MANAGE_ROLES")) {
      let mod = msg.mentions.members.first();
      mod.removeRole("464053154607005696")
      msg.channel.send("Rimossi i permessi do Jr. Mod a " + mod)
    }
  },
  'troll': (msg) => {
    let user = msg.mentions.members.first();
    if(msg.member.hasPermissions('KICK_MEMBERS')){
      msg.channel.send(":joy:troll:joy:")
    } else {
      msg.channel.send("Non hai i permessi di usare questo comando.");
    }
  },
  'battuta': (msg) => {
    let replies = ['Ma se esiste il buio pesto, esiste pure la luce sugo?', 'Vuoi sapere una battuta? CURVA!', 'Come si colpisce un orologio? Col pendolo', 'La marca di trampolini che odia i messicani? La TRUMPolino', 'Qual è il colmo per un ape sulla luna? Andare in luna di miele', 'Il colmo per un astronauta? Avere poco spazio.', 'Se esitono i messicani perchè non esistono i ronaldogatti?'];
    let result = Math.floor((Math.random() * 8));

    let ballembed = new Discord.RichEmbed()
    .addField("**Battuta:**", replies[result])
    .setColor("#FF9900")

    msg.channel.send(ballembed);
  },
  'curiosimc': (msg) => {
    let replies = ['Un enderman prende danno e diventa pacifico a contatto con l\'acqua', 'Il portale del nether può essere spento cliccando con un secchio di acqua alle estremità', 'i drop scivolano sul ghiaccio', 'Ad halloween, i mob hanno delle zucche in testa', 'A natale le chest cambiano texture', 'Se un player sta vicino a una gallina, essa produrrà un uovo ogni 6 minuti', ' I Ghast quando colpiscono mirano alla telecamera non al giocatore, ve ne potete accorgere premendo f5', 'Se un creeper viene ucciso da una freccia sparata da uno scheletro, dropperà un disco musicale', 'Se uno slime cade in acqua non riuscirà più a saltare', ' I blaze e il drago prendono danno dalle palle di neve, 1.5 cuori per il blaze, 0.5 cuori per il drago', 'Se sotto alla soulsand mettiamo del ghiaccio, essa ci rallenterà ancora di più', 'I funghi si possono piantare solo negli spazi bui', 'Raramente potete trovare di blocchi che spawnano silverfish e che si possono romprere con le mani.'];
    let result = Math.floor((Math.random() * 13));

    let curiembed = new Discord.RichEmbed()
    .addField("Lo sapevi che: ", replies[result])
    .setColor("#00FF00")

        msg.channel.send(curiembed);
  },
  'sensodellavita': (msg) => {
    let replies = ['Non lo so.', 'Senti,non posso rispondere.', 'Lasciami in pace!', 'Non ne ha...', 'Essere felici con gli altri e stare bene.', 'Non ho capito, prova a ripetere!', 'PkBot non è disponibile al momento...', '**No**n lo so. T**i** prego **di** **st**a**r**e lontano da me. Ho **u**n o**gge**tto **r**otto sulla mia t**e**sta. **Mo** me ne **v**ad**o**. C**i**ao!'];
    let result = Math.floor((Math.random() * 8));

    let sensembed = new Discord.RichEmbed()
    .addField("** **", replies[result])
    .setColor("#000000")

        msg.channel.send(sensembed);
  },
  'saluta': (msg) => {
    let user = msg.mentions.members.first();
    msg.channel.send("Ciao, " + user.user.username)
  },
  'chiama': (msg) => {
    let user = msg.mentions.members.first();
    msg.channel.send(user.user.username + " apri la chat, please!")
  },
  'mute': (msg) => {
    if(msg.member.hasPermissions("MANAGE_MESSAGES")){
    let args = msg.content.slice(prefix.length).trim().split(' ');
    let member = msg.mentions.members.first();
    if(!member) return msg.reply("Inserisci utente da mutare");
    let time = args[2];
    if(!time) return msg.reply("inserisci un tempo");
    let motivo = args.join(" ").slice(22);
    let val = "oof";
    member.send("Sei stato mutato su da " + msg.author);
    member.addRole("442766208945750026")
    msg.channel.send(member + " é stato mutato per " + time);

    setTimeout(function(){
      member.removeRole("442766208945750026")
      msg.channel.send(member + " è stato smutato!")
    }, ms(time))
  } else {
    msg.channel.send("Non hai i permessi per usare quel comando.")
  }
  }
}
      /*GuildMember#addRole()
      Adds a single role to the member.
      Params
      role RoleResolvable
      The role or ID of the role to add

      [reason] string
      Reason for adding the role
      Returns
      Promise<GuildMember>
      Examples

      // Give a role to a member
      message.member.addRole('193654001089118208')
        .then(console.log)
        .catch(console.error);

        pk: - message.mentions.members holds a collection of members that were mentioned (probably only one, still a collection) -
         collections have a .first() method that acesses the first message - guild.roles has a collection of roles on the guild - collections also have a .find() method to extract an element from a collection (use this to find the role by name)
        - use the method from earlier and combine these to add the role to the mentioned member*/
client.on("message", msg => {
  let args = msg.content.slice(prefix.length).trim().split(' ');
  let command =  args.shift().toLowerCase();
  let mention = msg.mentions.users.first();
  if(command === 'clear') {
  if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if(!args[0]) return msg.channel.send("Inserisci un numero valido! plz")
    msg.channel.bulkDelete(args[0])
    msg.channel.send("Eliminati " + args[0] + " messaggi");
  } else {
    msg.channel.send("Non hai i permessi di usare questo comando!")
  }};
  if(msg.content === ":(") {
    msg.delete();
    msg.channel.send(":slight_frown: " + msg.author)
  };
  if(command === 'say') {
    if(msg.member.hasPermissions("MANAGE_MESSAGES")){
    let say = args.join(' ');
    msg.delete();
    msg.channel.send(say);
  } else {
    msg.channel.send("Non hai i permessi per usare questo comando")
  }
  };
  if(msg.content === ":)") {
    msg.delete();
    msg.channel.send(":slight_smile: " + msg.author)
  };
  if(msg.content === ":3") {
    msg.delete();
    msg.channel.send(":smiley_cat: " + msg.author)
  };
  if(msg.content === "._.") {
    msg.delete();
    msg.channel.send(":confused: " + msg.author)
  };
  if(msg.content === "$D") {
    msg.delete();
    msg.channel.send(":money_mouth: " + msg.author)
  };
  if(msg.content === ":|") {
    msg.delete();
    msg.channel.send(":neutral_face: " + msg.author)
  };
  if(msg.content === ":D") {
    msg.delete();
    msg.channel.send(":smiley: " + msg.author)
  };
  if(msg.content === "xD") {
    msg.delete();
    msg.channel.send(":joy: " + msg.author)
  };
  if(msg.content === "B)") {
    msg.delete();
    msg.channel.send(":sunglasses: " + msg.author)
  };
  if(msg.content === "rip") {
    msg.channel.send("https://giphy.com/gifs/ben-affleck-hello-darkness-my-old-friend-sad-3o7WTqo27pLRYxRtg4 ")
  };
  if(msg.content === "Rip") {
    msg.channel.send("https://giphy.com/gifs/ben-affleck-hello-darkness-my-old-friend-sad-3o7WTqo27pLRYxRtg4 ")
  };
  if(msg.content.includes("coglione")) {
  msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
  msg.channel.send(msg.author + " è stato avvertito!")
  msg.delete();
  };
  if(msg.content.includes("Coglione")) {
  msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
  msg.channel.send(msg.author + " è stato avvertito!")
  msg.delete();
  };
  if(msg.content.includes("cazzo")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content.includes("Cazzo")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content.includes("vaffanculo")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content.includes("Vaffanculo")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content.includes("merda")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content.includes("Merda")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content.includes("porca puttana")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content.includes("Porca puttana")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content.includes("fottiti")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content.includes("Fottiti")) {
msg.author.send({ embed : { color:0xFF3004,description: 'Sei stato avvertito'}})
msg.channel.send(msg.author + " è stato avvertito!")
msg.delete();
};
if(msg.content === "PkBot") {
  msg.channel.send("Si? usa +comandi per sapere cosa posso fare!")
};
if(msg.content === "Pkbot") {
  msg.channel.send("Si? usa +comandi per sapere cosa posso fare!")
};
  if(msg.author.username === "ItsJust_pk") {
    if(msg.content === "ciao")
    msg.channel.send("Ciao, ItsJust_pk!")
  };
    if(msg.content === "Ciao") {
    msg.channel.send("Ciao, " + msg.author)
  };
  if(msg.author.username === "ItsJust_pk") {
    if(msg.content === "No")
    msg.channel.send("ehehehe")
  };
  if(msg.author.username === "ItsJust_pk") {
    if(msg.content === "No")
    msg.channel.send("voleviii")
  };
  if(msg.author.bot) return;
  if(!msg.content.startsWith(tokens.prefix)) return;
  if(commands.hasOwnProperty(msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(tokens.prefix.length).split(" ")[0]] (msg);
});


client.login(process.env.BOT_TOKEN);
