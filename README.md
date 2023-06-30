# Homewall Web

## Requirements

- FreeBSD jail (e.g. bastille)
- pkg install nginx

## Procedures 

**Start the development server**
1. npm run start:dev
2a. Visit http://192.168.1.254 from host browser
2b. Visit http://192.168.1.254 from dev0 jail browser
2c. Visit http://127.0.0.1 from dev0 jail browser

**Create bundle for homewall release**
1. npm run build:client
2. npm run build:express
3. ./dist.sh
