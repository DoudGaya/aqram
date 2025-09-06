'use server'

import { prisma } from '@/lib/prisma'
import { applicationSchema, ApplicationFormData } from '@/lib/validations'
import { sendEmail, emailTemplates } from '@/lib/email'
import * as bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

function generateApplicationNumber(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `APP${timestamp.slice(-6)}${random}`
}

function generatePassword(): string {
  return Math.random().toString(36).slice(-8)
}

export async function submitApplication(data: ApplicationFormData) {
  try {
    // Validate the form data
    const validatedData = applicationSchema.parse(data)
    
    // Generate unique application number
    const applicationNumber = generateApplicationNumber()
    
    // Check if parent already exists
    let parentUser = await prisma.user.findUnique({
      where: { email: validatedData.parentInfo.email }
    })
    
    // If parent doesn't exist, create a temporary account
    if (!parentUser) {
      const tempPassword = generatePassword()
      const hashedPassword = await bcrypt.hash(tempPassword, 10)
      
      parentUser = await prisma.user.create({
        data: {
          email: validatedData.parentInfo.email,
          name: validatedData.parentInfo.name,
          phone: validatedData.parentInfo.phone,
          password: hashedPassword,
          role: 'PARENT',
          parentProfile: {
            create: {
              address: validatedData.parentInfo.address,
              medicalInstructions: validatedData.parentInfo.medicalInstructions,
              signature: validatedData.parentInfo.signature,
            }
          }
        }
      })
    }
    
    // Create application
    const application = await prisma.application.create({
      data: {
        applicationNumber,
        parentId: parentUser.id,
        status: 'PENDING',
        students: {
          create: validatedData.students.map(student => ({
            surname: student.surname,
            otherName: student.otherName,
            dateOfBirthDay: student.dateOfBirthDay,
            dateOfBirthMonth: student.dateOfBirthMonth,
            dateOfBirthYear: student.dateOfBirthYear,
            gender: student.gender,
            stateOfOrigin: student.stateOfOrigin,
            nationality: student.nationality,
            religion: student.religion,
            classSeekingAdmission: student.classSeekingAdmission,
          }))
        }
      },
      include: {
        students: true
      }
    })
    
    // Create notification
    await prisma.notification.create({
      data: {
        userId: parentUser.id,
        applicationId: application.id,
        title: 'Application Submitted',
        message: `Your application ${applicationNumber} has been submitted successfully and is under review.`,
        type: 'APPLICATION_SUBMITTED'
      }
    })
    
    // Send confirmation email
    await sendEmail({
      to: validatedData.parentInfo.email,
      subject: 'Application Submitted - ARQAM',
      html: emailTemplates.applicationSubmitted(applicationNumber, validatedData.parentInfo.name)
    })
    
    return {
      success: true,
      applicationNumber,
      message: 'Application submitted successfully!'
    }
  } catch (error) {
    console.error('Application submission error:', error)
    return {
      success: false,
      message: 'Failed to submit application. Please try again.'
    }
  }
}

export async function getApplications() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        parent: true,
        students: true,
        _count: {
          select: {
            students: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    })
    
    return { success: true, applications }
  } catch (error) {
    console.error('Failed to fetch applications:', error)
    return { success: false, applications: [] }
  }
}

export async function updateApplicationStatus(
  applicationId: string, 
  status: 'APPROVED' | 'REJECTED', 
  rejectionReason?: string
) {
  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { parent: true, students: true }
    })
    
    if (!application) {
      return { success: false, message: 'Application not found' }
    }
    
    // Update application status
    await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        reviewedAt: new Date(),
        rejectionReason: status === 'REJECTED' ? rejectionReason : null
      }
    })
    
    if (status === 'APPROVED') {
      // Create enrollments for all students
      const currentYear = new Date().getFullYear().toString()
      for (const student of application.students) {
        await prisma.enrollment.create({
          data: {
            studentId: student.id,
            academicYear: currentYear,
            grade: student.classSeekingAdmission,
            status: 'ACTIVE'
          }
        })
        
        // Create fee structures (example fees)
        const fees = [
          { feeType: 'TUITION', amount: 5000, termName: 'First Term' },
          { feeType: 'REGISTRATION', amount: 500, termName: 'One Time' },
          { feeType: 'UNIFORM', amount: 200, termName: 'One Time' },
          { feeType: 'BOOKS', amount: 300, termName: 'Annual' },
        ]
        
        for (const fee of fees) {
          await prisma.feeStructure.create({
            data: {
              studentId: student.id,
              academicYear: currentYear,
              termName: fee.termName,
              feeType: fee.feeType as any,
              amount: fee.amount,
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
            }
          })
        }
      }
      
      // Send approval email with login credentials
      const tempPassword = generatePassword()
      const hashedPassword = await bcrypt.hash(tempPassword, 10)
      
      await prisma.user.update({
        where: { id: application.parentId },
        data: { password: hashedPassword }
      })
      
      const loginUrl = `${process.env.APP_URL}/login`
      
      await sendEmail({
        to: application.parent.email,
        subject: 'Application Approved - Welcome to ARQAM!',
        html: emailTemplates.applicationApproved(
          application.applicationNumber,
          application.parent.name,
          loginUrl,
          tempPassword
        )
      })
      
      // Create notification
      await prisma.notification.create({
        data: {
          userId: application.parentId,
          applicationId: application.id,
          title: 'Application Approved!',
          message: `Congratulations! Your application ${application.applicationNumber} has been approved. Check your email for login details.`,
          type: 'APPLICATION_APPROVED'
        }
      })
    } else {
      // Send rejection email
      await sendEmail({
        to: application.parent.email,
        subject: 'Application Update - ARQAM',
        html: emailTemplates.applicationRejected(
          application.applicationNumber,
          application.parent.name,
          rejectionReason || ''
        )
      })
      
      // Create notification
      await prisma.notification.create({
        data: {
          userId: application.parentId,
          applicationId: application.id,
          title: 'Application Update',
          message: `Your application ${application.applicationNumber} has been reviewed. Please check your email for details.`,
          type: 'APPLICATION_REJECTED'
        }
      })
    }
    
    return { success: true, message: `Application ${status.toLowerCase()} successfully!` }
  } catch (error) {
    console.error('Failed to update application:', error)
    return { success: false, message: 'Failed to update application status' }
  }
}