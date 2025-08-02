'use client'; // Required for Next.js with Clerk

import { SignUp } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/25 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/3 w-72 h-72 bg-purple-500/25 rounded-full filter blur-3xl animate-pulse"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/60 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-indigo-400/60 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-purple-400/60 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-1 h-8 bg-gradient-to-t from-cyan-400/40 to-transparent animate-pulse"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-cyan-400/30 to-indigo-400/30 rounded-full animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`
              }}
            ></div>
          ))}
        </div>

        {/* Mesh Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.08'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M20 0v40M0 20h40' stroke='%234F46E5' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="relative max-w-md w-full">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-3xl blur-lg opacity-30"></div>

          <div className="relative bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 animate-gradient-x"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Join Us Today
                </h1>
                <p className="text-gray-300 text-base leading-relaxed">
                  Create your account and start your journey
                </p>

                <div className="flex justify-center gap-2 mt-4 flex-wrap">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 text-xs rounded-full border border-cyan-500/30">✨ Free Forever</span>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-200 text-xs rounded-full border border-indigo-500/30">🚀 Instant Access</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-200 text-xs rounded-full border border-purple-500/30">🔒 Secure</span>
                </div>
              </div>

              {/* Clerk Sign-Up Component */}
              <div className="[&_.cl-card]:bg-transparent [&_.cl-card]:shadow-none [&_.cl-card]:border-none">
                <SignUp
                  appearance={{
                    elements: {
                      card: "bg-transparent shadow-none border-none",
                      headerTitle: "text-white text-2xl",
                      headerSubtitle: "text-gray-300",
                      socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg",
                      socialButtonsBlockButtonText: "text-white font-medium",
                      socialButtonsProviderIcon: "brightness-0 invert",
                      dividerLine: "bg-gradient-to-r from-transparent via-white/30 to-transparent",
                      dividerText: "text-gray-300 bg-indigo-900/50 px-4",
                      formFieldLabel: "text-white font-semibold text-sm",
                      formFieldInput: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 focus:bg-white/15 transition-all duration-300 rounded-xl",
                      formButtonPrimary: "bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 hover:from-cyan-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] shadow-2xl text-white font-semibold rounded-xl py-3",
                      footerActionLink: "text-cyan-300 hover:text-cyan-200 transition-colors duration-200 font-medium",
                      identityPreviewText: "text-white",
                      identityPreviewEditButton: "text-cyan-300 hover:text-cyan-200",
                      formFieldAction: "text-cyan-300 hover:text-cyan-200",
                      otpCodeFieldInput: "bg-white/10 border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400/50",
                      formFieldSuccessText: "text-green-300",
                      formFieldErrorText: "text-red-300",
                      alertText: "text-white",
                      formFieldHintText: "text-gray-400"
                    }
                  }}
                />
              </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-indigo-400/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-0 left-1/4 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/sign-in" className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors duration-200">
            Sign in here
          </a>
        </p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-10px) translateX(5px) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px) translateX(-5px) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-10px) translateX(-10px) rotate(270deg);
            opacity: 0.8;
          }
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Page;
