const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = '0000000000';  // Replace with your bot token
const PREFIX = '/';  // Command prefix

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;  // Ignore messages from other bots

  const args = message.content.slice(PREFIX.length).trim().split(' ');  // Get the command and args
  const command = args.shift().toLowerCase();

  // Command to assign roles: !assignrole RoleName Username1 Username2 ...
  if (command === '00000000') {   // Replace with command
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      return message.reply('You don’t have permission to assign roles.');
    }

    const roleName = args.shift();  // Get the first argument as the role name
    const usernamesToAssign = args;  // The rest are usernames

    const guild = message.guild;

    if (!roleName || !usernamesToAssign.length) {
      return message.reply('Please provide a role name and at least one username.');
    }

    const role = guild.roles.cache.find(role => role.name === roleName);
    if (!role) return message.reply('Role not found.');

    guild.members.fetch().then(members => {
      usernamesToAssign.forEach(username => {
        const member = members.find(member => member.user.username === username);
        if (member) {
          member.roles.add(role)
            .then(() => message.channel.send(`Role ${roleName} added to ${member.user.username}`))
            .catch(console.error);
        } else {
          message.channel.send(`User ${username} not found.`);
        }
      });
    }).catch(console.error);
  }
});

client.login(TOKEN);
