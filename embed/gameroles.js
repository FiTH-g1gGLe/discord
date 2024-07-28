const { ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

const gamesData = require('./games.json');

module.exports = {
  getEmbed() {
    const embed = {
      content: '',
      tts: false,
      embeds: [
        {
          id: 297564809, // Consider replacing with a dynamic ID
          description: 'Select the roles depending on the games you play and you will be able to receive alerts of new things that are implemented in the game.',
          fields: [], // You can add fields here later for specific game roles
          title: '🎮 Roles for Game Channels'
        }
      ],
      components: []
    };

    const row = new ButtonBuilder()
      .setCustomId('game_roles')
      .setEmoji('🎮');

    for (const game of gamesData.games) {
      const button = new ButtonBuilder()
        .setCustomId(`game_${game.name}`)
        .setLabel(game.name)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(game.emoji);
      row.addComponents(button);
    }

    embed.components.push(row);
    return embed;
  }
};
