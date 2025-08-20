import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Save, Eye, Calendar } from "lucide-react";
import { blogCategories, BlogPost } from "@/data/blog-posts";

export default function BlogAdmin() {
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Fusion Data Co Team',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    readTime: '5 min read',
    category: 'AI Strategy',
    image: '/api/placeholder/800/400',
    featured: false,
    slug: '',
    tags: [],
    seo: {
      metaDescription: '',
      keywords: []
    }
  });

  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setNewPost(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && newPost.tags && !newPost.tags.includes(tagInput.trim())) {
      setNewPost(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && newPost.seo?.keywords && !newPost.seo.keywords.includes(keywordInput.trim())) {
      setNewPost(prev => ({
        ...prev,
        seo: {
          ...prev.seo!,
          keywords: [...(prev.seo?.keywords || []), keywordInput.trim()]
        }
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setNewPost(prev => ({
      ...prev,
      seo: {
        ...prev.seo!,
        keywords: prev.seo?.keywords?.filter(keyword => keyword !== keywordToRemove) || []
      }
    }));
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleContentChange = (content: string) => {
    setNewPost(prev => ({
      ...prev,
      content,
      readTime: estimateReadTime(content)
    }));
  };

  const savePost = () => {
    if (!newPost.title || !newPost.content || !newPost.excerpt) {
      alert('Please fill in all required fields: title, excerpt, and content.');
      return;
    }

    const postData = {
      ...newPost,
      id: newPost.slug,
      seo: {
        metaDescription: newPost.seo?.metaDescription || newPost.excerpt,
        keywords: newPost.seo?.keywords || []
      }
    };

    // In a real app, this would save to your backend/database
    console.log('Saving new blog post:', postData);
    alert('Blog post saved! (In a real app, this would save to your database)');
    
    // Reset form
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      author: 'Fusion Data Co Team',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: '5 min read',
      category: 'AI Strategy',
      image: '/api/placeholder/800/400',
      featured: false,
      slug: '',
      tags: [],
      seo: {
        metaDescription: '',
        keywords: []
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog Admin - Create New Post | Fusion Data Co</title>
        <meta name="description" content="Create and manage blog posts for Fusion Data Co marketing automation platform." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Header */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-accent/5">
            <div className="container mx-auto">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Blog Administration
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Create and publish new blog posts for the Fusion Data Co platform.
                </p>
              </div>
            </div>
          </section>

          {/* Blog Post Form */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Create New Blog Post
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below to create a new blog post. All fields marked with * are required.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={newPost.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter blog post title..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={newPost.author}
                        onChange={(e) => setNewPost(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={newPost.category} onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {blogCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={newPost.readTime}
                        onChange={(e) => setNewPost(prev => ({ ...prev, readTime: e.target.value }))}
                        placeholder="5 min read"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="featured">Featured Post</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Switch
                          id="featured"
                          checked={newPost.featured}
                          onCheckedChange={(checked) => setNewPost(prev => ({ ...prev, featured: checked }))}
                        />
                        <Label htmlFor="featured">Mark as featured</Label>
                      </div>
                    </div>
                  </div>

                  {/* Slug Preview */}
                  {newPost.slug && (
                    <div className="space-y-2">
                      <Label>URL Slug (auto-generated)</Label>
                      <div className="p-3 bg-muted rounded-md">
                        <code>/blog/{newPost.slug}</code>
                      </div>
                    </div>
                  )}

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description of the blog post..."
                      rows={3}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Content * (Markdown supported)</Label>
                    <Textarea
                      id="content"
                      value={newPost.content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Write your blog post content here... (Markdown formatting supported)"
                      rows={15}
                      className="font-mono"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newPost.tags?.map(tag => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* SEO */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">SEO Settings</h3>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={newPost.seo?.metaDescription}
                        onChange={(e) => setNewPost(prev => ({
                          ...prev,
                          seo: { ...prev.seo!, metaDescription: e.target.value }
                        }))}
                        placeholder="SEO meta description (leave blank to use excerpt)..."
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>SEO Keywords</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          placeholder="Add SEO keyword..."
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                        />
                        <Button type="button" onClick={addKeyword}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {newPost.seo?.keywords?.map(keyword => (
                          <Badge key={keyword} variant="outline" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                            {keyword} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Will be published on: {newPost.date}</span>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button onClick={savePost}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}