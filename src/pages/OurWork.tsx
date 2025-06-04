
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FileText, Heart, Users, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface OurWorkItem {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  image_url?: string;
  beneficiaries_count?: number;
  date_completed?: string;
  amount_spent?: number;
}

const OurWork = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['our-work'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('our_work')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as OurWorkItem[];
    }
  });

  // Fallback data for when there's no data in the database
  const fallbackProjects: OurWorkItem[] = [
    {
      id: '1',
      title: 'Emergency Relief for Flood Victims',
      location: 'Bardiya District',
      date_completed: '2024-11-15',
      beneficiaries_count: 250,
      description: 'Provided food, clean water, and temporary shelter to flood-affected families.',
      category: 'Emergency Relief',
      image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'School Supplies Distribution',
      location: 'Dolakha District',
      date_completed: '2024-10-20',
      beneficiaries_count: 500,
      description: 'Distributed notebooks, pens, and educational materials to rural school children.',
      category: 'Education',
      image_url: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop'
    }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading our work...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error('Error fetching our work:', error);
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the impact of your donations through our ongoing projects and completed initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <img 
                src={project.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop'} 
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                  {project.beneficiaries_count && (
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.beneficiaries_count} beneficiaries</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {project.date_completed ? new Date(project.date_completed).toLocaleDateString() : 'Ongoing'}
                  </span>
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                {project.amount_spent && (
                  <div className="mt-2 text-sm text-green-600 font-medium">
                    Amount spent: NPR {project.amount_spent.toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OurWork;
