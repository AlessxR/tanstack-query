import {
    useQuery,
    useSuspenseQueries,
    useSuspenseQuery,
} from '@tanstack/react-query';

import { api } from '../api/api';
import { Suspense } from 'react';

type Post = {
    id: number;
    title: string;
};

function getPosts() {
    return api.get<Post[]>('/posts').then((res) => res.data);
}

function getAuthData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ userData: {} }), 1500);
    });
}

function PostsList() {
    const [{ data: userData }, { data: posts }] = useSuspenseQueries({
        queries: [
            {
                queryKey: ['userData'],
                queryFn: getAuthData,
            },
            {
                queryKey: ['posts'],
                queryFn: getPosts,
            },
        ],
    });

    // const { data: userData } = useSuspenseQuery({
    //     queryKey: ['userData'],
    //     queryFn: getAuthData,
    //     retry: false,
    // });

    // const { data: posts } = useSuspenseQuery({
    //     queryKey: ['posts'],
    //     queryFn: getPosts,
    //     retry: false,
    // });

    return (
        <div className="flex flex-col gap-4">
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
            <Suspense fallback={<h1>Loading posts...</h1>}>
                <PostsList />
            </Suspense>
        </div>
    );
};
