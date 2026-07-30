import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '../api/api';

type Post = {
    id: number;
    title: string;
};

function getPosts(signal?: AbortSignal) {
    return api.get<Post[]>('/posts', { signal }).then((res) => res.data);
}

function getAuthData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ userData: {} }), 1500);
    });
}

function getPostById(id: number) {
    return api.get<Post>(`/posts/${id}`).then((res) => res.data);
}

function PostsList() {
    // он достает из контекста queryClient, который был создан в корне приложения и передан через QueryClientProvider
    const queryClient = useQueryClient();

    const {
        data: posts,
        isFetching,
        isLoading,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: ({ signal }) => getPosts(signal),
        retry: false,
    });

    const cancelRequest = () => {
        // отменяет все запросы с queryKey = ['posts']
        queryClient.cancelQueries({ queryKey: ['posts'] });
    };

    console.log(posts);

    // перезапрашивает данные в кэше, но не делает новый запрос на сервер
    // const invalidatePosts = () => {
    //     queryClient.invalidateQueries({ queryKey: ['posts'] });
    // };

    // // делает новый запрос на сервер и обновляет кэш
    // const refetchPosts = () => {
    //     queryClient.refetchQueries({ queryKey: ['posts'] }); // запускает запрос
    // };

    // // сбрасывает кэш и удаляет данные из него
    // const resetQueries = () => {
    //     // Например, при logout из системы
    //     queryClient.resetQueries({ queryKey: ['posts'] }); // удаляет данные из кэша
    // };

    return (
        <div className="flex flex-col gap-4">
            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => refetch()}
            >
                INVALIDATE
            </button>
            {isFetching && <p>Loading...</p>}
            {isLoading && <p>Loading...</p>}
            {isPending && <p>Loading...</p>}
            {posts?.map((post) => (
                <div key={post.id}>
                    {post.id}
                    {post.title}
                </div>
            ))}
        </div>
    );
}

export const PostsPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <PostsList />
        </div>
    );
};
