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
import QaController from '../app/controllers/qa_controller.js'


router.get('/', ({response}: HttpContext) => {
    response.redirect().toPath('/qa')
})
router.get('/qa', [QaController, 'index']).as('qa.home')
router.post('/qa', [QaController, 'store']).as('qa.store')
router.get('/qa/create', [QaController, 'create']).as('qa.create')
router.post('/qa/search', [QaController, 'search']).as('qa.search')
router.post('/qa/:id', [QaController, 'update']).as('qa.update')
router.get('/qa/:id/edit', [QaController, 'edit']).as('qa.edit')
router.get('/qa/:id/delete', [QaController, 'destroy']).as('qa.delete')