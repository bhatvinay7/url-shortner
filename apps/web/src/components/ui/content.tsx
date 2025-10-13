import React from 'react'
import Link from 'next/link'
export default function Content() {
  return (
    <div>
       <section className="mt-8">
                <h3 className="text-xl font-semibold text-[hsl(212,90%,45%)] mb-3">
                  How It Works 🚀
                </h3>
                <ul className="space-y-2 text-[hsl(220,10%,40%)]">
                  <li>1️⃣ Paste your long URL into the input box above.</li>
                  <li>
                    2️⃣ Click <strong>Shorten URL</strong> — we’ll generate a clean,
                    shareable link.
                  </li>
                  <li>3️⃣ Copy your new link and share it anywhere!</li>
                </ul>
              </section>
      
              {/* Why Choose Us */}
              <section className="mt-8">
                <h3 className="text-xl font-semibold text-[hsl(212,90%,45%)] mb-3">
                  Why Choose Shortly 💡
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[hsl(220,10%,40%)]">
                  <li className="bg-white/70 p-3 rounded-xl shadow-sm">
                    ⚡ Instant URL shortening
                  </li>
                  <li className="bg-white/70 p-3 rounded-xl shadow-sm">
                    🔒 Secure and private
                  </li>
                  <li className="bg-white/70 p-3 rounded-xl shadow-sm">
                    🌍 Custom branded links
                  </li>
                  <li className="bg-white/70 p-3 rounded-xl shadow-sm">
                    📊 Real-time click analytics
                  </li>
                </ul>
              </section>
      
              {/* CTA Section */}
              <section className="mt-10 text-center">
                <h3 className="text-2xl font-semibold text-[hsl(212,90%,45%)] mb-2">
                  Ready to get started?
                </h3>
                <p className="text-[hsl(220,10%,45%)] mb-4">
                  Join thousands of users making their links smarter.
                </p>
      
                <Link href={'/signin'}>
                <button className="bg-[hsl(212,90%,45%)] hover:bg-[hsl(212,90%,40%)] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
                  Get Started
                </button>
                </Link>
              </section>
    </div>
  )
}
