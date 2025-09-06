import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const hashedAdminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aqram.com' },
    update: {},
    create: {
      email: 'admin@aqram.com',
      password: hashedAdminPassword,
      name: 'Admin User',
      phone: '+1234567890',
      role: 'ADMIN',
      adminProfile: {
        create: {
          position: 'Admissions Officer',
          department: 'Administration'
        }
      }
    }
  })

  // Create demo parent user
  const hashedParentPassword = await bcrypt.hash('parent123', 10)
  const parent = await prisma.user.upsert({
    where: { email: 'parent@example.com' },
    update: {},
    create: {
      email: 'parent@example.com',
      password: hashedParentPassword,
      name: 'John Smith',
      phone: '+1987654321',
      role: 'PARENT',
      parentProfile: {
        create: {
          address: '123 Main Street, Anytown, ST 12345',
          medicalInstructions: 'Contact family doctor at +1555987654 in case of emergency',
          signature: 'John Smith'
        }
      }
    }
  })

  // Create demo application
  const application = await prisma.application.create({
    data: {
      applicationNumber: 'APP2024001',
      parentId: parent.id,
      status: 'APPROVED',
      submittedAt: new Date('2024-01-15'),
      reviewedAt: new Date('2024-01-18'),
      students: {
        create: [
          {
            surname: 'Smith',
            otherName: 'Emma',
            dateOfBirthDay: '15',
            dateOfBirthMonth: '5',
            dateOfBirthYear: '2018',
            gender: 'FEMALE',
            stateOfOrigin: 'Lagos',
            nationality: 'Nigerian',
            religion: 'Christianity',
            classSeekingAdmission: 'Kindergarten'
          },
          {
            surname: 'Smith',
            otherName: 'Oliver',
            dateOfBirthDay: '22',
            dateOfBirthMonth: '8',
            dateOfBirthYear: '2015',
            gender: 'MALE',
            stateOfOrigin: 'Lagos',
            nationality: 'Nigerian',
            religion: 'Christianity',
            classSeekingAdmission: 'Grade 3'
          }
        ]
      }
    },
    include: {
      students: true
    }
  })

  // Create enrollments and fee structures for approved students
  for (const student of application.students) {
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        academicYear: '2024',
        grade: student.classSeekingAdmission,
        status: 'ACTIVE'
      }
    })

    // Create fee structures
    const fees = [
      { feeType: 'TUITION', amount: 5000, termName: 'First Term', dueDate: new Date('2024-03-15') },
      { feeType: 'REGISTRATION', amount: 500, termName: 'One Time', dueDate: new Date('2024-02-01') },
      { feeType: 'UNIFORM', amount: 200, termName: 'One Time', dueDate: new Date('2024-02-15') },
      { feeType: 'BOOKS', amount: 300, termName: 'Annual', dueDate: new Date('2024-03-01') }
    ]

    for (const fee of fees) {
      await prisma.feeStructure.create({
        data: {
          studentId: student.id,
          academicYear: '2024',
          termName: fee.termName,
          feeType: fee.feeType as any,
          amount: fee.amount,
          dueDate: fee.dueDate
        }
      })
    }
  }

  // Create some notifications
  await prisma.notification.create({
    data: {
      userId: parent.id,
      applicationId: application.id,
      title: 'Application Approved!',
      message: 'Congratulations! Your application APP2024001 has been approved. Welcome to ARQAM!',
      type: 'APPLICATION_APPROVED'
    }
  })

  await prisma.notification.create({
    data: {
      userId: parent.id,
      title: 'Fee Payment Due',
      message: 'Registration fees for Emma Smith and Oliver Smith are due by February 1st, 2024.',
      type: 'PAYMENT_DUE'
    }
  })

  // Create a pending application for demo
  const pendingParent = await prisma.user.create({
    data: {
      email: 'pending@example.com',
      password: await bcrypt.hash('temp123', 10),
      name: 'Sarah Johnson',
      phone: '+1555987654',
      role: 'PARENT',
      parentProfile: {
        create: {
          address: '456 Oak Avenue, Somewhere, ST 67890',
          medicalInstructions: 'In case of emergency, contact family doctor at +1555111222',
          signature: 'Sarah Johnson'
        }
      }
    }
  })

  const pendingApplication = await prisma.application.create({
    data: {
      applicationNumber: 'APP2024002',
      parentId: pendingParent.id,
      status: 'PENDING',
      submittedAt: new Date(),
      students: {
        create: [
          {
            surname: 'Johnson',
            otherName: 'Liam',
            dateOfBirthDay: '10',
            dateOfBirthMonth: '3',
            dateOfBirthYear: '2019',
            gender: 'MALE',
            stateOfOrigin: 'Abuja',
            nationality: 'Nigerian',
            religion: 'Christianity',
            classSeekingAdmission: 'Nursery 2'
          }
        ]
      }
    }
  })

  await prisma.notification.create({
    data: {
      userId: pendingParent.id,
      applicationId: pendingApplication.id,
      title: 'Application Submitted',
      message: 'Your application APP2024002 has been submitted successfully and is under review.',
      type: 'APPLICATION_SUBMITTED'
    }
  })

  console.log('✅ Seed completed successfully!')
  console.log('Demo accounts created:')
  console.log('Admin: admin@aqram.com / admin123')
  console.log('Parent (with approved children): parent@example.com / parent123')
  console.log('Parent (with pending application): pending@example.com / temp123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
