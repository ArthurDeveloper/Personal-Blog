import styles from '../styles/Home.module.scss';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import client from '../client';
import groq from 'groq';

type Props = {
    posts: any
}

export default function Posts({ posts }: Props) {
    return (
        <div id={styles['page']}>
            <h1>Posts</h1>

            {posts.map(post => {
                return <div>
                    <Link href={`/post/${post.slug.current}`}>
                        <a>
                            <h2>{post.title}</h2>
                        </a>
                    </Link>
                    <p>{post.excerpt}</p>
                    <span>Published by {post.authorName}</span>
                    {post.authorImage !== "" ?? <Image src={post.authorImage} />}
                    <br />
                    {   typeof window !== 'undefined' ??
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
                </div>
            })}
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