
let express = require('express');
let app = express();
let port = process.env.PORT || 3000 ; // process.env.PORT comes from environment variables,if it's undefined value of port will be 3000
let Discord = require('discord.js');
let dotenv = require('dotenv');
let client = new Discord.Client(); // Creating our client
let fetch = require('node-fetch');
let randomPuppy = require('random-puppy');
dotenv.config();
// When bot is connected  log this message;
// client.once('ready',()=>{
//   console.log('Hello people');
// })

// Ok so at this moment we have some functionalities implemented  : kick,ban,unban
// ,random greeting message,fetching api data and embedding it
// Bot status and message reactions
client.once('ready',()=>{
  client.user.setActivity('to dope music', { type: 'Listening' });
})

// let's make the bot write a new message when we type in  a command
// Let's try setting up our bot's activity
client.on('message',async(message)=>{
  if(message.content.startsWith(`${process.env.PREFIX}greet`)) //  message.content is the content of the message user has typed and we're checking if it starts with Hi
  {
    let randomMessages = ['Hello','Hi','Hola','Yo'];
    let randIndex = Math.floor(Math.random()*randomMessages.length);  // Math.random() generates a random number between 0 and 1
    //  (I think this was the range )  then we multiply that value to our array length  so for example :  0.3*4 but we can't use this
    // as an index so we need to use Math.floor() which rounds our number to the lowest value
    // Math.floor(1.2)  is 1   Math.ceil(1.2) is 2   for ceil it rounds to the highest value (but we don't need it atm)
    message.channel.send(randomMessages[randIndex]); // Reply back hello
    if(message.content)
    {
    message.react('😄');
    }

    }

  if(message.content.startsWith(`${process.env.PREFIX}meme`)){
try{
// Choosing a subreddit
const subReddits = ["dankmeme","meme","me_irl"];
// Again generating a random index
let randIndex = Math.floor(Math.random()*subReddits.length);
// Random subreddit
const random = subReddits[randIndex]; // random type of meme
const img = await randomPuppy(random); // getting an image according to the type of meme so either dankmeme ,meme or me_irl
// Setting up an embed
const embed = new Discord.MessageEmbed().setColor("RANDOM").setImage(img).setTitle(`With love`).setURL(`https://imgur.com/${random}`);

message.channel.send(embed);
}
catch(e){
console.log(e);
}
}

// Send back user avatar URL
  if (message.content.startsWith(`${process.env.PREFIX}avatar`)) { // With this command we can make the bot reply to us
    // Send the user's avatar URL back to the client
    message.reply(`${message.author} has requested  the avatar of ${ message.mentions.members.first()}Url : ${message.author.displayAvatarURL()}`);
      // Then get the user avatar of the message author
  }

// Kick and ban functionality
if (message.member.hasPermission("ADMINISTRATOR")) { // Checks if user is an administrator

if (message.content.startsWith(`${process.env.PREFIX}unbanall`)) {
// Unbanning users -   Guild.fetchBans() to retrieve a Collection of banned users
  message.guild.fetchBans().then(bans => {
    bans.forEach(banInfo => {
      message.guild.members.unban(banInfo.user); // Looping through the collection and unbanning the users
    });
    message.channel.send(`Unbanned **${bans.size}** users`) // Displaying the amount of users unbanned;
  })
}


  if(message.content.startsWith(`${process.env.PREFIX}kick`))
  {
    let userMentioned = message.mentions.members.first();
    userMentioned.kick().then(()=>{message.channel.send(`${userMentioned} has been kicked for violating the rules.`)});
  }

  if(message.content.startsWith(`${process.env.PREFIX}ban`))
  {
    let userMentioned = message.mentions.members.first();
    userMentioned.ban().then(()=>{message.channel.send(`${userMentioned} has been banned for violating the rules.`)});
  }
}

// Anime API
  if(message.content.startsWith(`${process.env.PREFIX}anime`))
  {
    let animeChoice = message.content.split(' ')[1]; // E.g  !anime Naruto    ['!anime',Naruto]  [1] is the 2nd element
    fetch(`https://kitsu.io/api/edge/anime?filter[text]=${animeChoice}`).then((response) => {return response.json();} )
      .then((info)=>{
  let attributesData = info.data[0].attributes;
        const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')  // Oops xD
	.setTitle(attributesData.titles.en)
	.setURL('https://discord.js.org/')
	.setDescription(info.data[0].attributes.synopsis)
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Rating rank', value:attributesData.ratingRank },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Youtube link:', value:`https://www.youtube.com/watch?v=${attributesData.youtubeVideoId}`, inline: true },
		{ name: 'Age rating guide : ', value:attributesData.ageRatingGuide, inline: true },
	)
	.addField('Status',attributesData.status, true)
	.setImage(attributesData.posterImage.small)
	.setTimestamp(attributesData.posterImage.small)

  message.channel.send(exampleEmbed)
      })

  }
})
// Let's change bot avatar
// Ctrl+r to see changes

// Let's create our bot;

// For the token we're using an environment variable
client.login(process.env.BOT_TOKEN); // A  token is something we'll be using to login the bot to discord
// app.listen(port,()=>console.log('Listening to the server'));
// That's all guys for now.Hope you had fun.If you liked this video don't forget to like & share & subscribe;
