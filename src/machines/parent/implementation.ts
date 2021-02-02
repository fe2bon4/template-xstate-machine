import { MachineOptions, EventObject, State,StateMachine, Actor,assign, spawn, send } from 'xstate'

import { v4 } from 'uuid'

import { spawn as spawnChild } from '../child'

import { 
  Context,
  ActorProducer,
  SpawnableProducer,
 } from './types'


const prepend = () => `${new Date().toISOString()} [Sender]`

export const implementation: MachineOptions<Context,any > = {
  services: {
    interCommService: ({ comm }) => (send) => {

      const  inputHandler = (data: Buffer ) => {
        send({
          type: data.toString().replace(/\n/g,'')
        })
      }

      const messageHandler = (object: EventObject) =>  {
        send( object)
      } 

      comm.on('message', messageHandler ) 

      process.stdin.on('data', inputHandler )

      return () => {
        comm.removeListener('message', messageHandler)
        process.stdin.removeListener('data', inputHandler)
      }
    }
  },
  actions: {
    logInitializing: () => console.log(prepend(), 'Initializing'),
    logIdle: () => console.log(prepend(), 'is now Idle'),
    logCommReady: () => console.log(prepend(), 'is now Idle'),
    logEvent: (_, e ) => console.log(prepend(), e ),
    spawnChild: assign({
      children: ({ children, comm }) => {
        const machine = spawnChild( {
          comm,
          children: {}
        })
        return {
          ...children,
          [v4()]: spawn(machine, { sync: false })
        }
      }
    }) 
  },
  guards: {},
  activities: {},
  delays: {}
}