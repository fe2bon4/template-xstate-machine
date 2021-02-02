import { MachineOptions, EventObject, State,StateMachine, Actor,assign, spawn, send } from 'xstate'

import { 
  Context,
  ActorProducer,
  SpawnableProducer,
 } from './types'


const prepend = () => `${new Date().toISOString()} [Sender]`

export const implementation: MachineOptions<Context,any > = {
  services: {
    childService: ({ comm }) => (send) => {

      setInterval( () => {
        comm.emit('message',  {
          type: 'CHILD_EVENT',
          payload: {
            foo: 'bar'
          }
        })
      })
    }
  },
  actions: {
    logInitializing: () => console.log(prepend(), 'Initializing'),
    logIdle: () => console.log(prepend(), 'is now Idle'),
    logEvent: (_, e ) => console.log(prepend(), e ),
  },
  guards: {},
  activities: {},
  delays: {}
}