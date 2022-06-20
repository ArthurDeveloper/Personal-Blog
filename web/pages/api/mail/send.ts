import { NextApiRequest, NextApiResponse } from 'next';
import transport from '../../../lib/mail';

export default function Send(req: NextApiRequest, res: NextApiResponse) {
    const { from, to, subject, text } = JSON.parse(req.body);
    transport.sendMail({
        from, to, subject, text
    }, (err, data) => {
        if (err) {
            console.log(err);
        }
    });

    return res.status(200).json({ message: 'Email sent' });;
}