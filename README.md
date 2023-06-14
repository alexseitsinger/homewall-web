# Homewall Web

### Requirements

- FreeBSD jail (e.g. bastille)
- pkg install nginx

### Procedures 

**Start the development server**
1. npm run start:dev

**Create bundle for homewall release**
1. npm run build:client
2. npm run build:express
3. /bin/sh dist.sh
