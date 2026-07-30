import { Outlet } from 'react-router';
import { Header } from './Header';
import { useQuery } from '@tanstack/react-query';

function App() {
    const posts = useQuery({
        queryKey: ['posts'],
        queryFn: () => {
            Promise.resolve([
                { id: 1, title: 'Post1' },
                { id: 2, title: 'Post2' },
                { id: 3, title: 'Post3' },
            ]);
        },
    });

    console.log(posts);

    return (
        <div>
            <Header />
            <div className="w-full max-w-4xl mx-auto p-8">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
