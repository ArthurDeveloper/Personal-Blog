import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
    return (
        <div className="flex flex-col items-center">
            <Head>
                <title>About</title>
                <meta name="description" content="About page" />
            </Head>

            <h1 className="text-6xl font-mono mt-8">
                About
            </h1>

            <p className="text-xl text-center mt-8 w-2/3">
                I&rsquo;m a software developer with a passion for building things through
                the means of technology, trying to share my knolwedge with the rest of
                the world through informative posts.
            </p>

            <div className="flex flex-row items-between justify-between mt-12 w-24">
                <a href="https://github.com/arthurdeveloper">
                    <Image src="/github.png" width="32px" height="32px" alt="Github" />
                </a>

                <a href="https://discord.com/users/701244984849989692">
                <Image src="/discord.png" width="35.5px " height="40px" alt="Discord" />
                </a>
            </div>

            <Link href="/contact">
                <a className="text-cyan-400 hover:underline">Send me an email</a>
            </Link>
        </div>
    )
}
