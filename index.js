// Load environment variables from .env file
require('dotenv').config();

// Import the discord.js module
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const { sendImageAndEmbed } = require('./embed/rules'); // Import the sendImageAndEmbed function

// Create a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

// The token of your bot - loaded from the .env file
const token = process.env.DISCORD_TOKEN;

// Define the command prefix
const prefix = '/fith';

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

// Listens for messages and responds based on the command
client.on('messageCreate', async message => {
    // If the message is from a bot, ignore it
    if (message.author.bot) return;

    // Check if the message starts with the prefix
    if (!message.content.startsWith(prefix)) return;

    // Remove the prefix from the message and split it into command and args
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Handle different commands
    if (command === 'hello') {
        message.channel.send('Hello, World!');
    } else if (command === 'ping') {
        message.channel.send('Pong!');
    } else if (command === 'bye') {
        message.channel.send('Goodbye!');
    } else if (command === 'clear') {
        // Check if the user has the MANAGE_MESSAGES permission
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('You do not have permissions to manage messages.');
        }

        // Get the number of messages to delete
        const numMessages = parseInt(args[0], 10);

        // Check if the number of messages is valid
        if (isNaN(numMessages) || numMessages <= 0 || numMessages > 99) {
            return message.reply('Please provide a number between 1 and 99.');
        }

        // Delete the messages
        try {
            // Fetch the messages including the command itself
            const fetchedMessages = await message.channel.messages.fetch({ limit: numMessages + 1 });
            await message.channel.bulkDelete(fetchedMessages, true);

            // Send a confirmation message
            message.channel.send(`Successfully deleted ${numMessages + 1} messages.`).then(msg => {
                setTimeout(() => msg.delete(), 5000); // Delete the confirmation message after 5 seconds
            });
        } catch (err) {
            console.error(err);
            message.channel.send('There was an error trying to clear messages in this channel.');
        }
    } else if (command === 'sendrules') {
        try {
            await sendImageAndEmbed(message.channel); // Call the function from rules.js
        } catch (err) {
            console.error('Error sending rules:', err);
            message.channel.send('There was an error sending the rules.');
        }
    } else {
        message.channel.send(`Unknown command: ${command}`);
    }
});

// Handle button interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'accept_button') {
        const roleId = '1267144555912761374'; // Replace with your Verified role ID
        const role = interaction.guild.roles.cache.get(roleId);

        if (!role) {
            return interaction.reply({ content: 'Role not found.', ephemeral: true });
        }

        try {
            // Check if the bot has the MANAGE_ROLES permission
            if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                console.error('Missing MANAGE_ROLES permission');
                return interaction.reply({ content: 'I do not have permission to manage roles.', ephemeral: true });
            }

            // Check if the bot's highest role is higher than the "Verified" role
            const botHighestRole = interaction.guild.members.me.roles.highest;
            if (botHighestRole.comparePositionTo(role) <= 0) {
                console.error('Bot role hierarchy issue');
                return interaction.reply({ content: 'I cannot assign this role due to role hierarchy.', ephemeral: true });
            }

            await interaction.member.roles.add(role);
            await interaction.reply({ content: 'You have been verified!', ephemeral: true });
        } catch (err) {
            console.error('Error assigning role:', err);
            await interaction.reply({ content: 'There was an error assigning the role.', ephemeral: true });
        }
    }
});

// Log in to Discord with your bot's token
client.login(token);
