export const config = {
  initial: 'initializing',

  states: {
    initializing: {
      entry: ['logInitializing'],
      invoke: {
        src: 'childService'
      },
      on: {
        '*': {
          actions: ['logEvent']
        }
      }
    },
  },
}