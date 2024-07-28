const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const createRulesEmbed = () => {
    const rulesEmbed = new EmbedBuilder()
        .setTitle('💥 Welcome to the FiTH Gaming Community! 💥')
        .setDescription("If you're new here, please familiarize yourself with these guidelines to ensure everyone has a great experience.\n\n:busts_in_silhouette: **Community Origins:**\nFounded by @g1ggle and @supahcrispy in the early 2000s , FiTH is an EU-based, English-speaking community. However, we welcome members from all over the world. When playing with English-speaking players, please speak English. If you're in a group of non-English speakers, feel free to use your native language.\n\n:underage: **Age Requirement:**\nMost members are over 18 for a mature and respectful environment. Exceptions are rare but possible based on behaviour and maturity. If you're under 18, speak to a leader to see if FiTH is right for you.\n\n:video_game: **Focus on Gaming:**\nWe're a GAMING community, not a streaming promotion hub. Members are here to PLAY. You can share your streams if you're an official FiTH member, but if promoting streams/channels is your main goal, this isn't the place for you.\n\n:scroll: **Guidelines:**\n\n:white_check_mark: **DO:**\nGet involved with the community :handshake:\nTalk to other players :speech_balloon:\nMake and join squads, play with new people :video_game:\nShare content and join discussions in relevant channels :pencil:\nBe as active as possible :joystick:\nTreat everyone with respect :hugging:\nPlay fairly, we're here to game together :trophy:\nWelcome new members and encourage them to get involved :raised_hands:\nHave fun! :tada:\n\n:x: **__DON'T:__**\nAdvertise streams (FiTH members only) \nAdvertise other communities \nHarass/bully other members \nUse in-game cheats or anything that could harm the community, especially if you wear FiTH| tags \nPost content in the wrong channels; use corresponding channels for game content, For anything else, use general \nPlease use common sense to ensure a pleasant experience for everyone. If something feels wrong, it probably is. Anyone causing issues on purpose will be removed.\n\nIf you have any questions, contact @g1ggle or @supahcrispy\nWelcome to the community! Enjoy your stay! :tada:")
        .setColor("#ff0000")
        .setFooter({
            text: "Example Footer",
            iconURL: "https://slate.dan.onl/slate.png",
        })
        .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('accept_button')
            .setLabel('I Accept!')
            .setStyle(ButtonStyle.Success)
            .setEmoji('👍')
    );

    return { embeds: [rulesEmbed], components: [row] };
};

const sendImageAndEmbed = async (channel) => {
    // Send the image first
    await channel.send({
        files: ['https://cdn.discordapp.com/attachments/1267143268500766892/1267177803816763532/rules.png?ex=66a7d6cb&is=66a6854b&hm=c11f0552c43e9f1a7ede0954c4ba79645c5c0c1514a2d933cb8cb1059eccbb33&']
    });

    // Send the embed message
    const { embeds, components } = createRulesEmbed();
    await channel.send({ embeds, components });
};

module.exports = { sendImageAndEmbed };