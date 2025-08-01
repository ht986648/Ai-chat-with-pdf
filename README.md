# AI-Powered Resume Builder

A modern, intelligent resume builder that uses AI to help you create professional resumes by analyzing your PDF documents and providing contextual assistance.

## 🚀 Features

- **PDF Upload & Analysis**: Upload your resume PDF and let AI analyze its content
- **Intelligent Chat Interface**: Ask questions about your resume and get AI-powered insights
- **Context-Aware Responses**: AI understands your resume content and provides relevant suggestions
- **Real-time Chat**: Interactive chat interface with streaming responses
- **User Authentication**: Secure user management with Clerk
- **Database Storage**: Persistent chat history and document storage
- **Modern UI**: Beautiful, responsive design with animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Google Generative AI (Gemini)
- **Authentication**: Clerk
- **File Storage**: AWS S3
- **Vector Database**: Pinecone
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **UI Components**: Radix UI, Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google Cloud account (for Gemini API)
- AWS account (for S3)
- Pinecone account
- Clerk account

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# AI
GEMINI_API_KEY="your_gemini_api_key"

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# AWS S3
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="your_aws_region"
S3_BUCKET_NAME="your_s3_bucket_name"

# Pinecone
PINECONE_API_KEY="your_pinecone_api_key"
PINECONE_ENVIRONMENT="your_pinecone_environment"
PINECONE_INDEX_NAME="your_pinecone_index_name"

# Stripe (optional)
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-powered-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Generate and run migrations
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── chat/          # Chat endpoint
│   │   ├── create-chat/   # Create new chat
│   │   ├── get-messages/  # Get chat messages
│   │   └── stripe/        # Stripe integration
│   ├── chat/              # Chat page
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── ChatComponent.tsx  # Main chat interface
│   ├── FileUpload.tsx     # PDF upload component
│   ├── MessageList.tsx    # Message display
│   └── ui/                # UI components
├── lib/                   # Utility libraries
│   ├── db/                # Database configuration
│   ├── embeddings.ts      # Text embedding utilities
│   ├── pinecone.ts        # Pinecone integration
│   └── s3.ts             # S3 file upload
└── middleware.ts          # Next.js middleware
```

## 🔄 API Endpoints

### POST `/api/create-chat`
Creates a new chat session for a PDF file.

**Request:**
```json
{
  "file_key": "path/to/file.pdf",
  "file_name": "resume.pdf"
}
```

**Response:**
```json
{
  "chat_id": 123,
  "message": "Chat created successfully"
}
```

### POST `/api/chat`
Sends a message to the AI and gets a response.

**Request:**
```json
{
  "messages": [{"role": "user", "content": "How can I improve my resume?"}],
  "chatId": 123
}
```

**Response:**
```json
{
  "completion": "Based on your resume, here are some suggestions..."
}
```

### POST `/api/get-messages`
Retrieves all messages for a specific chat.

**Request:**
```json
{
  "chatId": 123
}
```

**Response:**
```json
[
  {
    "id": 1,
    "chatId": 123,
    "content": "How can I improve my resume?",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

## 🎯 Usage

1. **Upload Your Resume**: Drag and drop your PDF resume or click to browse
2. **Start Chatting**: Ask questions about your resume, career advice, or improvements
3. **Get AI Insights**: Receive personalized suggestions based on your resume content
4. **Save Conversations**: All your chat history is automatically saved

## 🔒 Security

- User authentication with Clerk
- Secure file uploads to S3
- API rate limiting
- Input validation and sanitization
- Environment variable protection

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in the Vercel dashboard
3. **Deploy** with automatic builds

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include error logs and steps to reproduce

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Google Generative AI](https://ai.google.dev/) for the AI capabilities
- [Clerk](https://clerk.com/) for authentication
- [Drizzle ORM](https://orm.drizzle.team/) for database management
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Made with ❤️ by [Your Name]**
