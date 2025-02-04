import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(256),
    cpf: vine.string().trim().minLength(9).maxLength(15),
    phone: vine.string().trim().minLength(11).maxLength(11),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password: vine.string().minLength(6),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(256).optional(),
    phone: vine.string().trim().minLength(11).maxLength(11).optional(),
    password: vine.string().minLength(6).optional(),
  })
)
