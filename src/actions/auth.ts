'use server'

import { prisma } from '@/lib/prisma'
import * as bcrypt from 'bcryptjs'
import { loginSchema, registrationSchema } from '@/lib/validations'

export async function loginUser(email: string, password: string) {
  try {
    const validatedData = loginSchema.parse({ email, password })
    
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        parentProfile: true,
        adminProfile: true
      }
    })
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' }
    }
    
    const isValidPassword = await bcrypt.compare(validatedData.password, user.password)
    
    if (!isValidPassword) {
      return { success: false, message: 'Invalid email or password' }
    }
    
    return { 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'An error occurred during login' }
  }
}

export async function registerUser(data: any) {
  try {
    const validatedData = registrationSchema.parse(data)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return { success: false, message: 'User already exists with this email' }
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        phone: validatedData.phone,
        password: hashedPassword,
        role: 'PARENT',
        parentProfile: {
          create: {}
        }
      }
    })
    
    return { 
      success: true, 
      message: 'Account created successfully!',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, message: 'Failed to create account' }
  }
}
