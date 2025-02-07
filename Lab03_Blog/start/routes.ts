/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import PostsController from '../app/controllers/posts_controller.js'

// router.on('/').render('pages/home')
router.on('/').redirectToPath('/posts')
router.get('/posts', [PostsController, 'index']).as('blogs.home')
router.get('/posts/create', [PostsController, 'create'])
router.get('/posts/:id', [PostsController, 'show'])
router.get('/posts/:id/edit', [PostsController, 'edit'])
router.get('/posts/:id/delete', [PostsController, 'destroy'])
router.post('/posts', [PostsController, 'store'])
router.post('posts/:id/update', [PostsController, 'update'])
