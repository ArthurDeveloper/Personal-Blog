import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import client from '../client';
import groq from 'groq';

type Props = {
    posts: any
}

export default function Posts({ posts }: Props) {
    return (
        <div className="flex flex-col h-full">
            <Head>
                <title>ArthurDev</title>
                <meta name="description" content="ArthurDev's personal blog" />
            </Head>

            <h1 className="text-4xl mt-5 ml-5 mb-5">Posts</h1>

            { posts.length !== 0 ? posts.map((post, index) => {
                return <div className="flex flex-col h-full" key={index}>
                    <Link href={`/post/${post.slug.current}`}>
                        <a>
                            <h3>{post.title}</h3>
                        </a>
                    </Link>
                    <p>{post.excerpt}</p>
                    <span>Published by {post.authorName}</span>
                    {post.authorImage !== "" ?? <Image src={post.authorImage} alt="Author image"/>}
                    <br />
                    {   typeof window !== 'undefined' ??
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span> }
                </div>
            }) : 
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <p className="text-gray-400">There are no posts yet</p>
            </div> }
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
        }
    }
}