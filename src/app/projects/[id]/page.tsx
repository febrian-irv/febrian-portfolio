'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';

function markdownToHTML(markdown, imageUrls) {
    let imageIndex = 0;

    markdown = markdown.replace(/\{\{image\}\}/g, () => {
        const src = imageUrls[imageIndex] || "";
        imageIndex++;
        return `<img src="${src}" alt="" class="w-full max-w-md rounded-lg mx-auto" />`;
    });

    markdown = markdown.replace(/^### (.+)$/gm, "<h3 class='text-[19px] font-serif'>$1</h3>");
    markdown = markdown.replace(/^## (.+)$/gm, "<h2 class='text-[25px] font-serif'>$1</h2>");

    markdown = markdown.replace(/^\- (.+)$/gm, "<ul><li>$1</li></ul>");

    markdown = markdown.replace(/<\/ul>\n<ul>/g, "");

    markdown = markdown.replace(/`([^`]+)`/g, "<code>$1</code>");

    markdown = markdown.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    markdown = markdown.replace(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' target='_blank' rel='noopener noreferrer' class='text-blue-500 underline'>$1</a>");

    markdown = markdown.replace(/([^\n]+)\n\n/g, "<p>$1</p>\n");

    markdown = markdown.replace(/\n/g, "<br>");

    return `<div>${markdown}</div>`;
}

export default function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/article/${id}`, {
                    method: 'GET',
                });

                if (!response.ok) throw new Error(`Failed to fetch article: ${response.statusText}`);
                const data = await response.json();
                setArticle(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    return (
        <div>
            <Header />
            <div className="article-container px-4 sm:px-6 lg:px-8">
                {loading && (
                    <div className="animate-pulse space-y-4 p-4 sm:p-6 lg:p-10 bg-gray-300/20 font rounded-[14px] border-white border-[0.5px] mx-auto max-w-4xl">
                        <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
                        <div className="flex space-x-2">
                            <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                            <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                            <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-300 rounded"></div>
                            <div className="h-4 w-full bg-gray-300 rounded"></div>
                            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                )}
                {error && <p className="text-red-500 text-center">Error: {error}</p>}
                {!loading && !error && article && (
                    <div className="bg-gray-300/20 p-4 sm:p-6 lg:p-10 font rounded-[14px] mb-10 mx-auto max-w-4xl border-white border-[0.5px]">
                        {article.tags && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="font-bold">Tags & Tech:</span>
                                {article.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="px-3 py-1 bg-gradient-to-r from-rose-900 to-blue-900 font-lato text-sm rounded-full"
                                    >
                                        {tag.tagName}
                                    </span>
                                ))}
                            </div>
                        )}
                        <h1 className="text-[24px] sm:text-[28px] lg:text-[30px]">{article.title}</h1>
                        <h2 className="text-[16px] sm:text-[18px] lg:text-[20px] font-lato font-light mb-4">
                            {article.subtitle}
                        </h2>
                        <div
                            className="font-lato font-light text-sm sm:text-base"
                            dangerouslySetInnerHTML={{
                                __html: markdownToHTML(article.content, article.imagesURL || []),
                            }}
                        />
                    </div>
                )}
                {!loading && !error && !article && (
                    <p className="text-center text-gray-500">Article not found.</p>
                )}
            </div>
        </div>
    );
}