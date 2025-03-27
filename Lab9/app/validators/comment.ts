import vine, { SimpleMessagesProvider } from '@vinejs/vine'


const schema = vine.object({
    poster: vine.string().trim().maxLength(15),
    comment: vine.string()
});

vine.messagesProvider = new SimpleMessagesProvider({
    'required': 'The {{ field }} field is required',
    'string': 'The value of {{ field }} field must be a string',
    'poster.maxLength': 'The value of {{ field }} field must less than 15 character',
});

export const commentValidator = vine.compile(schema);