import { ArrowRight, BookOpen, Users, Zap, Shield, BarChart3, Calendar } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-cyan-50 to-blue-50">
      {/* Navigation Header */}
      <header className="border-b border-slate-200 backdrop-blur-sm bg-white/70">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-light text-slate-800 tracking-tight">MediHub</span>
          </div>
          <button
            onClick={onGetStarted}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium text-sm transition-all shadow-sm hover:shadow-md"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <div className="space-y-6 mb-14">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-tight tracking-tight">
            Evidence-Based Practice<br />
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Starts Here</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Your personalized medical portfolio. Stay current with the latest clinical research and build your professional practice on proven evidence.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full font-medium text-base transition-all transform hover:scale-105 mb-14 shadow-lg hover:shadow-xl"
        >
          Transform Research into Clinical Action
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Weekly Updates Badge */}
        <div className="inline-block px-6 py-3.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-shadow">
          <p className="text-slate-700 font-light">
            ✓ Handpicked medical breakthroughs and peer-reviewed studies delivered to your practice every week
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-light text-slate-900 text-center mb-20 tracking-tight">What You Get</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-cyan-300 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl flex items-center justify-center mb-5">
              <BookOpen className="w-6 h-6 text-cyan-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Latest Medical Evidence</h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Access peer-reviewed research and clinical guidelines curated by medical experts, updated weekly with cutting-edge findings.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-5">
              <Users className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Professional Portfolio</h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Build and maintain your personalized medical portfolio, showcasing your expertise, certifications, and clinical achievements.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-sky-300 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center mb-5">
              <Zap className="w-6 h-6 text-sky-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Clinical Decision Support</h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Apply research directly to your practice with actionable insights and evidence-backed recommendations for patient care.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-emerald-300 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-5">
              <Shield className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Secure & Compliant</h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Hospital-grade security with HIPAA compliance ensuring your patient data and professional information stays protected.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-amber-300 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-5">
              <BarChart3 className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Practice Analytics</h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Track your clinical performance, patient outcomes, and research engagement with comprehensive dashboards and insights.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-purple-300 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-5">
              <Calendar className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Appointment Management</h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Seamlessly manage patient appointments, medical records, and treatment plans integrated with your portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-slate-200 rounded-3xl p-16">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4 tracking-tight">Ready to Transform Your Practice?</h2>
          <p className="text-lg text-slate-600 mb-10 font-light">
            Join hundreds of healthcare professionals using evidence-based practices for better patient outcomes.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-600 text-sm font-light">
          <p>&copy; 2026 MediHub. Built for modern healthcare professionals.</p>
        </div>
      </footer>
    </div>
  );
}
