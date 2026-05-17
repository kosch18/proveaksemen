# Deployment Guide — Nordic Devices

## Requirements

- Linux server (Ubuntu 22.04 recommended)
- Docker ≥ 24 and Docker Compose ≥ 2.20
- A domain name pointed to the server's IP
- Ports 80 and 443 open in the firewall

---

## 1. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # add current user to docker group
newgrp docker                   # apply without logout
```

---

## 2. Get the project on the server

```bash
git clone <your-repo-url> nordic-devices
cd nordic-devices
```

---

## 3. Configure environment variables

```bash
cp .env.example .env
nano .env
```

Fill in:

| Variable | Description |
|---|---|
| `POSTGRES_PASSWORD` | Strong password for the database |
| `AUTH_SECRET` | Random secret — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Full URL of the site, e.g. `https://your-domain.com` |

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## 4. Configure Nginx domain

Edit `nginx.conf` — replace `your-domain.com` with your real domain (2 places):

```bash
nano nginx.conf
```

---

## 5. Issue SSL certificate (Let's Encrypt)

First start Nginx on HTTP only to pass the ACME challenge:

```bash
# Temporarily comment out the HTTPS server block in nginx.conf,
# then start just nginx and certbot:
docker compose up -d nginx certbot

# Issue the certificate:
docker compose run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  -d your-domain.com \
  --email your@email.com \
  --agree-tos --no-eff-email

# Restore the HTTPS block in nginx.conf, then restart nginx:
docker compose restart nginx
```

---

## 6. Build and start everything

```bash
docker compose up -d --build
```

This will:
1. Build the Next.js image (runs `npm run build`)
2. Start PostgreSQL, wait for it to be healthy
3. Start the app — **automatically runs `prisma db push`** on first boot
4. Start Nginx as reverse proxy with SSL

Check logs:
```bash
docker compose logs -f app
```

---

## 7. Seed initial data

Run once after the first start to populate the database:

```bash
docker compose exec app node node_modules/.bin/prisma db seed
```

Or if tsx is not available in the container, seed locally pointing to the server DB:

```bash
DATABASE_URL="postgresql://nordic:<password>@<server-ip>:5432/nordic_devices" \
  npx prisma db seed
```

> **Note:** The postgres port is NOT exposed to the internet. For remote seed, temporarily add `ports: ["5432:5432"]` to the postgres service, seed, then remove it.

---

## 8. Verify

- Site: `https://your-domain.com`
- Admin panel: `https://your-domain.com/admin`
- Default login: `admin@nordic.local` / `admin123` — **change this immediately in the admin panel**

---

## Updating the site

```bash
git pull
docker compose up -d --build app
```

Prisma schema changes are applied automatically on each container start via `entrypoint.sh`.

---

## Useful commands

```bash
# View all logs
docker compose logs -f

# View app logs only
docker compose logs -f app

# Restart app only (no rebuild)
docker compose restart app

# Stop everything
docker compose down

# Stop and delete database (destructive!)
docker compose down -v

# Open database shell
docker compose exec postgres psql -U nordic -d nordic_devices
```

---

## Architecture

```
Internet
   │ HTTPS (443)
   ▼
┌──────────┐
│  Nginx   │  reverse proxy + SSL termination
└────┬─────┘
     │ HTTP (internal)
     ▼
┌──────────┐     ┌────────────┐
│ Next.js  │────▶│ PostgreSQL │
│  app     │     │  (no port  │
└──────────┘     │ exposed)   │
                 └────────────┘
```

---

## Security notes

- PostgreSQL is **not exposed** to the internet (no `ports` mapping)
- All HTTP traffic is redirected to HTTPS
- Security headers set in Nginx: `X-Frame-Options`, `HSTS`, `X-Content-Type-Options`
- `AUTH_SECRET` is never baked into Git — only passed via `.env`
- SSL certificate auto-renews every 12 hours via Certbot container
