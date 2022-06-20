import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const [formSent, setFormSent] = useState(false);

    async function handleSubmit() {
        await fetch('http://localhost:3000/api/mail/send', {
            method: 'POST',
            body: JSON.stringify({
                from: email,
                to: process.env.NEXT_PUBLIC_AUTH_EMAIL ?? '',
                subject,
                text: content
            })
        });
    }

    return (
        <div className="flex flex-col items-center mt-12">
            <Head>
                <title>Contact</title>
                <meta name="description" content="Contact page" />
            </Head>

            <h1 className="text-5xl">Contact me</h1>

            <form className="flex flex-col items-center mt-12 w-1/2" onSubmit={async (evt) => {
                evt.preventDefault();
                await handleSubmit();
                setFormSent(true);
            }}>
                <input
                    placeholder="Your email"
                    type="email"
                    className="border border-gray-300 rounded p-2 w-full mb-1"
                    onChange={(evt) => {
                        setEmail(evt.target.value);
                    }}
                />
                <textarea
                    placeholder="Subject"
                    className="border border-gray-300 rounded p-2 w-full mb-1 resize-none" 
                    onChange={(evt) => {
                        setSubject(evt.target.value);
                    }}
                />
                <textarea
                    placeholder="Content"
                    className="border border-gray-300 rounded p-2 w-full mb-5 resize-none"
                    rows={7}
                    onChange={(evt) => {
                        setContent(evt.target.value);
                    }}
                />

                <button
                    type="submit"
                    className="bg-cyan-400 disabled:bg-opacity-30 px-3 py-2 rounded transition-all"
                    disabled={formSent ?? (!email ?? !subject ?? !content)}
                >
                    {formSent ? 'Sent!': 'Submit'}
                </button>

                <div className={`bg-lime-300 border border-lime-500 text-lime-500 p-4 rounded mt-5 ${formSent ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                    Email sent succesfully! I will try to respond it ASAP.    
                </div>
            </form>
        </div>
    );
}