import CommentsController from "#controllers/comments_controller";
import router from "@adonisjs/core/services/router";

router.get('/comments/:postid', [CommentsController, 'index']).as('comments.index');
router.post('/comments/:postid', [CommentsController, 'store']).as('comments.store');