require("dotenv").config();
const { Client, IntentsBitField, VoiceState } = require("discord.js");
const {
  createAudioPlayer,
  joinVoiceChannel,
  createAudioResource,
  VoiceConnectionStatus,
} = require("@discordjs/voice");

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
  console.log("The bot is online.");
});

const audioPlayer = createAudioPlayer();

client.on("voiceStateUpdate", (oldState, newState) => {
  const member = newState.member;

  // Check if the member is a bot
  if (member.user.bot) {
    return; // Ignore bot actions
  }

  const oldChannel = oldState.channel;
  const newChannel = newState.channel;

  // check if the member joins a channel - "null" means there was no previous channel id to reference
  if (oldChannel === null && newChannel !== null) {
    const messageContent = `${member.user.tag} joined the voice channel "${newChannel.name}" in ${newChannel.guild.name}.`;
    console.log(messageContent);

    // Get the voice channel the user joined
    const channel = newState.channel;
    if (channel) {
      // Join the voice channel
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      // Set the audio player as the connection's subscriber
      connection.subscribe(audioPlayer);

      const sounds = [
        "nukeslegal.mp3",
        "swmg.mp3",
        "nukingisnowlegal.mp3",
        "smokedoutnukeparty.mp3",
        "thisstuffgarbage.mp3",
        "djsmokeyexclusive.mp3",
      ];
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

      // Load the random sound as the audio resource
      const resource = createAudioResource(randomSound);
      audioPlayer.play(resource);

      connection.on(VoiceConnectionStatus.Failed, (error) => {
        console.error(error);
      });

      connection.on(VoiceConnectionStatus.Failed, (error) => {
        console.error(error);
      });
    }
  }

  // compares old and new channel against null as well as whether the new channel id is the same as the old channel id to make sure the user is moving between channels
  if (
    oldChannel !== null &&
    newChannel !== null &&
    oldChannel.id !== newChannel.id
  ) {
    const messageContent = `${member.user.tag} moved from "${oldChannel.name}" to "${newChannel.name}" in ${newChannel.guild.name}.`;
    console.log(messageContent);

    // Get the voice channel the user joined
    const channel = newState.channel;
    if (channel) {
      // Join the voice channel
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      // Set the audio player as the connection's subscriber
      connection.subscribe(audioPlayer);

      const sounds = [
        "nukeslegal.mp3",
        "swmg.mp3",
        "nukingisnowlegal.mp3",
        "smokedoutnukeparty.mp3",
        "thisstuffgarbage.mp3",
        "djsmokeyexclusive.mp3",
      ];
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

      // Load the random sound as the audio resource
      const resource = createAudioResource(randomSound);
      audioPlayer.play(resource);

      connection.on(VoiceConnectionStatus.Failed, (error) => {
        console.error(error);
      });
    }
  }
});

const { generateDependencyReport } = require("@discordjs/voice");
console.log(generateDependencyReport());

client.login(process.env.TOKEN);

const restartInterval = 20 * 60 * 1000; // 20 minutes in milliseconds

setInterval(() => {
  console.log("Restarting the bot...");
  client.destroy();
  client.login(process.env.TOKEN);
}, restartInterval);
