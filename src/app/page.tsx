import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐰</span>
              </div>
              <span className="text-xl font-bold text-gray-800"> ARQAM</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-800">
                About
              </a>
              <a href="#programs" className="text-gray-600 hover:text-gray-800">
                Programs
              </a>
              <a href="#admissions" className="text-gray-600 hover:text-gray-800">
                Admissions
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-800">
                Contact
              </a>
              <Link href="/login" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
            </nav>

            <Link href="/apply">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">Apply Now</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-5xl font-bold text-gray-800 mb-6 text-balance"> Aqram Model Islamic Academy</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Home of Knowledge  
              </p>
              <Link href="/apply">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg">
                  Apply Now
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="w-full h-80 bg-gradient-to-br from-blue-200 to-blue-200 rounded-xl flex items-center justify-center">
                  <span className="text-6xl">🎓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-200 p-4 rounded-xl">
                  <div className="w-full h-32 bg-yellow-300 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">📚</span>
                  </div>
                </div>
                <div className="bg-blue-200 p-4 rounded-xl">
                  <div className="w-full h-32 bg-blue-300 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">👥</span>
                  </div>
                </div>
                <div className="bg-green-200 p-4 rounded-xl">
                  <div className="w-full h-32 bg-green-300 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">👨‍🏫</span>
                  </div>
                </div>
                <div className="bg-blue-200 p-4 rounded-xl">
                  <div className="w-full h-32 bg-blue-300 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">😊</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are a premier educational institution — one that is right, powerful, flexible and comprehensive school where
                we work together to help your child succeed.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Let's explore together. At  ARQAM MODEL ISLAMIC ACADEMY, we believe learning should be fun and engaging. Our experienced
                teachers work with students to build confidence and achieve academic success. We offer personalized
                learning plans tailoblue to each student's unique needs and learning style.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team focuses on building strong foundations in core subjects while fostering critical thinking
                skills that will serve students throughout their academic journey and beyond. We believe in creating a
                supportive environment where every child can thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're The Best Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 text-balance">
            Why Are We The Best Educational Options For Your Children
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-blue-100 border-0 p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">One on One Coaching</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our teachers provide personalized attention to each student, ensuring they receive the support they need
                  to excel in their studies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-100 border-0 p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Curriculum Aligned Teaching</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We align our teaching methods with national curriculum standards to ensure seamless learning and
                  better academic performance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-100 border-0 p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Personalised Learning</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Each student receives a customized learning plan tailoblue to their unique strengths, weaknesses, and
                  learning style.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-100 border-0 p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Expert Teachers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our team consists of qualified and experienced educators who are passionate about helping students
                  achieve their full potential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">How It Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Submit your application</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete our online application form to start your child's educational journey with us.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Review by our experts</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our admissions team carefully reviews your application to ensure the best fit for your child.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Acceptance notification</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive email notification about your application status and next steps for enrollment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Begin your journey</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete enrollment and payment to start your child's exceptional educational experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Programs Section */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Learning Programs</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Creative Arts + Core Subjects</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Creative learning approach combining artistic expression with essential academic subjects.
                </p>
                <Link href="/apply">
                  <Button variant="outline" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-200 flex items-center justify-center">
                <span className="text-4xl">📚</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Language & Communication</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive language programs that enhance reading, writing, and communication skills.
                </p>
                <Link href="/apply">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-200 to-teal-200 flex items-center justify-center">
                <span className="text-4xl">🔬</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">STEM & Innovation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Science, Technology, Engineering and Mathematics programs that prepare students for the future.
                </p>
                <Link href="/apply">
                  <Button variant="outline" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Selection Section */}
      <section id="admissions" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 text-balance">
            Let's find the right program for you
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-green-200 border-0 p-8 text-center">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Primary</h3>
                <p className="text-gray-600 mb-6">
                  Ages 5-11
                  <br />
                  Foundation Skills
                  <br />
                  Core Subjects
                </p>
                <Link href="/apply">
                  <Button className="bg-white text-gray-800 hover:bg-gray-100">Apply Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-yellow-200 border-0 p-8 text-center">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Secondary</h3>
                <p className="text-gray-600 mb-6">
                  Ages 11-16
                  <br />
                  Advanced Learning
                  <br />
                  Specialized Subjects
                </p>
                <Link href="/apply">
                  <Button className="bg-white text-gray-800 hover:bg-gray-100">Apply Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-pink-200 border-0 p-8 text-center">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Senior</h3>
                <p className="text-gray-600 mb-6">
                  Ages 16+
                  <br />
                  Advanced Placement
                  <br />
                  University Prep
                </p>
                <Link href="/apply">
                  <Button className="bg-white text-gray-800 hover:bg-gray-100">Apply Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-200 to-orange-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Start Your Application Today</h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">Join Our School Community</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Take the first step towards your child's academic success. Submit your application today and become part of
            our exceptional learning community where every child thrives.
          </p>
          <Link href="/apply">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg">Apply Now</Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Contact us today.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Address</h4>
                    <p className="text-gray-600">Juwape Phase 1 Off Nasiru Soja Street Mararaba Karu LGA</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Phone</h4>
                    <p className="text-gray-600">07068080012</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600">arqammodelislamicacademy@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-4">School Hours</h4>
                <div className="text-gray-600 space-y-1">
                  <p>Monday - Friday: 7:30 AM - 3:30 PM</p>
                  <p>Saturday: 8:00 AM - 12:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Take the next step in your child's educational journey. Our admissions team is here to help you through the process.
              </p>
              <div className="space-y-4">
                <Link href="/apply">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Submit Application
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Parent Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">ABOUT US</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                 ARQAM MODEL ISLAMIC ACADEMY is dedicated to providing exceptional education that helps students achieve their
                academic goals and build confidence in their abilities.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">QUICK LINKS</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="text-gray-300 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#programs" className="text-gray-300 hover:text-white">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#admissions" className="text-gray-300 hover:text-white">
                    Admissions
                  </a>
                </li>
                <li>
                  <Link href="/login" className="text-gray-300 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="text-gray-300 hover:text-white">
                    Apply
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">PROGRAMS</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-gray-300">Primary Education</span>
                </li>
                <li>
                  <span className="text-gray-300">Secondary Education</span>
                </li>
                <li>
                  <span className="text-gray-300">Senior School</span>
                </li>
                <li>
                  <span className="text-gray-300">Creative Arts</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">CONNECT</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300">📧 arqammodelislamicacademy@gmail.com</li>
                <li className="text-gray-300">📞 07068080012 </li>
                <li className="text-gray-300"> Juwape Phase 1 Off Nasiru Soja Street Mararaba Karu LGA </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024  ARQAM MODEL ISLAMIC ACADEMY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
