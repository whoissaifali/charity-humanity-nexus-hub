
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "How can I make a donation?",
      answer: "You can donate through bank transfer, digital wallets (eSewa, Khalti, UPI), or by uploading payment receipts. Visit our Donate Now page for detailed instructions."
    },
    {
      question: "Is my donation tax-deductible?",
      answer: "Yes, donations to CharityHumanity Nepal are tax-deductible. We will provide you with proper documentation for tax purposes."
    },
    {
      question: "How do I track where my donation goes?",
      answer: "We maintain complete transparency. You can view all transactions and see exactly how funds are being used in our Transparency section."
    },
    {
      question: "Can I request help for someone in need?",
      answer: "Yes, you can submit help requests through our Request Help page. We review all requests and respond based on urgency and available resources."
    },
    {
      question: "Do I need to create an account to donate?",
      answer: "No, account creation is optional. However, having an account allows you to track your donations and access additional features."
    },
    {
      question: "How do you ensure transparency?",
      answer: "All transactions are publicly viewable, we provide detailed reports, and every donation is tracked from receipt to distribution."
    },
    {
      question: "What types of help do you provide?",
      answer: "We provide financial support, food assistance, clothing, medical aid, educational support, and emergency relief based on community needs."
    },
    {
      question: "How can I volunteer with your organization?",
      answer: "Contact us through our Contact page to learn about volunteer opportunities in your area."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our charity platform and services.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
