import Post from '#models/post'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Post.createMany([
      {
        title: 'Hello AdonisJS',
        body: 'Adonis includes everything you need to create fully functional web app or an API server.'
      },
      {
        title: 'VueJS',
        body: 'Vue is a progressive framework for building user interfaces.'
      }
    ])
  }
}