import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import { useParams } from 'react-router';

type Post = {
    id: number;
    title: string;
};

function getPostById(id: number) {
    return api.get<Post>(`/posts/${id}`).then((res) => res.data);
}

// id, title, description. comments, view, ...etc
export const PostDetails = () => {
    const queryClient = useQueryClient();
    
    const { id } = useParams();
    const { data: post } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostById(Number(id)),
    });

    return (
        <div>
            {post?.id}
            {post?.title}
        </div>
    );
};
