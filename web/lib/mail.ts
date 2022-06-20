import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_AUTH_EMAIL ?? '',
        pass: process.env.AUTH_PASSWORD ?? ''
    }
});

export default transport;