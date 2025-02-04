import Transation from '#models/transation'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Transation.createMany([
      {
        amount: 15.5,
        description: 'Compras',
        type: 1,
        userId: 1,
        categoryId: 1,
      },
      {
        amount: 1500.5,
        description: 'Combustível',
        type: 0,
        userId: 1,
        categoryId: 2,
      },
    ])
  }
}
