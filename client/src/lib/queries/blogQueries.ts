import { useQuery } from '@tanstack/react-query';

export interface BlogPostAPI {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  tags: string[] | null;
  category: string | null;
  status: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isAutomated: boolean;
}

export function useBlogPosts() {
  return useQuery<BlogPostAPI[]>({
    queryKey: ['/api/blog-posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog-posts?status=published');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery<BlogPostAPI>({
    queryKey: ['/api/blog-posts', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json();
    },
    enabled: !!slug,
  });
}
