
import { State, Actor, StateMachine } from 'xstate'

export interface SpawnableContext {
  [key: string ]: any
}

export interface Dictionary<T> {
  [key: string ]: T
}

export type SpawnableProducer = StateMachine<SpawnableContext, any, any>

export type ActorProducer = Actor<State<SpawnableContext, any>, any >

export interface Context {
  comm: any
  children: Dictionary<any>
}
