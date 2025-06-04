
import React from 'react';
import { TrendingUp, DollarSign, Users, Globe, Shield, Eye } from 'lucide-react';

const TransparencySection = () => {
  const stats = [
    { label: "Total Donations", value: "₹2,547,890", icon: DollarSign, change: "+12.5%" },
    { label: "Active Donors", value: "1,248", icon: Users, change: "+8.2%" },
    { label: "Countries Reached", value: "15", icon: Globe, change: "+2" },
    { label: "Projects Completed", value: "67", icon: TrendingUp, change: "+5" }
  ];

  const recentTransactions = [
    { id: "TXN001", donor: "Anonymous", amount: "₹5,000", project: "Education Support", date: "2025-01-15", country: "🇳🇵" },
    { id: "TXN002", donor: "Rajesh K.", amount: "₹2,500", project: "Medical Aid", date: "2025-01-15", country: "🇮🇳" },
    { id: "TXN003", donor: "Sarah M.", amount: "₹10,000", project: "Food Distribution", date: "2025-01-14", country: "🇺🇸" },
    { id: "TXN004", donor: "Anonymous", amount: "₹1,500", project: "Clothing Drive", date: "2025-01-14", country: "🇳🇵" },
    { id: "TXN005", donor: "Mike D.", amount: "₹7,500", project: "Emergency Relief", date: "2025-01-13", country: "🇬🇧" }
  ];

  return (
    <section id="transparency" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-blue-600 mb-4">
            <Eye className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Full Transparency</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Real-time Financial Tracking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every donation is tracked and displayed in real-time. See exactly how funds are being used 
            and the impact being made in communities across Nepal and beyond.
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Recent Transactions</h3>
              <p className="text-gray-600">Live updates of all donations and fund allocations</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>View All</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Transaction ID</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Donor</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Project</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Country</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-white transition-colors duration-200">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {transaction.id}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">{transaction.donor}</td>
                    <td className="py-4 px-4 font-bold text-green-600">{transaction.amount}</td>
                    <td className="py-4 px-4 text-gray-700">{transaction.project}</td>
                    <td className="py-4 px-4 text-gray-600">{transaction.date}</td>
                    <td className="py-4 px-4 text-2xl">{transaction.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Balance */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Available Balance</h3>
            <div className="text-5xl font-bold text-green-600 mb-2">₹847,320</div>
            <p className="text-gray-600 mb-6">Ready to be allocated to verified projects and emergency relief</p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-lg font-bold text-gray-900">₹1,200,570</div>
                <div className="text-sm text-gray-600">Already Distributed</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-lg font-bold text-gray-900">₹500,000</div>
                <div className="text-sm text-gray-600">Emergency Reserve</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
