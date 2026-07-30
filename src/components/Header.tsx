import { useIsFetching } from '@tanstack/react-query';
import { Link } from 'react-router';

export const Header = () => {
    // Возвращает количество активных запросов, которые в данный момент выполняются
    const isFetching = useIsFetching();

    return (
        <>
            {isFetching > 0 && (
                <div className="h-10 bg-red-500 w-full absolute top-0 left-0" />
            )}
            <div className="p-4 bg-gray-200 ">
                <div className="max-w-4xl mx-auto flex gap-4 justify-end ">
                    <Link className="underline" to="/users">
                        users
                    </Link>
                    <Link className="underline" to="/posts">
                        posts
                    </Link>
                </div>
            </div>
        </>
    );
};
