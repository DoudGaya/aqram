'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getParentDashboardData, makePayment, markNotificationAsRead } from '@/actions/dashboard'
import { BookOpen, DollarSign, Users, Bell, LogOut, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
      return
    }

    loadDashboardData()
  }, [session, status, router])

  const loadDashboardData = async () => {
    try {
      const result = await getParentDashboardData()
      if (result.success) {
        setDashboardData(result.data)
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (feeStructureId: string) => {
    setPaymentLoading(feeStructureId)
    try {
      const result = await makePayment(feeStructureId, 'Credit Card')
      if (result.success) {
        // Refresh dashboard data
        await loadDashboardData()
        alert('Payment processed successfully!')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Payment failed. Please try again.')
    } finally {
      setPaymentLoading(null)
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    await markNotificationAsRead(notificationId)
    loadDashboardData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load dashboard data</p>
          <Button onClick={loadDashboardData} className="mt-4">Retry</Button>
        </div>
      </div>
    )
  }

  const approvedApplications = dashboardData.applications.filter((app: any) => app.status === 'APPROVED')
  const pendingApplications = dashboardData.applications.filter((app: any) => app.status === 'PENDING')
  
  // Get all students from approved applications
  const students = approvedApplications.flatMap((app: any) => app.students)
  
  // Get all unpaid fees
  const unpaidFees = students.flatMap((student: any) => 
    student.feeStructures.filter((fee: any) => 
      !fee.payments.some((payment: any) => payment.status === 'COMPLETED')
    )
  )

  const totalOutstanding = unpaidFees.reduce((sum: number, fee: any) => sum + Number(fee.amount), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">ARQAM</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session?.user?.name}</span>
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="outline"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your children's education and school fees</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Children Enrolled</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Fees</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalOutstanding.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplications.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.notifications.filter((n: any) => !n.isRead).length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Students */}
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>
                  Your children currently enrolled at ARQAM
                </CardDescription>
              </CardHeader>
              <CardContent>
                {students.length > 0 ? (
                  <div className="space-y-4">
                    {students.map((student: any, index: number) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{student.surname} {student.otherName}</h4>
                          <p className="text-sm text-gray-600">Grade: {student.grade}</p>
                          <p className="text-sm text-gray-600">Age: {new Date().getFullYear() - parseInt(student.dateOfBirthYear)} years</p>
                        </div>
                        <Badge variant="success">Active</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No enrolled students yet</p>
                )}
              </CardContent>
            </Card>

            {/* Outstanding Fees */}
            <Card>
              <CardHeader>
                <CardTitle>Outstanding Fees</CardTitle>
                <CardDescription>
                  Fees that require payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {unpaidFees.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Fee Type</TableHead>
                        <TableHead>Term</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {unpaidFees.map((fee: any) => (
                        <TableRow key={fee.id}>
                          <TableCell>{fee.student.surname} {fee.student.otherName}</TableCell>
                          <TableCell>{fee.feeType}</TableCell>
                          <TableCell>{fee.termName}</TableCell>
                          <TableCell>${Number(fee.amount).toFixed(2)}</TableCell>
                          <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handlePayment(fee.id)}
                              disabled={paymentLoading === fee.id}
                              size="sm"
                            >
                              {paymentLoading === fee.id ? 'Processing...' : 'Pay Now'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-500">All fees are up to date!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Application Status */}
            {pendingApplications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Pending Applications</CardTitle>
                  <CardDescription>
                    Applications currently under review
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApplications.map((app: any) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Application #{app.applicationNumber}</h4>
                          <p className="text-sm text-gray-600">
                            {app.students.length} student{app.students.length > 1 ? 's' : ''}
                          </p>
                          <p className="text-sm text-gray-600">
                            Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="warning">Under Review</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Notifications */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>
                  Stay updated with important information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {dashboardData.notifications.length > 0 ? (
                    dashboardData.notifications.map((notification: any) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border cursor-pointer ${
                          notification.isRead 
                            ? 'bg-gray-50 border-gray-200' 
                            : 'bg-blue-50 border-blue-200'
                        }`}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{notification.title}</h5>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No notifications</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}