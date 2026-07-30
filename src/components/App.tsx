import { Outlet } from 'react-router';
import { Header } from './Header';

function App() {
    

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
