import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import client from '../client';
import groq from 'groq';
import { useState, useEffect } from 'react';

type Props = {
    posts: any
}

export default function Posts({ posts }: Props) {
    const [isScreenSmall, setIsScreenSmall] = useState(false);

    useEffect(() => {
        function updateScreenSize() {
            if (window.innerWidth < 576) {
                setIsScreenSmall(true);
            } else {
                setIsScreenSmall(false);
            }
        }

        updateScreenSize();

        document.addEventListener('resize', () => {
            updateScreenSize();
        });
    }, []);

    return (
        <div className="flex flex-col h-full">
            <Head>
                <title>ArthurDev</title>
                <meta name="description" content="ArthurDev's personal blog" />
            </Head>

            <h1 className="text-6xl mt-5 ml-5 mb-5 text-center">Posts</h1>

            <div className="flex flex-wrap justify-center w-full h-full px-6">
                { posts.length !== 0 ? posts.map((post, index) => {
                    return <div className="flex flex-col border border-gray-300 rounded-lg w-screen my-2 md:w-1/3 lg:w-1/5 h-64 p-2 sm:m-2 md:m-6 lg:m-12" key={index}>
                        <Link href={`/post/${post.slug.current}`}>
                            <a>
                                <h3 className="text-2xl mb-2 text-cyan-500 hover:underline">{post.title}</h3>
                            </a>
                        </Link>

                        <p>{post.excerpt.length > (isScreenSmall ? 100 : 150) ? 
                            post.excerpt.substr(0, (isScreenSmall ? 100 : 150))+'...' :
                            post.exceprt}
                        </p>
                        
                        <span className="text-sm mt-auto">Published by {post.authorName}</span>

                        {post.authorImage !== "" ?? <Image src={post.authorImage} alt="Author image"/>}

                        {   typeof window !== 'undefined' ??
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span> }
                    </div>
                }) : 
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <p className="text-gray-400">There are no posts yet</p>
                </div> }
            </div>
        </div>

    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const posts = await client.fetch(
        groq`*[_type == "post"]{
            title,
            slug,
            excerpt,
            body,
            publishedAt,
            "categories": categories[]->title,
            "authorName": author->name,
            "authorImage": author->image
          }`
    )

    return {
        props: {
            posts
        },
        revalidate: 3600 // Each hour
    }
}