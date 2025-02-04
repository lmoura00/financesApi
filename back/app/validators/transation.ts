import vine from '@vinejs/vine'

export const createTransationValidator = vine.compile(
  vine.object({
    amount: vine.number(),
    description: vine.string(),
    type: vine.number(),
    categoryId: vine.number(),
  })
)

export const updateTransationValidator = vine.compile(
  vine.object({
    amount: vine.number().optional(),
    description: vine.string().optional(),
    type: vine.number().optional(),
    categoryId: vine.number().optional(),
  })
)
