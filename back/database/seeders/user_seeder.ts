import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        cpf: '000.000.000-00',
        name: 'Teste',
        email: 'teste@gmail.com',
        password: 'secret',
        phone: '+55 (00) 9 0000-0000',
      },
      {
        cpf: '000.000.000-01',
        name: 'Test1',
        email: 'teste1@gmail.com',
        password: 'secret',
        phone: '+55 (00) 9 1111-1111',
      },
    ])
  }
}
