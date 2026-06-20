'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase'; 

export default function DeleteAccountPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await addDoc(collection(db, 'accountDeletionRequests'), {
        name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        reason: formData.reason || 'No reason provided',
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
    } catch (error) {
      console.error('Error adding document: ', error);
      setErrorMsg('There was an error processing your request. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased flex flex-col min-h-screen">

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Delete Your Account</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            If you no longer wish to use Vivexa Learn, you can request permanent deletion of your account and associated data from this page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Information Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xl font-bold mb-4 text-gray-900">What happens when you delete your account?</h3>
            <ul className="space-y-3 text-gray-600 list-disc list-inside mb-8">
              <li>Student profile information will be removed.</li>
              <li>Login credentials will be deleted.</li>
              <li>Attendance records associated with the account may be removed.</li>
              <li>Performance data may be removed.</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-gray-900">Data Retention Policy</h3>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              <li>Certificates already issued may be retained for verification purposes if required by institute policies.</li>
              <li>Certain legal or compliance-related records may be retained where necessary.</li>
            </ul>
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            {errorMsg && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm">
                {errorMsg}
              </div>
            )}

            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center animate-fade-in">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold mb-2">Request Received</h3>
                <p>Your account deletion request has been received. Our team will process your request within 7 working days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Registered Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                    Registered Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    pattern="[0-9]{10,15}"
                    title="Please enter a valid mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Deletion (Optional)
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows={3}
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-colors"
                    placeholder="Tell us why you are leaving..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white font-semibold py-3 px-4 rounded-lg transition-all flex justify-center items-center ${
                    isSubmitting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Deletion Request'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Privacy & Contact Section */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy Notice</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We respect your privacy and are committed to protecting your personal information. Account deletion requests are processed securely in accordance with our privacy policy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p><strong>Email:</strong> <a href="mailto:info@vivexatech.in" className="text-blue-800 hover:underline">info@vivexatech.in</a></p>
                <p><strong>Phone:</strong> <a href="tel:+919582194338" className="text-blue-800 hover:underline">+91 9582194338</a></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}