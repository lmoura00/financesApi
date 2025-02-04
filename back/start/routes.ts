const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
const TransationsController = () => import('#controllers/transations_controller')
const CategoriesController = () => import('#controllers/categories_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('/register', 'users_controller.store')
router.resource('user', UsersController).apiOnly()
router.post('session', [SessionController, 'store'])
router.delete('session', [SessionController, 'destroy'])
router
  .group(() => {
    router.resource('transation', TransationsController).apiOnly()
    router.resource('category', CategoriesController).apiOnly()
  })
  .use(middleware.auth())
