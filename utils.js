import { verifyKey } = 'discord-interactions';

const VerifyDiscordRequest = function (clientKey) {
  (req,res,buf,encoding) => {
    const signature = req.get('X-signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad Request Signature');
      throw new Error('Bad request signature');
    }
  };
};

const RegisterCommands = function(appId,guildId,Commands) {
  // get commands currently installed
  const endpoint = `applications/${appID}/guilds/${guildId}/commands`;

  res = await DiscordRequest(endpoint, { method:'GET' });
  data = await res.json();

  commands.map(function (command) {
    if( data ) {
      if( !data.map(c=>c['name']).includes(command) ) {
        console.log('Command already Installed');
      } else {
        console.log(`Installing ${command}...`);
        await DiscordRequest(endpoint, { method: 'POST', body: command });
      }
    }
  }
};

const DiscordRequest = function ( endpoint, options ) {
  const url = 'https://discord.com/api/v10/' + endpoint;

  if( options.body ) options.body = JSON.stringify( options.body );

  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': process.env.USER_AGENT,
    },
    ...options
  };

  if(!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify());
  }
  return res;
}

export DiscordRequest;
export VerifyDiscordRequest;
export RegisterCommands;
