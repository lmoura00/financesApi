import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'
export default class CategoriesController {
  public async index({ response }: HttpContext) {
    try {
      const categories = Category.query()
      return categories
    } catch (error) {
      return response.status(203).json({ error: 'Erro ao buscar' })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.load('transations')
      return response.json(category)
    } catch (error) {
      return response.status(203).json({ error: 'Category not found' })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const { name } = await request.validateUsing(createCategoryValidator)
      const category = await Category.create({
        name,
      })
      return response.status(201).json(category)
    } catch (error) {
      return response.status(203).json({ error: 'Erro ao buscar' })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const category = await Category.findOrFail(params.id)
      const { name } = await request.validateUsing(updateCategoryValidator)
      category.merge({
        name,
      })
      await category.save()
      return response.json(category)
    } catch (error) {
      return response.status(203).json({ error: 'Erro ao buscar' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.delete()
      return response.status(204)
    } catch (error) {
      return response.status(203).json({ error: 'Erro ao buscar' })
    }
  }
}
