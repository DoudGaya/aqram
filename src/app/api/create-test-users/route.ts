import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    console.log('Creating test users...')
    
    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10)
    const parentPassword = await bcrypt.hash('parent123', 10)

    // Create admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@aqram.com' },
      update: {},
      create: {
        email: 'admin@aqram.com',
        password: adminPassword,
        name: 'School Administrator',
        role: 'ADMIN',
        phone: '+234-800-123-4567',
        adminProfile: {
          create: {
            position: 'Head Administrator',
            department: 'Administration'
          }
        }
      }
    })

    // Create parent user
    const parentUser = await prisma.user.upsert({
      where: { email: 'parent@example.com' },
      update: {},
      create: {
        email: 'parent@example.com',
        password: parentPassword,
        name: 'John Doe',
        role: 'PARENT',
        phone: '+234-800-987-6543',
        parentProfile: {
          create: {
            address: '123 Lagos Street, Victoria Island, Lagos',
            medicalInstructions: 'Child is allergic to peanuts. Please contact parent immediately in case of emergency.',
            signature: 'John Doe'
          }
        }
      }
    })

    console.log('✅ Test users created successfully!')

    return NextResponse.json({ 
      success: true,
      message: 'Test users created successfully!',
      users: [
        { email: 'admin@aqram.com', password: 'admin123', role: 'ADMIN' },
        { email: 'parent@example.com', password: 'parent123', role: 'PARENT' }
      ]
    })

  } catch (error) {
    console.error('Error creating test users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create test users', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
}
