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
              <span className="text-xl font-bold text-gray-800">ARQAM</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                How it Works
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Subjects
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Services
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Resources
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Testimonials
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Blog
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Contact
              </a>
            </nav>

            <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full">Book Now</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 text-balance">ARQAM</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Education is not the learning of facts, but the training of the mind to think.
              </p>
              <p className="text-gray-500 mb-8">Albert Einstein</p>
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg">
                Learn More
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <img
                  src="/happy-young-student-girl-smiling-at-desk-in-classr.jpg"
                  alt="Happy student in classroom"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-200 p-4 rounded-xl">
                  <img
                    src="/student-studying.png"
                    alt="Student studying"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="bg-blue-200 p-4 rounded-xl">
                  <img
                    src="/students-working-together-in-classroom.jpg"
                    alt="Students working together"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="bg-green-200 p-4 rounded-xl">
                  <img
                    src="/teacher-helping-student.jpg"
                    alt="Teacher helping student"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="bg-blue-200 p-4 rounded-xl">
                  <img
                    src="/happy-children-learning.jpg"
                    alt="Happy children learning"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are a premier tutoring service — one that is right, powerful, flexible and comprehensive school where
                we work together to help your child succeed.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Let's explore together. At ARQAM, we believe learning should be fun and engaging. Our experienced
                tutors work with students to build confidence and achieve academic success. We offer personalized
                learning plans tailored to each student's unique needs and learning style.
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
            Why Are We The Best Maths And English Tuition Options For Your Childrens
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-blue-100 border-0 p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">One on One Coaching</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our tutors provide personalized attention to each student, ensuring they receive the support they need
                  to excel in their studies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-100 border-0 p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">School Aligned Teaching</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We align our teaching methods with your child's school curriculum to ensure seamless learning and
                  better academic performance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-100 border-0 p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Personalised Training</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Each student receives a customized learning plan tailored to their unique strengths, weaknesses, and
                  learning style.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-100 border-0 p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Expert Tutors</h3>
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
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Book your free assessment</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Schedule a complimentary assessment to understand your child's learning needs and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed assessment by our expert</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our qualified tutors conduct a thorough evaluation to identify strengths and areas for improvement.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tailored program as per a child's need</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We create a personalized learning plan designed specifically for your child's unique requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Achieve your academic goals</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Watch your child excel academically with our proven teaching methods and continuous support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-16">Happy Customers, Happy Homes</h2>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-lg text-gray-600 leading-relaxed mb-8 italic">
              "I would prefer Bunny as they're wonderfully supportive with the learning of my daughter. The tutors are
              very patient and understanding. They make learning fun and engaging for children. My daughter has shown
              remarkable improvement in her grades since joining ARQAM."
            </p>

            <div className="flex items-center justify-center space-x-4">
              <img
                src="/happy-parent-testimonial-photo.jpg"
                alt="Parent testimonial"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">Sarah Chen</p>
                <p className="text-gray-500 text-sm">Parent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Programs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Learning Programs</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Art Literacy + Maths</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Creative learning approach combining artistic expression with mathematical concepts.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-200 flex items-center justify-center">
                <span className="text-4xl">📚</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">DIY Literacy + English</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Hands-on learning activities that enhance reading, writing, and communication skills.
                </p>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-200 to-teal-200 flex items-center justify-center">
                <span className="text-4xl">🛡️</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Introduction to General Safety</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Essential safety knowledge and life skills for children's wellbeing and confidence.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Selection Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 text-balance">
            Let's find the right tutoring program for you
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-green-200 border-0 p-8 text-center">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Primary</h3>
                <p className="text-gray-600 mb-6">
                  Ages 5-11
                  <br />
                  English & Maths
                  <br />
                  Foundation Skills
                </p>
                <Button className="bg-white text-gray-800 hover:bg-gray-100">Select Program</Button>
              </CardContent>
            </Card>

            <Card className="bg-yellow-200 border-0 p-8 text-center">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Secondary</h3>
                <p className="text-gray-600 mb-6">
                  Ages 11-16
                  <br />
                  English & Maths
                  <br />
                  Advanced Concepts
                </p>
                <Button className="bg-white text-gray-800 hover:bg-gray-100">Select Program</Button>
              </CardContent>
            </Card>

            <Card className="bg-pink-200 border-0 p-8 text-center">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Senior</h3>
                <p className="text-gray-600 mb-6">
                  Ages 16+
                  <br />
                  A-Level Support
                  <br />
                  University Prep
                </p>
                <Button className="bg-white text-gray-800 hover:bg-gray-100">Select Program</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-200 to-orange-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Book Your FREE ASSESSMENT</h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-8">With us</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Take the first step towards your child's academic success. Our comprehensive assessment will help us
            understand your child's unique learning needs and create a personalized plan for their growth.
          </p>
          <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg">Book Now</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">ABOUT US</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                ARQAM is dedicated to providing exceptional tutoring services that help students achieve their
                academic goals and build confidence in their abilities.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">QUICK LINKS</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">SUBJECTS</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Mathematics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    English
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Science
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Art & Literacy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">CONNECT</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300">📧 info@aqram.com</li>
                <li className="text-gray-300">📞 07068080012</li>
                <li className="text-gray-300">📍 London, UK</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 ARQAM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
