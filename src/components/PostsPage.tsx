import { useQuery } from '@tanstack/react-query';

import { api } from '../api/api';

type Post = {
    id: number;
    title: string;
};

let retryCount = 0;

function getPosts() {
    retryCount++;
    console.log(retryCount);
    if (true) {
        throw new Error('TEST ERROR');
    }
    return api.get<Post[]>('/posts').then((res) => res.data);
}

export const PostsPage = () => {
    const {
        data: posts,
        error,
        isError,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        retry: 1,
    });

    console.log(posts);

    return (
        <div className="flex flex-col gap-4">
            {isError && <div>Произошла ошибка: {error.message}</div>}
            {retryCount}
            {posts?.map((post) => (
                <div key={post.id}>
                    {post.id}
                    {post.title}
                </div>
            ))}
        </div>
    );
};
