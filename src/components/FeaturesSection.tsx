
import React from 'react';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Heart, 
  FileText, 
  HelpCircle,
  Upload,
  Video,
  BarChart,
  Globe
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Transparency",
      description: "Every donation tracked in real-time. See exactly where your money goes with detailed transaction history.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Comprehensive charts and filters. Track top donors, countries, and impact metrics with powerful admin controls.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "Top Donors Recognition",
      description: "Honor generous contributors with country flags and recognition. Advanced filtering by amount, month, and region.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Heart,
      title: "Multiple Payment Options",
      description: "Bank transfers, eSewa, Khalti for Nepal, UPI for India. Multiple secure payment gateways for global donations.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Upload,
      title: "Receipt Verification",
      description: "Upload payment receipts for manual donations. Secure verification process for complete transparency.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Video,
      title: "Video Guides",
      description: "Step-by-step video tutorials for every feature. Learn how to donate, request help, and use the platform effectively.",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: HelpCircle,
      title: "Request for Help",
      description: "Submit help requests for nearby communities. Categorized assistance: clothing, money, food, medical aid.",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: FileText,
      title: "Impact Documentation",
      description: "Photo and video evidence of our work. See real stories and impact from every donation made through our platform.",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: BarChart,
      title: "Data Export & Analytics",
      description: "Export all data in CSV format. Complete admin control over transactions, monitoring, and financial oversight.",
      color: "bg-cyan-100 text-cyan-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-red-600 mb-4">
            <Globe className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Platform Features</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Built for Complete Transparency
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature designed with security, transparency, and user experience in mind. 
            From donation tracking to impact measurement, we provide the tools for effective charity management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h3>
            <p className="text-gray-600 mb-6">Join thousands of donors making transparent, impactful contributions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                <Heart className="h-5 w-5 fill-current" />
                <span>Start Donating</span>
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
