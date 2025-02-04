import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from './category.js'

export default class Transation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare amount: number

  @column()
  declare description: string

  @column()
  declare type: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare categoryId: number

  @belongsTo(() => Category)
  declare categories: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
