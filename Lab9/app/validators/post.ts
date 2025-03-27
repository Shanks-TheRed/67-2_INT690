import vine, { SimpleMessagesProvider } from '@vinejs/vine'


const schema = vine.object({
    title: vine.string().trim().minLength(6).maxLength(50),
    body: vine.string().trim()
});

vine.messagesProvider = new SimpleMessagesProvider({
    'required': 'The {{ field }} field is required',
    'string': 'The value of {{ field }} field must be a string',
    'title.minLength': 'The value of {{ field }} field must more than 6 character',
    'title.maxLength': 'The value of {{ field }} field must less than 50 character',
});

export const createPostValidator = vine.compile(schema);