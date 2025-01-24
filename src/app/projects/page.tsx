'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/article`, {
                    method: 'GET',
                });

                if (!response.ok) throw new Error(`Failed to fetch articles: ${response.statusText}`);
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const cleanContent = (content) => {
        return content
            .replace(/#/g, '')
            .replace(/\*/g, '')
            .replace(/\{\{.*?\}\}/g, '')
            .trim();
    };

    return (
        <div>
            <Header />
            <h1 className='gap-4 px-4 max-w-screen-lg mx-auto mb-4 text-[30px]'>Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 max-w-screen-lg mx-auto mb-4">
                {loading && (
                    [...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-gray-300/20 border-[0.5px] border-gray-200 rounded-[14px] p-4 animate-pulse"
                        >
                            <div className="h-32 bg-gray-300 rounded-md mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                        </div>
                    ))
                )}
                {error && <p className="col-span-full text-center">Error: {error}</p>}
                {!loading && !error && articles.length > 0 && (
                    articles.map((article) => (
                        <Link
                            href={`/projects/${article.id}`}
                            key={article.id}
                            className="flex flex-col bg-gray-300/20 border-[0.5px] border-gray-200 rounded-[14px] p-4 transition-transform duration-500 hover:scale-105 group cursor-pointer"
                        >
                            <Image
                                src={article.imagesURL[0]}
                                alt=""
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <div className="mb-4">
                                <h2 className="text-lg font-bold">{article.title}</h2>
                                <h3 className="font-lato font-semibold text-sm">{article.subtitle}</h3>
                                <p className="font-lato font-light text-sm text-sm mb-2 line-clamp-3">
                                    {cleanContent(article.content).split(' ').slice(0, 20).join(' ')}...Read More
                                </p>
                            </div>
                        </Link>
                    ))
                )}
                {!loading && !error && articles.length === 0 && (
                    <p className="col-span-full text-center">No articles available</p>
                )}
            </div>
        </div>
    );
}
