'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sendEmail, emailTemplates } from '@/lib/email'

export async function getParentDashboardData() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return { success: false, message: 'Not authenticated' }
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        applications: {
          include: {
            students: {
              include: {
                enrollments: true,
                feeStructures: {
                  include: {
                    payments: true
                  }
                }
              }
            }
          }
        },
        notifications: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })
    
    if (!user) {
      return { success: false, message: 'User not found' }
    }
    
    return { success: true, data: user }
  } catch (error) {
    console.error('Failed to fetch parent dashboard data:', error)
    return { success: false, message: 'Failed to fetch dashboard data' }
  }
}

export async function getPaymentHistory(parentId: string) {
  try {
    const payments = await prisma.payment.findMany({
      where: { parentId },
      include: {
        feeStructure: {
          include: {
            student: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return { success: true, payments }
  } catch (error) {
    console.error('Failed to fetch payment history:', error)
    return { success: false, payments: [] }
  }
}

export async function makePayment(feeStructureId: string, paymentMethod: string) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return { success: false, message: 'Not authenticated' }
    }
    
    const feeStructure = await prisma.feeStructure.findUnique({
      where: { id: feeStructureId },
      include: { student: true }
    })
    
    if (!feeStructure) {
      return { success: false, message: 'Fee structure not found' }
    }
    
    // Generate payment number
    const paymentNumber = `PAY${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    
    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        paymentNumber,
        parentId: session.user.id,
        feeStructureId,
        amount: feeStructure.amount,
        status: 'COMPLETED', // In real app, this would be PENDING until payment gateway confirms
        paymentMethod,
        transactionId: `TXN${Date.now()}`,
        paidAt: new Date()
      },
      include: {
        feeStructure: {
          include: {
            student: true
          }
        },
        parent: true
      }
    })
    
    // Send payment confirmation email
    await sendEmail({
      to: payment.parent.email,
      subject: 'Payment Confirmation - ARQAM',
      html: emailTemplates.paymentConfirmation(
        payment.paymentNumber,
        payment.parent.name,
        payment.amount.toString(),
        `${payment.feeStructure.student.surname} ${payment.feeStructure.student.otherName}`
      )
    })
    
    // Create notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: 'Payment Received',
        message: `Payment of $${payment.amount} for ${payment.feeStructure.student.surname} ${payment.feeStructure.student.otherName} has been processed successfully.`,
        type: 'PAYMENT_RECEIVED'
      }
    })
    
    return { success: true, payment, message: 'Payment processed successfully!' }
  } catch (error) {
    console.error('Payment processing error:', error)
    return { success: false, message: 'Failed to process payment' }
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    })
    
    return { success: true }
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
    return { success: false }
  }
}
