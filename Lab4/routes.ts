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
import PostsController from '../app/controllers/posts_controller.js'

router.get('/', ({response}: HttpContext) => {
    response.redirect().toPath('/posts')
}) 
router.get('/posts', [PostsController, 'index']).as('posts.home')
router.get('/posts/create', [PostsController, 'create']).as('posts.create')
router.get('/posts/:id', [PostsController, 'show']).as('posts.show')
router.get('/posts/:id/edit', [PostsController, 'edit']).as('posts.edit')
router.get('/posts/:id/delete', [PostsController, 'destroy']).as('posts.delete')
router.post('/posts', [PostsController, 'store']).as('posts.store')
router.post('/posts/:id/update', [PostsController, 'update']).as('posts.update')
