# GraphDexStreams Analytics Platform

A modern analytics platform built with Next.js, providing real-time data visualization and statistical analysis capabilities.

## Features

- 🔐 Secure Authentication System
- 📊 Real-time Data Analytics
- 📈 Interactive Dashboards
- 🔄 Real-time Data Updates
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS

## Data Sources

### Real Data
- User authentication and session management
- Database interactions and user data
- API endpoints and server-side operations

### Mock Data
- Initial pool statistics and TVL data
- Token price movements and market data
- Volume and liquidity metrics
- Historical price charts
- APR calculations

*Note: Mock data is used for demonstration purposes. In production, these will be replaced with real-time data from DEX aggregators or no it depends in the point of production and blockchain networks.*

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- PostgreSQL (v14 or higher)

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/Vicent00/GraphDexStreams.git
cd GraphDexStreams
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/graphdexstreams"
JWT_SECRET="your-secure-jwt-secret"
NODE_ENV="development"
```

4. **Database Setup**

Initialize the database with Prisma:
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
GraphDexStreams/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utility functions and libraries
│   ├── utils/           # Helper functions
│   └── types/           # TypeScript type definitions
├── prisma/              # Database schema and migrations
├── public/              # Static files
└── tests/              # Test files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user data
- `POST /api/auth/logout` - Logout user

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/trends` - Get data trends
- `GET /api/analytics/distribution` - Get data distribution

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| DATABASE_URL | PostgreSQL connection string | Yes | - |
| JWT_SECRET | Secret for JWT token generation | Yes | - |
| NODE_ENV | Environment (development/production) | No | development |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email info@vicenteaguilar.com or open an issue in the GitHub repository.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Chart.js](https://www.chartjs.org/)
