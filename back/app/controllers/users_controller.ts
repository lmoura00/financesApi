import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async index({}: HttpContext) {
    const users = await User.query().preload('transation')
    return users
  }

  public async store({ request }: HttpContext) {
    const { cpf, email, name, password, phone } = await request.validateUsing(createUserValidator)
    const user = await User.create({ name, cpf, email, password, phone })
    return user
  }

  public async show({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.load('transation')
      return user
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const { name, password, phone } = await request.validateUsing(updateUserValidator)
      const user = await User.findByOrFail('id', params.id)
      user!.merge({ name, password, phone })
      await user!.save()
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }
}
