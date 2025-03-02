/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
import MyOrdersController from '#controllers/my_orders_controller'

router.get('/', ({response}: HttpContext) => {
    response.redirect().toRoute('menus.home')
})
router.get('/menu', [MyOrdersController, 'index']).as('menus.home')
router.get('/menu/:id/take', [MyOrdersController, 'takeOrder']).as('menus.takeOrder')
router.get('/yourOrder', [MyOrdersController, 'yourOrder']).as('menus.yourOrder')
router.get('/yourOrder/:oid/remove', [MyOrdersController, 'removeOrder']).as('menus.removeOrder')
router.get('/yourOrder/:oid/removeAll', [MyOrdersController, 'removeOrderAll']).as('menus.removeOrderAll')