'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { getApplications, updateApplicationStatus } from '@/actions/applications'
import { BookOpen, Users, Clock, CheckCircle, XCircle, LogOut, Eye, FileText } from 'lucide-react'

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState<any[]>([])
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
      return
    }

    // Check if user is admin
    if (session.user?.role !== 'ADMIN' && session.user?.role !== 'SUPER_ADMIN') {
      router.push('/dashboard')
      return
    }

    loadApplications()
  }, [session, status, router])

  const loadApplications = async () => {
    try {
      const result = await getApplications()
      if (result.success) {
        setApplications(result.applications)
      }
    } catch (error) {
      console.error('Failed to load applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (applicationId: string) => {
    setActionLoading(applicationId)
    try {
      const result = await updateApplicationStatus(applicationId, 'APPROVED')
      if (result.success) {
        await loadApplications()
        alert('Application approved successfully!')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Failed to approve application')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (applicationId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection')
      return
    }

    setActionLoading(applicationId)
    try {
      const result = await updateApplicationStatus(applicationId, 'REJECTED', rejectionReason)
      if (result.success) {
        await loadApplications()
        setRejectionReason('')
        setSelectedApplication(null)
        alert('Application rejected successfully!')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Failed to reject application')
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="warning">Pending</Badge>
      case 'APPROVED':
        return <Badge variant="success">Approved</Badge>
      case 'REJECTED':
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const pendingApplications = applications.filter(app => app.status === 'PENDING')
  const approvedApplications = applications.filter(app => app.status === 'APPROVED')
  const rejectedApplications = applications.filter(app => app.status === 'REJECTED')
  const totalStudents = applications.reduce((sum, app) => sum + app._count.students, 0)

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
              <Badge variant="outline" className="ml-2">Admin</Badge>
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage applications and school admissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplications.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedApplications.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applications Management</CardTitle>
            <CardDescription>
              Review and manage all school applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application #</TableHead>
                  <TableHead>Parent Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-mono text-sm">
                      {application.applicationNumber}
                    </TableCell>
                    <TableCell>{application.parent.name}</TableCell>
                    <TableCell>{application.parent.email}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {application.students.map((student: any, index: number) => (
                          <div key={student.id} className="text-sm">
                            {student.surname} {student.otherName} ({student.classSeekingAdmission})
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => setSelectedApplication(application)}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        {application.status === 'PENDING' && (
                          <>
                            <Button
                              onClick={() => handleApprove(application.id)}
                              disabled={actionLoading === application.id}
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:bg-green-50"
                            >
                              {actionLoading === application.id ? '...' : 'Approve'}
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedApplication(application)
                                setRejectionReason('')
                              }}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Application Details - {selectedApplication.applicationNumber}
                </h3>
                <Button
                  onClick={() => setSelectedApplication(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>

              <div className="space-y-6">
                {/* Parent Information */}
                <div>
                  <h4 className="font-medium mb-2">Parent Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Name:</strong> {selectedApplication.parent.name}</p>
                    <p><strong>Email:</strong> {selectedApplication.parent.email}</p>
                    <p><strong>Phone:</strong> {selectedApplication.parent.phone}</p>
                    {selectedApplication.parent.parentProfile?.address && (
                      <p><strong>Address:</strong> {selectedApplication.parent.parentProfile.address}</p>
                    )}
                    {selectedApplication.parent.parentProfile?.medicalInstructions && (
                      <p><strong>Medical Instructions:</strong> {selectedApplication.parent.parentProfile.medicalInstructions}</p>
                    )}
                    {selectedApplication.parent.parentProfile?.signature && (
                      <p><strong>Signature:</strong> {selectedApplication.parent.parentProfile.signature}</p>
                    )}
                  </div>
                </div>

                {/* Students Information */}
                <div>
                  <h4 className="font-medium mb-2">Students</h4>
                  <div className="space-y-4">
                    {selectedApplication.students.map((student: any, index: number) => (
                      <div key={student.id} className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Student {index + 1}</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <p><strong>Name:</strong> {student.surname} {student.otherName}</p>
                          <p><strong>Class Seeking Admission:</strong> {student.classSeekingAdmission}</p>
                          <p><strong>Date of Birth:</strong> {student.dateOfBirthDay}/{student.dateOfBirthMonth}/{student.dateOfBirthYear}</p>
                          <p><strong>Gender:</strong> {student.gender}</p>
                          <p><strong>State of Origin:</strong> {student.stateOfOrigin}</p>
                          <p><strong>Nationality:</strong> {student.nationality}</p>
                          <p><strong>Religion:</strong> {student.religion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions for pending applications */}
                {selectedApplication.status === 'PENDING' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Rejection Reason (required for rejection)
                      </label>
                      <Textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter reason for rejection..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button
                        onClick={() => handleApprove(selectedApplication.id)}
                        disabled={actionLoading === selectedApplication.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {actionLoading === selectedApplication.id ? 'Processing...' : 'Approve Application'}
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedApplication.id)}
                        disabled={actionLoading === selectedApplication.id || !rejectionReason.trim()}
                        variant="destructive"
                      >
                        {actionLoading === selectedApplication.id ? 'Processing...' : 'Reject Application'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Show rejection reason if rejected */}
                {selectedApplication.status === 'REJECTED' && selectedApplication.rejectionReason && (
                  <div>
                    <h4 className="font-medium mb-2">Rejection Reason</h4>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-800">{selectedApplication.rejectionReason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
