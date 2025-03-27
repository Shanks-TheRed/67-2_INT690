import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post';
import Comment from '#models/comment';
import { commentValidator } from '#validators/comment';

export default class CommentsController {
    async index({params, view}: HttpContext) {
        const postid = params.postid;
        const post = await Post.find(postid);
        await post?.load('comments');
        return view.render('comments/comments', {post: post});
    }

    async store({params, request, response}: HttpContext) {
        const postid = params.postid;
        const data = await request.validateUsing(commentValidator);
        if(data.poster && data.comment) {
            const comment = await Comment.create({
                postId: postid,
                poster: data.poster,
                comment: data.comment
            });
        }
        response.redirect().toRoute('comments.index', {postid: postid});
    }
}