'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, BookOpen, Mail, Phone } from 'lucide-react'

function ApplicationSuccessContent() {
  const searchParams = useSearchParams()
  const applicationNumber = searchParams.get('applicationNumber')

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Thank you for choosing ARQAM. Your application has been received and is being reviewed by our admissions team.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-600">Application Details</CardTitle>
          <CardDescription>
            Please save this information for your records
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Application Number</p>
              <p className="text-3xl font-bold text-green-600 font-mono">
                {applicationNumber || 'APP123456789'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Review Timeline</h3>
                <p className="text-blue-600 font-medium">3-5 Business Days</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                <p className="text-blue-600 font-medium">Under Review</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Email Confirmation</h4>
                <p className="text-gray-600 text-sm">You'll receive a confirmation email with your application details within the next few minutes.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Application Review</h4>
                <p className="text-gray-600 text-sm">Our admissions team will carefully review your application within 3-5 business days.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Decision Notification</h4>
                <p className="text-gray-600 text-sm">You'll receive an email notification with our admission decision.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 font-semibold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">If Approved</h4>
                <p className="text-gray-600 text-sm">You'll receive login credentials to access your parent dashboard and complete enrollment.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            If you have any questions about your application, don't hesitate to contact us.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">admissions@aqram.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <Link href="/">
          <Button size="lg" variant="outline" className="mr-4">
            Back to Home
          </Button>
        </Link>
        <Link href="/login">
          <Button size="lg">
            Login to Account
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function ApplicationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">ARQAM</span>
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      <Suspense fallback={
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      }>
        <ApplicationSuccessContent />
      </Suspense>
    </div>
  )
}