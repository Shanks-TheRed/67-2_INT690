import type { HttpContext } from '@adonisjs/core/http'

interface QandA {
    id: number;
    question: string;
    answer: string;
}

let lastID: number = 1

const qas: QandA[] = [
    {
        id: lastID++,
        question: 'What is AdonisJS?',
        answer: `AdonisJS is a TypeScript-first web framework for building web apps and API servers.\nIt comes with support for testing, modern tooling, an ecosystem of official packages, and more.\nTypeScript 16.6k 630. lucid Public. AdonisJS SQL ORM.`
    },
    {
        id: lastID++,
        question: 'What is the difference between AdonisJS and NestJS',
        answer: `AdonisJS is written in JavaScript and is built on top of the Node. js runtime,\nmaking it highly suitable for server-side applications. On the other hand, Nest]S is written\nin TypeScript, a statically-typed superset of JavaScript, which offers enhanced tooling and\ncompile-time checks.`
    }
]

export default class QaController {
    async index({view}: HttpContext) {
        return view.render('pages/qa', {qas: qas});
    }

    async store({request, response}: HttpContext) {
        const question = request.input('question');
        const answer = request.input('answer');
        const NewID = lastID++
        const newQA: QandA = {id: NewID, question: question, answer: answer};
        qas.push(newQA);
        response.redirect().toRoute('qa.home');
    }

    async create({view}: HttpContext) {
        return view.render('pages/qa_form')
    }

    async update({params, request, response}: HttpContext) {
        const id = params.id;
        const index = qas.findIndex( p => p.id == Number(id) );
        qas[index].question = request.input('question')
        qas[index].answer = request.input('answer');
        response.redirect().toRoute('qa.home');
    }

    async edit({params, view}: HttpContext) {
        const id = params.id;
        const qa = qas.find( p => p.id == Number(id) );
        return view.render('pages/qa_form', {qa: qa});
    }

    async destroy({params, response}: HttpContext) {
        const id = params.id;
        const index = qas.findIndex( p => p.id == Number(id) );
        qas.splice(index, 1);
        response.redirect().toRoute('qa.home');
    }

    async search({view, request}: HttpContext) {
        const txtSearch = request.input('txtSearch');
        const newArr = [];
        for(let i=0; i<qas.length; i++) {
            let found = qas[i].question.indexOf(txtSearch);
            if(found != -1) {
                newArr.push(qas[i])
            }
        } console.log(newArr)
        return view.render('pages/qa', {qas: newArr})
    }
}