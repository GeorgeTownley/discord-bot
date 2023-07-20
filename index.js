require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

client.on("ready", (c) => {
  console.log("The bot is ready to flame the server.");
});

client.on("voiceStateUpdate", (oldState, newState) => {
  const member = newState.member;
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;

  // Check if the member joined a voice channel
  if (oldChannel === null && newChannel !== null) {
    const messageContent = `${member.user.tag} joined the voice channel "${newChannel.name}" in ${newChannel.guild.name}.`;
    console.log(messageContent);

    // Send the chat message
    const textChannel = client.channels.cache.get("699728349861249028");
    if (textChannel) {
      textChannel
        .send(messageContent)
        .then((message) => console.log("Chat message sent:", message.content))
        .catch(console.error);
    }
  }

  // Check if the member moved to a different voice channel
  if (
    oldChannel !== null &&
    newChannel !== null &&
    oldChannel.id !== newChannel.id
  ) {
    const messageContent = `${member.user.tag} moved from "${oldChannel.name}" to "${newChannel.name}" in ${newChannel.guild.name}.`;
    console.log(messageContent);

    // Send the chat message
    const textChannel = client.channels.cache.get("699728349861249028");
    if (textChannel) {
      textChannel
        .send(messageContent)
        .then((message) => console.log("Chat message sent:", message.content))
        .catch(console.error);
    }
  }
});

client.login(process.env.TOKEN);
