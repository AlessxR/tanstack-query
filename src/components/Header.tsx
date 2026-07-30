import { Link } from 'react-router';

export const Header = () => {
    return (
        <>
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
