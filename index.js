import express from 'express';
import { InteractionType } from 'discord-interactions';
import { commands, HandleCommand } from './commands.js';
import { VerifyDiscordRequest, RegisterCommands } form './utils.js';

const app = express();

app.post( '/interactions',
  express.json({verify:VerifyDiscordRequest(process.env.PUBLIC_KEY)}),
  function (req, res) {
    const { type, id, data } = req.body;

    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG } );
    }

    if (type === InteractionType.APPLICATION_COMMAND) {

      HandleCommand( id, data );

    }
  }
);

app.listen(process.env.PORT,function() {
  console.log('Server Started');

  RegisterCommands(
    process.env.APP_ID,
    process.env.GUILD_ID,
    [ ... commands ]
  );
});
