import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Video, Plus, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const videoFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  platform: z.string().min(1, 'Platform is required'),
  videoSource: z.string().min(1, 'Video source is required'),
  publishDate: z.string().min(1, 'Publish date is required'),
  thumbnailUrl: z.string().optional(),
  topic: z.string().optional(),
});

type VideoFormData = z.infer<typeof videoFormSchema>;

export default function VideoForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Only show the form to admin users
  const isAdmin = (user as any)?.role === 'admin';

  if (!isAdmin) {
    return null;
  }

  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: '',
      description: '',
      platform: 'YouTube',
      videoSource: '',
      publishDate: new Date().toISOString().split('T')[0],
      thumbnailUrl: '',
      topic: '',
    },
  });

  const createVideoMutation = useMutation({
    mutationFn: async (data: VideoFormData) => {
      const youtubeMatch = data.videoSource.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
      const youtubeId = youtubeMatch ? youtubeMatch[1] : null;
      
      let embedUrl = '';
      let thumbnailUrl = data.thumbnailUrl || '';
      
      if (data.platform === 'YouTube') {
        if (youtubeId) {
          embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
          if (!thumbnailUrl) {
            thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
          }
        } else {
          embedUrl = data.videoSource;
        }
      } else {
        embedUrl = data.videoSource;
      }

      const mediaItem = {
        type: 'video',
        title: data.title,
        description: data.description,
        publishDate: data.publishDate,
        platform: data.platform,
        embedUrl,
        externalUrl: data.videoSource,
        thumbnailUrl,
        topic: data.topic || 'General',
        featured: false,
      };

      return apiRequest('/api/media', {
        method: 'POST',
        body: JSON.stringify(mediaItem),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      toast({
        title: 'Success',
        description: 'Video added successfully!',
      });
      form.reset();
      setIsFormOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add video',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: VideoFormData) => {
    createVideoMutation.mutate(data);
  };

  if (!isFormOpen) {
    return (
      <div className="flex justify-center mb-8">
        <Button
          onClick={() => setIsFormOpen(true)}
          size="lg"
          className="gap-2"
          data-testid="button-add-video"
        >
          <Plus className="h-5 w-5" />
          Add New Video
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Video className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Add New Video</CardTitle>
              <CardDescription>Share a video with your audience</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsFormOpen(false)}
            data-testid="button-cancel-video"
          >
            Cancel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., How to Build AI Automation" 
                      {...field} 
                      data-testid="input-video-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the video content..."
                      className="min-h-[80px]"
                      {...field}
                      data-testid="input-video-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-video-platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="Vimeo">Vimeo</SelectItem>
                        <SelectItem value="Direct">Direct Link</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        {...field} 
                        data-testid="input-video-publish-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., AI, Marketing, Sales" 
                      {...field} 
                      data-testid="input-video-topic"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL or YouTube ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YouTube URL, video ID, or direct video link"
                      {...field}
                      data-testid="input-video-source"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Leave empty for auto-generated YouTube thumbnail"
                      {...field}
                      data-testid="input-video-thumbnail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                data-testid="button-cancel-form"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createVideoMutation.isPending}
                data-testid="button-submit-video"
              >
                {createVideoMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Video
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
