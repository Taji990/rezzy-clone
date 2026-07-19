import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Rezzy</h1>
            <p className="text-xl mb-8 text-indigo-100">
              AI-Powered Job Search Platform. Streamline your job search with intelligent resume
              and cover letter generation.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth" className="btn-primary">
                Get Started
              </Link>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Resume Rewriting</h3>
              <p className="text-slate-600">
                Automatically optimize your resume bullets to match job descriptions using advanced AI.
              </p>
            </div>
            <div className="card">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Smart Cover Letters</h3>
              <p className="text-slate-600">
                Generate personalized cover letters instantly tailored to each job application.
              </p>
            </div>
            <div className="card">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Pipeline Management</h3>
              <p className="text-slate-600">
                Track all your job applications in an organized pipeline from applied to offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <Link href="/auth" className="btn-primary">
            Start Free Today
          </Link>
        </div>
      </section>
    </div>
  );
}
