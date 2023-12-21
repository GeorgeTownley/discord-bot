require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
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

client.on("ready", () => {
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

  if (newChannel !== null) {
    const connection = joinVoiceChannel({
      channelId: newChannel.id,
      guildId: newChannel.guild.id,
      adapterCreator: newChannel.guild.voiceAdapterCreator,
    });

    // Set the audio player as the connection's subscriber
    connection.subscribe(audioPlayer);

    // Get the user's ID
    const userId = member.id;

    // Create a mapping of user IDs to sound filenames
    const userSounds = {
      "106131159506763776": "saltydog.mp3",
      "112991619078160384": "MattV.mp3",
      // Add more user IDs and sound filenames as needed
    };

    // Default sound if a specific sound is not found
    const defaultSound = "nukeslegal.mp3";

    // Determine the sound to play based on the user's ID
    const soundToPlay = userSounds[userId] || defaultSound;

    // Load the selected sound as the audio resource
    const resource = createAudioResource(`${soundToPlay}`);
    audioPlayer.play(resource);

    connection.on(VoiceConnectionStatus.Failed, (error) => {
      console.error(error);
    });
  }
});

client.login(process.env.TOKEN);
