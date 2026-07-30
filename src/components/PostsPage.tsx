import {
    useQueries,
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

function getPostById(id: number) {
    return api.get<Post>(`/posts/${id}`).then((res) => res.data);
}

const postsIds = [1, 2, 3, 4, 5];

function PostsList() {
    const data = useQueries({
        // подгрузка данных с айдишками от 1 до 5
        queries: postsIds.map((id) => ({
            queryKey: ['post', id],
            queryFn: () => getPostById(id),
        })),
    });

    console.log(data);

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
            {/* {data.posts?.map((post) => (
                <div key={post.id}>
                    {post.id}
                    {post.title}
                </div>
            ))} */}
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
