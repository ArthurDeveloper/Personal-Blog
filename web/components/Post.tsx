import styles from '../styles/Post.module.scss';

type Props = {
    data: {},
    content: string
}
export default function Post({ data, content }) {
    return (
        <div className={styles['post']}>
            <h1 style={{ marginTop: '0.2em', marginBottom: '0.01em' }}>{data.title}</h1>
            <div
                dangerouslySetInnerHTML={{ __html: data.excerpt }}
                className={styles['post-excerpt']}
            />

            <span>Created at: {data.creationDate}</span><br/>
            <span>Last update: {data.lastUpdate}</span>
            <div dangerouslySetInnerHTML={{__html: content}} />

            <span>Likes: {data.likes}</span>
        </div>
    )
}