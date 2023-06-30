# Homewall Web

## Requirements

- FreeBSD jail (e.g. bastille)
- pkg install nginx

## Procedures 

**Development**
1. Start the development server.
```bash
npm run start:dev
```
2. Open the website in a browser.
```bash
ssh dev0 firefox --no-remote http://127.0.0.1
```

**Distribute**
1. Create new client bundle.
```bash
npm run build:client
```
2. Create new server bundle.
```bash
npm run build:express
```
3. Copy the built files into the homewall installation.
```bash
./dist.sh
```
