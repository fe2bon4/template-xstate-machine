export const config = {
  initial: 'initializing',

  states: {
    initializing: {
      entry: ['logInitializing'],
      after: {
        10: 'idle'
      }
    },
    idle: {
      entry: ['logIdle', 'spawnChild'],
      invoke: [
        {
          id: 'intercomm',
          src: 'interCommService'
        }
      ],
      on : {
        '*': {
          actions: [ 'logEvent' ]
        }
      }
    },
  },
}