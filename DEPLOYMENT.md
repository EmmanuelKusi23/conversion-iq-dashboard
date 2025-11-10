# Deployment Guide - Conversion IQ Dashboard

This guide covers multiple deployment options for the Conversion IQ Dashboard.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deployment Options](#deployment-options)
   - [Vercel (Recommended)](#option-1-vercel-recommended)
   - [Docker + AWS/DigitalOcean](#option-2-docker--awsdigitalocean)
   - [Traditional VPS](#option-3-traditional-vps)
3. [Post-Deployment Setup](#post-deployment-setup)
4. [Domain Configuration](#domain-configuration)
5. [SSL/TLS Setup](#ssltls-setup)
6. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Prerequisites

- [ ] GitHub account
- [ ] Node.js 18+ installed locally
- [ ] All environment variables documented
- [ ] Database setup (PostgreSQL recommended)
- [ ] Payment gateway accounts (Flutterwave/Hubtel)
- [ ] API keys for Meta Ads, Google Ads, TikTok

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Best for**: Quick deployment, automatic CI/CD, serverless architecture

#### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Conversion IQ Dashboard"

# Create GitHub repository and push
git remote add origin https://github.com/your-username/conversion-iq-dashboard.git
git push -u origin main
```

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Step 3: Configure Environment Variables

In Vercel dashboard, add all variables from `.env.example`:

```
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
FLUTTERWAVE_PUBLIC_KEY=your_key
... (add all required variables)
```

#### Step 4: Deploy

- Click "Deploy"
- Wait for build to complete (3-5 minutes)
- Your app will be live at `https://your-project.vercel.app`

#### Step 5: Add Custom Domain

1. In Vercel dashboard, go to "Settings" > "Domains"
2. Add your domain (e.g., `dashboard.conversion-iq.com`)
3. Update DNS records as instructed by Vercel:
   ```
   Type: CNAME
   Name: dashboard
   Value: cname.vercel-dns.com
   ```

---

### Option 2: Docker + AWS/DigitalOcean

**Best for**: Full control, scalability, microservices architecture

#### Step 1: Set Up Cloud Instance

**AWS EC2:**
```bash
# Launch EC2 instance (Ubuntu 22.04 LTS)
# Instance type: t3.medium or larger
# Security group: Allow ports 22, 80, 443, 3000
```

**DigitalOcean Droplet:**
```bash
# Create droplet (Ubuntu 22.04 LTS)
# Size: 2GB RAM / 2 vCPUs or larger
# Enable backups
```

#### Step 2: Connect and Install Dependencies

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Install Nginx
apt install nginx -y
```

#### Step 3: Deploy Application

```bash
# Clone repository
git clone https://github.com/your-username/conversion-iq-dashboard.git
cd conversion-iq-dashboard

# Create .env file
nano .env.local
# (paste your environment variables)

# Build and run with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f app
```

#### Step 4: Configure Nginx Reverse Proxy

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/conversion-iq

# Add configuration:
server {
    listen 80;
    server_name dashboard.conversion-iq.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/conversion-iq /etc/nginx/sites-enabled/

# Test and reload Nginx
nginx -t
systemctl reload nginx
```

#### Step 5: Set Up SSL with Let's Encrypt

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d dashboard.conversion-iq.com

# Auto-renewal is configured automatically
```

---

### Option 3: Traditional VPS

**Best for**: Budget-conscious deployment, simple setup

#### Step 1: Prepare Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Git
sudo apt install git -y
```

#### Step 2: Deploy Application

```bash
# Clone repository
git clone https://github.com/your-username/conversion-iq-dashboard.git
cd conversion-iq-dashboard

# Install dependencies
npm ci

# Create .env.local
nano .env.local
# (add your environment variables)

# Build application
npm run build

# Start with PM2
pm2 start npm --name "conversion-iq" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

#### Step 3: Configure Nginx and SSL

(Same as Option 2, Steps 4 and 5)

---

## Post-Deployment Setup

### 1. Verify Deployment

```bash
# Check application health
curl https://dashboard.conversion-iq.com/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2025-01-28T12:00:00.000Z"
}
```

### 2. Test Core Features

- [ ] Dashboard loads successfully
- [ ] All 6 agents are accessible
- [ ] API endpoints respond correctly
- [ ] Mobile view works properly
- [ ] PWA installation works on mobile

### 3. Set Up Monitoring

**Vercel:**
- Enable Web Analytics in dashboard
- Set up uptime monitoring

**Self-Hosted:**
```bash
# Install monitoring tools
npm install -g pm2-logrotate
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 4. Configure Backups

**Database Backups:**
```bash
# Create backup script
cat > /root/backup-db.sh << 'EOF'
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump -U conversion_iq conversion_iq > /backups/db_$TIMESTAMP.sql
# Upload to S3 or cloud storage
aws s3 cp /backups/db_$TIMESTAMP.sql s3://your-backup-bucket/
EOF

chmod +x /root/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /root/backup-db.sh
```

---

## Domain Configuration

### DNS Records

Add these records to your domain provider:

```
Type: A
Name: dashboard
Value: YOUR_SERVER_IP
TTL: 3600

Type: CNAME
Name: www
Value: dashboard.conversion-iq.com
TTL: 3600
```

### Subdomains (Optional)

For different environments:

```
dev.dashboard.conversion-iq.com  -> Development
staging.dashboard.conversion-iq.com -> Staging
dashboard.conversion-iq.com -> Production
```

---

## SSL/TLS Setup

### Let's Encrypt (Free)

Already covered in deployment options above.

### Custom SSL Certificate

```bash
# If you have your own certificate
nano /etc/nginx/sites-available/conversion-iq

# Add SSL configuration:
server {
    listen 443 ssl http2;
    server_name dashboard.conversion-iq.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # ... rest of configuration
}
```

---

## Monitoring & Maintenance

### Health Checks

Set up external monitoring:

- [UptimeRobot](https://uptimerobot.com) - Free uptime monitoring
- [StatusCake](https://www.statuscake.com) - Alternative
- [Pingdom](https://www.pingdom.com) - Premium option

### Log Management

```bash
# View application logs
pm2 logs conversion-iq

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Docker logs
docker-compose logs -f
```

### Performance Monitoring

Consider integrating:
- **Sentry** - Error tracking
- **New Relic** - APM
- **LogRocket** - Session replay
- **Google Analytics** - User analytics

### Security Updates

```bash
# Set up automatic security updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### Scaling

**Vertical Scaling:**
- Upgrade server instance size
- Increase RAM/CPU

**Horizontal Scaling:**
- Add load balancer
- Deploy multiple instances
- Use CDN for static assets

---

## Troubleshooting

### Common Issues

**Issue: App not starting**
```bash
# Check logs
pm2 logs conversion-iq
# or
docker-compose logs app

# Verify environment variables
pm2 env 0
```

**Issue: Database connection failed**
```bash
# Test database connection
psql -U conversion_iq -h localhost -d conversion_iq

# Check DATABASE_URL format
# Should be: postgresql://user:password@host:5432/database
```

**Issue: SSL certificate not working**
```bash
# Renew certificate
certbot renew --force-renewal

# Check certificate status
certbot certificates
```

---

## Support

For deployment issues or questions, contact the Conversion IQ development team.

---

**Last Updated**: January 2025
