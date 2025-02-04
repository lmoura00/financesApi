import type { HttpContext } from '@adonisjs/core/http'
import Transation from '#models/transation'
import { createTransationValidator, updateTransationValidator } from '#validators/transation'

export default class TransationsController {
  public async index({ auth }: HttpContext) {
    const user = auth.user!
    await user.preload('transation')
    return user.transation
  }

  public async store({ auth, request, response }: HttpContext) {
    try {
      const { amount, categoryId, description, type } =
        await request.validateUsing(createTransationValidator)
      const user = auth.user!
      await user.related('transation').create({
        amount,
        categoryId,
        description,
        type,
        userId: user.id,
      })
      return {
        description,
        amount,
        type,
        categoryId,
      }
    } catch (error) {
      response.status(400).json({ error: error.messages })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const transation = await Transation.findByOrFail('id', params.id)
      return transation
    } catch (error) {
      return response.status(400).json({ error: 'Transation not found' })
    }
  }
  //até aqui ok

  public async update({ params, request, response }: HttpContext) {
    try {
      const transation = await Transation.findByOrFail('id', params.id)
      const { amount, categoryId, description, type } =
        await request.validateUsing(updateTransationValidator)
      transation.merge({ amount, categoryId, description, type })
      await transation.save()
    } catch (error) {
      return response.status(400).json({ error: 'Transation not found' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const transation = await Transation.findByOrFail('id', params.id)
      await transation.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({ error: 'Transation not found' })
    }
  }
}
