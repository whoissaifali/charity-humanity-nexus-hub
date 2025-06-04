
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FileText, Heart, Users, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const OurWork = () => {
  const projects = [
    {
      id: 1,
      title: 'Emergency Relief for Flood Victims',
      location: 'Bardiya District',
      date: '2024-11-15',
      beneficiaries: 250,
      description: 'Provided food, clean water, and temporary shelter to flood-affected families.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'School Supplies Distribution',
      location: 'Dolakha District',
      date: '2024-10-20',
      beneficiaries: 500,
      description: 'Distributed notebooks, pens, and educational materials to rural school children.',
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop'
    }
  ];

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
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <img 
                src={project.image} 
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
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{project.beneficiaries} beneficiaries</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{project.date}</span>
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
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
