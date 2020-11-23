import { Interpret } from './machines/<machine_name>'

const {
  ENCRYPTION_KEY = "bf3c199c2470cb477d907b1e0917c17b",
  ENCRYPTION_IV = '5183666c72eec9e4'
} = process.env

const service = Interpret({
  encryption: {
    encryption_iv: ENCRYPTION_IV,
    encryption_key: ENCRYPTION_KEY
  }
})

service.start()