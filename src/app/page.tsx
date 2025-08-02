import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { LogIn, FileText, Sparkles, ArrowRight, Zap, Bot, Upload } from 'lucide-react';
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs with Complex Animations */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-pink-400/25 rounded-full blur-2xl animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-violet-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-2xl animate-spin" style={{animationDuration: '20s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          
          {/* Animated Badge */}
          <div className="mb-8 relative">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-blue-400/30 shadow-lg hover:shadow-xl transition-all duration-500 group">
              <Sparkles className="w-5 h-5 text-blue-400 mr-3 animate-spin" style={{animationDuration: '3s'}} />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                AI-Powered PDF Intelligence
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            </div>
          </div>

          {/* Enhanced Header with Advanced Styling */}
          <div className="flex flex-col lg:flex-row items-center mb-12 relative">
            <div className="relative mb-6 lg:mb-0 lg:mr-8">
              {/* Glowing Text Effect */}
              <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent relative">
                Chat with any PDF
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl -z-10 animate-pulse"></div>
              </h1>
              
              {/* Animated Underline */}
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 animate-pulse"></div>
            </div>
            
            {/* Enhanced UserButton Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-lg animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:border-white/40 transition-all duration-300">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="flex mb-8 relative">
            {isAuth && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 animate-pulse"></div>
                <Button className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-110 text-lg font-bold border border-blue-400/30">
                  <ArrowRight className="w-6 h-6 mr-3 animate-bounce" style={{animationDuration: '2s'}} />
                  Go to Chats
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl"></div>
                </Button>
              </div>
            )}
          </div>

          {/* Enhanced Description with Floating Effects */}
          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl px-10 py-8 border border-white/20 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <div className="flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-blue-400 mr-3 animate-pulse" />
                <Zap className="w-6 h-6 text-purple-400 animate-bounce" style={{animationDelay: '0.5s'}} />
              </div>
              <p className="max-w-2xl text-xl text-blue-100 leading-relaxed font-medium">
                Join millions of professionals and build your career with our AI-powered
                resume builder. Experience the future of document interaction.
              </p>
            </div>
          </div>

          {/* Advanced File Upload / Login Section */}
          <div className="w-full max-w-3xl relative">
            {isAuth ? (
              <div className="relative group">
                {/* Animated Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
                
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/20 hover:border-white/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                  {/* Header with Icons */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Upload className="w-10 h-10 text-blue-400 animate-bounce" style={{animationDuration: '2s'}} />
                        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg animate-pulse"></div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-purple-400 animate-pulse" />
                      <div className="relative">
                        <FileText className="w-10 h-10 text-purple-400 animate-bounce" style={{animationDuration: '2s', animationDelay: '0.5s'}} />
                        <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
                    Upload Your Document
                  </h3>
                  <p className="text-blue-200 text-lg mb-8 opacity-90">
                    Drag and drop your PDF file below and watch the magic happen ✨
                  </p>
                  
                  {/* Enhanced File Upload Container */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur animate-pulse"></div>
                    <div className="relative">
                      <FileUpload />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative group">
                {/* Pulsating Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
                
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20 hover:border-white/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                  {/* Animated Icons */}
                  <div className="flex items-center justify-center mb-8">
                    <LogIn className="w-12 h-12 text-blue-400 animate-bounce mr-4" style={{animationDuration: '2s'}} />
                    <Sparkles className="w-8 h-8 text-purple-400 animate-spin" style={{animationDuration: '3s'}} />
                  </div>
                  
                  <Link href="/sign-in">
                    <div className="relative group/button">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg group-hover/button:blur-xl transition-all duration-300 animate-pulse"></div>
                      <Button className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-105 text-xl font-bold border border-blue-400/30 group-hover/button:border-purple-400/50">
                        <div className="flex items-center justify-center">
                          <LogIn className="w-7 h-7 mr-4 animate-pulse" />
                          Login to get Started
                          <ArrowRight className="w-7 h-7 ml-4 animate-bounce" style={{animationDelay: '0.5s'}} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl"></div>
                      </Button>
                    </div>
                  </Link>
                  
                  <div className="mt-6 flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-blue-200/80">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span className="text-lg">Sign in to start your AI journey</span>
                      <Sparkles className="w-4 h-4 animate-pulse" style={{animationDelay: '0.5s'}} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Floating Feature Indicators */}
          <div className="absolute top-20 left-10 hidden lg:block">
            <div className="bg-blue-600/20 backdrop-blur-sm rounded-full p-4 border border-blue-400/30 animate-bounce" style={{animationDuration: '3s'}}>
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          
          <div className="absolute bottom-20 right-10 hidden lg:block">
            <div className="bg-purple-600/20 backdrop-blur-sm rounded-full p-4 border border-purple-400/30 animate-bounce" style={{animationDuration: '3s', animationDelay: '1s'}}>
              <Bot className="w-6 h-6 text-purple-400" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}