# ARQAM Management System

A comprehensive school management system built with Next.js, TypeScript, Tailwind CSS, Prisma, and NextAuth.js.

## Features

### For Visitors
- 🏠 Beautiful landing page with school information
- 📝 Online application form for multiple children
- ✅ Application success page with tracking number
- ✉️ Email confirmations and notifications

### For Parents
- 🔐 Secure login with NextAuth.js
- 📊 Dashboard with children's enrollment status
- 💳 Online fee payment system
- 🔔 Real-time notifications
- 📋 Application tracking and history

### For Administrators
- 👨‍💼 Admin dashboard for application management
- ✅ Approve or reject applications with reasons
- 📧 Automated email notifications to parents
- 👥 Student enrollment management
- 💰 Fee structure and payment tracking

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Email**: Nodemailer
- **Validation**: Zod
- **UI Components**: Custom components with Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or use NeonDB)
- Email service credentials (Gmail, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bunny-school
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/aqram?schema=public"
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Email Configuration
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM=noreply@aqram.com
   
   # Application
   APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Push the schema to your database
   npx prisma db push
   
   # Generate Prisma client
   npx prisma generate
   
   # Seed the database with demo data
   npx tsx prisma/seed.ts
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Accounts

After seeding the database, you can use these demo accounts:

### Admin Account
- **Email**: admin@aqram.com
- **Password**: admin123
- **Access**: Admin dashboard for managing applications

### Parent Account (with approved children)
- **Email**: parent@example.com
- **Password**: parent123
- **Access**: Parent dashboard with enrolled students and fee payments

### Parent Account (with pending application)
- **Email**: pending@example.com
- **Password**: temp123
- **Access**: Parent dashboard with pending application

## Project Structure

```
src/
├── actions/           # Server actions for business logic
│   ├── applications.ts
│   ├── auth.ts
│   └── dashboard.ts
├── app/              # Next.js app router
│   ├── admin/        # Admin-only pages
│   ├── api/          # API routes
│   ├── apply/        # Application form
│   ├── dashboard/    # Parent dashboard
│   ├── login/        # Login page
│   └── page.tsx      # Landing page
├── components/       # Reusable UI components
│   └── ui/           # Base UI components
├── lib/              # Utilities and configurations
│   ├── auth.ts       # NextAuth configuration
│   ├── email.ts      # Email templates and functions
│   ├── prisma.ts     # Prisma client
│   ├── utils.ts      # General utilities
│   └── validations.ts # Zod schemas
└── prisma/
    ├── schema.prisma  # Database schema
    └── seed.ts        # Seed script
```

## Key Features Explained

### Application Process
1. **Submit Application**: Parents fill out the online form for one or multiple children
2. **Email Confirmation**: Automated email sent with application number
3. **Admin Review**: Admins can view, approve, or reject applications
4. **Approval Process**: Creates student enrollments and fee structures automatically
5. **Parent Access**: Approved parents receive login credentials to access dashboard

### Fee Management
- Automatic fee structure creation for approved students
- Different fee types: Tuition, Registration, Uniform, Books, etc.
- Online payment processing (demo implementation)
- Payment history and receipt tracking

### Notification System
- Real-time notifications for parents and admins
- Email notifications for important events
- Mark notifications as read functionality

### Security
- Secure authentication with NextAuth.js
- Role-based access control (PARENT, ADMIN, SUPER_ADMIN)
- Password hashing with bcrypt
- CSRF protection and secure sessions

## Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: Authentication and basic user information
- **Applications**: School admission applications
- **Students**: Student information linked to applications
- **Enrollments**: Active student enrollments
- **FeeStructures**: Fee definitions for students
- **Payments**: Payment records and transactions
- **Notifications**: System notifications for users

## Email Templates

The system includes professional email templates for:
- Application submission confirmation
- Application approval with login credentials
- Application rejection with reason
- Payment confirmations
- Fee due reminders

## Deployment

For production deployment:

1. **Database**: Use a managed PostgreSQL service (NeonDB, Supabase, etc.)
2. **Environment**: Update all environment variables for production
3. **Email**: Configure production email service
4. **Build**: Run `npm run build` to create production build
5. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact:
- Email: support@aqram.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ for ARQAM
# aqram
