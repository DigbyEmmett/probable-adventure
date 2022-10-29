const commands = [
  {
    name: 'smo',
    description: 'Commands to help trace trades and progress',
    options: [
      {
        name: 'trade',
        description: 'Place an order betting the price will go up',
        type: 1, // subcommand
        options: [
          {
            name: 'Symbol',
            description: 'The symbol identifying the security',
            type: 3 // string
            choices: [
              'ETHUSDT','BTCUSDT','ADAUSDT','XRPUSDT','SOLUSDT',
            ],
          },
          {
            name: 'Trigger Price',
            description: 'The price at which the order will trigger',
            type: 10, // double
          },
          {
            name: 'Take Profit',
            description: 'The trigger price to close at profit',
            type: 10
          },
          {
            name: 'Stop Loss',
            description: 'The price to close at loss',
            type: 10
          }
        ]
      },
    ]
  }
];

const HandleCommand(userId, {name,...data}) {
  if( name === 'smo trade' ) {
    
    [trigger, profit, loss] = data.options
    console.log([trigger,profit,loss]);

  }
}

export commands;
