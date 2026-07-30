import { useQuery } from '@tanstack/react-query';

import { api } from '../api/api';

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

export const PostsPage = () => {
    const isAuth = false;

    const { data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: getAuthData,
        retry: false,
    });

    const { data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        retry: false,
        enabled: !!userData,
    });

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
};
