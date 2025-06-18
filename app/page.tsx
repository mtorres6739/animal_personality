import QuizContainer from '@/components/quiz/quiz-container';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Fun background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-[20%] w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-[30%] w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%2F%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%2213%22%20r%3D%223%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10">
        <QuizContainer />
        
        {/* Copyright Footer */}
        <footer className="mt-16 pb-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg px-6 py-4 mx-auto max-w-md border border-white/20">
            <p className="text-sm text-gray-600">
              © 2025 Ethos Lab. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <a 
                href="https://www.ethosaz.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-violet-600 transition-colors duration-200"
              >
                www.ethosaz.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}