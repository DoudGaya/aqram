'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { submitApplication } from '@/actions/applications'
import { ApplicationFormData } from '@/lib/validations'
import { Plus, Minus, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function ApplyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    parentInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      medicalInstructions: '',
      signature: '',
    },
    students: [{
      surname: '',
      otherName: '',
      gender: 'MALE',
      dateOfBirthDay: '',
      dateOfBirthMonth: '',
      dateOfBirthYear: '',
      stateOfOrigin: '',
      nationality: '',
      religion: '',
      classSeekingAdmission: '',
    }]
  })

  const addStudent = () => {
    setFormData(prev => ({
      ...prev,
      students: [...prev.students, {
        surname: '',
        otherName: '',
        gender: 'MALE',
        dateOfBirthDay: '',
        dateOfBirthMonth: '',
        dateOfBirthYear: '',
        stateOfOrigin: '',
        nationality: '',
        religion: '',
        classSeekingAdmission: '',
      }]
    }))
  }

  const removeStudent = (index: number) => {
    if (formData.students.length > 1) {
      setFormData(prev => ({
        ...prev,
        students: prev.students.filter((_, i) => i !== index)
      }))
    }
  }

  const updateParentInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      parentInfo: {
        ...prev.parentInfo,
        [field]: value
      }
    }))
  }

  const updateStudent = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.map((student, i) => 
        i === index ? { ...student, [field]: value } : student
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await submitApplication(formData)
      
      if (result.success) {
        router.push(`/application-success?applicationNumber=${result.applicationNumber}`)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const grades = [
    'Nursery 1', 'Nursery 2', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 
    'Grade 4', 'Grade 5', 'Grade 6', 'JSS 1', 'JSS 2', 'JSS 3', 
    'SS 1', 'SS 2', 'SS 3'
  ]

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString())

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT (Abuja)'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
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

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">School Application Form</h1>
          <p className="text-lg text-gray-600">
            Complete this form to apply for admission to ARQAM. You can apply for multiple children at once.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Parent Information */}
          <Card>
            <CardHeader>
              <CardTitle>Parent/Guardian Information</CardTitle>
              <CardDescription>
                Please provide your contact and personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                  <Input
                    id="parentName"
                    value={formData.parentInfo.name}
                    onChange={(e) => updateParentInfo('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="parentEmail">Email Address *</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentInfo.email}
                    onChange={(e) => updateParentInfo('email', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentPhone">Tel (Phone Number) *</Label>
                  <Input
                    id="parentPhone"
                    value={formData.parentInfo.phone}
                    onChange={(e) => updateParentInfo('phone', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signature">Parent Signature *</Label>
                  <Input
                    id="signature"
                    placeholder="Type your full name as signature"
                    value={formData.parentInfo.signature}
                    onChange={(e) => updateParentInfo('signature', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Resident Address *</Label>
                <Textarea
                  id="address"
                  value={formData.parentInfo.address}
                  onChange={(e) => updateParentInfo('address', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="medicalInstructions">Parent&apos;s instruction for urgent medical attention</Label>
                <Textarea
                  id="medicalInstructions"
                  placeholder="Please provide any special medical instructions or emergency procedures"
                  value={formData.parentInfo.medicalInstructions}
                  onChange={(e) => updateParentInfo('medicalInstructions', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Student Information */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Student Information</h2>
              <Button
                type="button"
                onClick={addStudent}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Child</span>
              </Button>
            </div>

            {formData.students.map((student, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Student {index + 1}</CardTitle>
                    {formData.students.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeStudent(index)}
                        variant="outline"
                        size="sm"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`surname-${index}`}>Surname *</Label>
                      <Input
                        id={`surname-${index}`}
                        value={student.surname}
                        onChange={(e) => updateStudent(index, 'surname', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`otherName-${index}`}>Other Name *</Label>
                      <Input
                        id={`otherName-${index}`}
                        value={student.otherName}
                        onChange={(e) => updateStudent(index, 'otherName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`gender-${index}`}>Gender *</Label>
                      <Select
                        value={student.gender}
                        onChange={(e) => updateStudent(index, 'gender', e.target.value)}
                        required
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`classSeekingAdmission-${index}`}>Class Seeking Admission *</Label>
                      <Select
                        value={student.classSeekingAdmission}
                        onChange={(e) => updateStudent(index, 'classSeekingAdmission', e.target.value)}
                        required
                      >
                        <option value="">Select Class</option>
                        {grades.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Date of Birth *</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`day-${index}`}>Day</Label>
                        <Select
                          value={student.dateOfBirthDay}
                          onChange={(e) => updateStudent(index, 'dateOfBirthDay', e.target.value)}
                          required
                        >
                          <option value="">Day</option>
                          {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`month-${index}`}>Month</Label>
                        <Select
                          value={student.dateOfBirthMonth}
                          onChange={(e) => updateStudent(index, 'dateOfBirthMonth', e.target.value)}
                          required
                        >
                          <option value="">Month</option>
                          {months.map((month, i) => (
                            <option key={month} value={(i + 1).toString()}>{month}</option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`year-${index}`}>Year</Label>
                        <Select
                          value={student.dateOfBirthYear}
                          onChange={(e) => updateStudent(index, 'dateOfBirthYear', e.target.value)}
                          required
                        >
                          <option value="">Year</option>
                          {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`stateOfOrigin-${index}`}>State of Origin *</Label>
                      <Select
                        value={student.stateOfOrigin}
                        onChange={(e) => updateStudent(index, 'stateOfOrigin', e.target.value)}
                        required
                      >
                        <option value="">Select State</option>
                        {nigerianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`nationality-${index}`}>Nationality *</Label>
                      <Input
                        id={`nationality-${index}`}
                        value={student.nationality}
                        onChange={(e) => updateStudent(index, 'nationality', e.target.value)}
                        placeholder="e.g., Nigerian"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`religion-${index}`}>Religion *</Label>
                      <Input
                        id={`religion-${index}`}
                        value={student.religion}
                        onChange={(e) => updateStudent(index, 'religion', e.target.value)}
                        placeholder="e.g., Christianity, Islam, etc."
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="px-8"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}