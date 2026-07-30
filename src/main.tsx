import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { UsersPage } from './components/UsersPage.tsx';
import { PostsPage } from './components/PostsPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './components/App.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// initialize tanstackquery
const queryClient = new QueryClient({
    // defaultOptions: {
    //     queries: {
    //         staleTime: 3000,
    //     },
    // },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/posts" element={<PostsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
);
