import { useQuery } from '@tanstack/react-query';

import { api } from '../api/api';

type Post = {
    id: number;
    title: string;
};

function getPosts() {
    return api.get<Post[]>('/posts').then((res) => res.data);
}

export const PostsPage = () => {
    const {
        data: posts,
        isLoading,
        isPending,
        isFetching,
        status,
        fetchStatus,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        staleTime: 30000, // 30 секунд, в течение которых данные считаются актуальными и не будут повторно запрашиваться
        gcTime: 60000, // 60 секунд, и данные будут удалены из кэша, ибо они больше не актуальны
    });

    console.log(posts);

    return (
        <div className="flex flex-col gap-4">
            {status}
            {fetchStatus}
            {isLoading && <div>Loading...</div>}
            {isPending && <div>Pending...</div>}
            {isFetching && <div>Fetching...</div>}
            {posts?.map((post) => (
                <div key={post.id}>
                    {post.id}
                    {post.title}
                </div>
            ))}
        </div>
    );
};
