import { z } from 'zod'

// Application form validation
export const applicationSchema = z.object({
  parentInfo: z.object({
    name: z.string().min(2, 'Parent/Guardian name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    address: z.string().min(5, 'Resident address must be at least 5 characters'),
    medicalInstructions: z.string().optional(),
    signature: z.string().min(1, 'Parent signature is required'),
  }),
  students: z.array(
    z.object({
      surname: z.string().min(2, 'Surname must be at least 2 characters'),
      otherName: z.string().min(2, 'Other name must be at least 2 characters'),
      gender: z.enum(['MALE', 'FEMALE']),
      dateOfBirthDay: z.string().min(1, 'Day is required'),
      dateOfBirthMonth: z.string().min(1, 'Month is required'),
      dateOfBirthYear: z.string().min(4, 'Year is required'),
      stateOfOrigin: z.string().min(2, 'State of origin is required'),
      nationality: z.string().min(2, 'Nationality is required'),
      religion: z.string().min(2, 'Religion is required'),
      classSeekingAdmission: z.string().min(1, 'Class seeking admission is required'),
    })
  ).min(1, 'At least one student is required'),
})

// Login validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Registration validation
export const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Payment validation
export const paymentSchema = z.object({
  feeStructureId: z.string().min(1, 'Fee structure ID is required'),
  amount: z.number().positive('Amount must be positive'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
})

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type RegistrationFormData = z.infer<typeof registrationSchema>
export type PaymentFormData = z.infer<typeof paymentSchema>
export type ContactFormData = z.infer<typeof contactSchema>