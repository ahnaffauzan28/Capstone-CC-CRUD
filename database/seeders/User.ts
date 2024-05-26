import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import {string} from '@ioc:Adonis/Core/Helpers'
export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        "id": string.generateRandom(32),
        "full_name": 'Admin',
        "username": 'admin',
        "password": 'admin'
      },
      {
        "id": string.generateRandom(32),
        "full_name": 'Aditya Moch A',
        "username": 'aditya',
        "password": 'kontol'
      },
      {
        "id": string.generateRandom(32),
        "full_name": "Alice S",
        "username": 'alice',
        "password": 'secret'
      }
    ])
  }
}
