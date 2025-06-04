
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Shield, TrendingUp, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-blue-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-red-600">
                <Heart className="h-5 w-5 fill-current" />
                <span className="text-sm font-semibold uppercase tracking-wider">Transparent Charity</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Making a
                <span className="text-red-600 block">Difference</span>
                Together
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                CharityHumanity Nepal is a transparent charity platform where every donation is tracked, 
                every transaction is visible, and every rupee reaches those who need it most.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 bg-white p-4 rounded-xl shadow-sm border">
                <Shield className="h-8 w-8 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900">100% Transparent</div>
                  <div className="text-sm text-gray-600">Every transaction visible</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white p-4 rounded-xl shadow-sm border">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-900">Real-time Tracking</div>
                  <div className="text-sm text-gray-600">Monitor your impact</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white p-4 rounded-xl shadow-sm border">
                <Globe className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="font-semibold text-gray-900">Global Reach</div>
                  <div className="text-sm text-gray-600">Help from anywhere</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                <Heart className="h-5 w-5 mr-2 fill-current" />
                Donate Now
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2">
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Lives Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">₹2.5M+</div>
                <div className="text-sm text-gray-600">Total Donations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">15</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Transparent</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop"
                alt="Children receiving help"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Active Now</div>
                  <div className="text-sm text-gray-600">23 donations today</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-600 fill-current" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Impact Score</div>
                  <div className="text-sm text-gray-600">98% efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
