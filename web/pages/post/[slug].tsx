import Head from 'next/head';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from '../../client';
import { PortableText } from '@portabletext/react';
import groq from 'groq';

type Props = {
    post: any;
}
export default function Post({ post }: Props) {
    const {
		title = "",
		excerpt = "",
		body = "",
		publishedAt = new Date().getDate(),
		categories = [],
        authorName = "",
        authorImage = ""
	} = post;

    return (
        <div>
			<Head>
				<title>{title}</title>

				<meta name="description" content={excerpt} />
				<meta name="keywords" content={categories.join(', ')} />
			</Head>
            
            <article>
				<header>
                	<h1>{title}</h1>
				</header>

                <span>Published by {authorName}</span>
                {authorImage ?? <Image src={authorImage} />}
                <span>Published at {new Date(publishedAt).toLocaleDateString()}</span>

                <ul>
                    {categories.map(category => 
                        <li key={category}>
                            {category}
                        </li>
                    )}
                </ul>

				<PortableText value={body} />
            </article>
        </div>
    )
}


export const getStaticPaths: GetStaticPaths = async (context) => {
    const paths = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const query = groq`*[_type == "post" && slug.current == $slug][0]{
        title,
        excerpt,
        body,
        publishedAt,
        "categories": categories[]->title,
        "authorName": author->name,
        "authorImage": author->image
      }`;

    const { slug } = context.params;
    const post = await client.fetch(query, { slug });

    return {
        props: {
            post
        }
    }
}