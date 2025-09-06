import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}

// Email templates
export const emailTemplates = {
  applicationSubmitted: (applicationNumber: string, parentName: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">ARQAM</h1>
      </div>
      <div style="padding: 30px; background: #f9fafb;">
        <h2 style="color: #1f2937;">Application Submitted Successfully!</h2>
        <p style="color: #4b5563; font-size: 16px;">Dear ${parentName},</p>
        <p style="color: #4b5563; font-size: 16px;">
          Thank you for submitting your application to ARQAM. We have received your application and our admissions team will review it within 3-5 business days.
        </p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
          <p style="margin: 0; color: #1f2937;"><strong>Application Number:</strong> ${applicationNumber}</p>
        </div>
        <p style="color: #4b5563; font-size: 16px;">
          You will receive an email notification once your application has been reviewed. If approved, you'll receive login credentials to access your parent dashboard where you can manage your child's enrollment and payments.
        </p>
        <p style="color: #4b5563; font-size: 16px;">
          If you have any questions, please don't hesitate to contact us at <a href="mailto:info@aqram.com" style="color: #3b82f6;">info@aqram.com</a> or +1 (555) 123-4567.
        </p>
        <p style="color: #4b5563; font-size: 16px;">Best regards,<br>The ARQAM Admissions Team</p>
      </div>
    </div>
  `,

  applicationApproved: (applicationNumber: string, parentName: string, loginUrl: string, tempPassword: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">ARQAM</h1>
      </div>
      <div style="padding: 30px; background: #f9fafb;">
        <h2 style="color: #1f2937;">🎉 Application Approved!</h2>
        <p style="color: #4b5563; font-size: 16px;">Dear ${parentName},</p>
        <p style="color: #4b5563; font-size: 16px;">
          Congratulations! We are pleased to inform you that your application (${applicationNumber}) has been approved. Welcome to the ARQAM family!
        </p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #1f2937;">Next Steps:</h3>
          <ol style="color: #4b5563;">
            <li>Access your parent dashboard using the link below</li>
            <li>Complete the enrollment process</li>
            <li>Review and pay the required fees</li>
            <li>Submit any additional required documents</li>
          </ol>
        </div>
        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #1f2937;"><strong>Dashboard Access:</strong></p>
          <p style="margin: 5px 0; color: #1f2937;">URL: <a href="${loginUrl}" style="color: #3b82f6;">${loginUrl}</a></p>
          <p style="margin: 5px 0; color: #1f2937;">Temporary Password: <strong>${tempPassword}</strong></p>
          <p style="margin: 5px 0; color: #dc2626; font-size: 14px;"><em>Please change your password after first login</em></p>
        </div>
        <p style="color: #4b5563; font-size: 16px;">
          We look forward to partnering with you in your child's educational journey. If you have any questions, please contact us at <a href="mailto:info@aqram.com" style="color: #3b82f6;">info@aqram.com</a>.
        </p>
        <p style="color: #4b5563; font-size: 16px;">Best regards,<br>The ARQAM Admissions Team</p>
      </div>
    </div>
  `,

  applicationRejected: (applicationNumber: string, parentName: string, reason: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #ef4444, #f97316); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">ARQAM</h1>
      </div>
      <div style="padding: 30px; background: #f9fafb;">
        <h2 style="color: #1f2937;">Application Update</h2>
        <p style="color: #4b5563; font-size: 16px;">Dear ${parentName},</p>
        <p style="color: #4b5563; font-size: 16px;">
          Thank you for your interest in ARQAM. After careful review, we regret to inform you that we are unable to accept your application (${applicationNumber}) at this time.
        </p>
        ${reason ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <p style="margin: 0; color: #1f2937;"><strong>Reason:</strong> ${reason}</p>
          </div>
        ` : ''}
        <p style="color: #4b5563; font-size: 16px;">
          We encourage you to apply again in the future. Our admissions criteria may change, and we would be happy to reconsider your application.
        </p>
        <p style="color: #4b5563; font-size: 16px;">
          If you have any questions about this decision, please feel free to contact our admissions office at <a href="mailto:admissions@aqram.com" style="color: #3b82f6;">admissions@aqram.com</a>.
        </p>
        <p style="color: #4b5563; font-size: 16px;">Best regards,<br>The ARQAM Admissions Team</p>
      </div>
    </div>
  `,

  paymentConfirmation: (paymentNumber: string, parentName: string, amount: string, studentName: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">ARQAM</h1>
      </div>
      <div style="padding: 30px; background: #f9fafb;">
        <h2 style="color: #1f2937;">Payment Received</h2>
        <p style="color: #4b5563; font-size: 16px;">Dear ${parentName},</p>
        <p style="color: #4b5563; font-size: 16px;">
          Thank you for your payment. We have successfully received your payment for ${studentName}.
        </p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
          <p style="margin: 0; color: #1f2937;"><strong>Payment Number:</strong> ${paymentNumber}</p>
          <p style="margin: 5px 0; color: #1f2937;"><strong>Amount:</strong> $${amount}</p>
          <p style="margin: 5px 0; color: #1f2937;"><strong>Student:</strong> ${studentName}</p>
          <p style="margin: 5px 0; color: #1f2937;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <p style="color: #4b5563; font-size: 16px;">
          You can view all your payment history and download receipts from your parent dashboard.
        </p>
        <p style="color: #4b5563; font-size: 16px;">Best regards,<br>The ARQAM Finance Team</p>
      </div>
    </div>
  `
}