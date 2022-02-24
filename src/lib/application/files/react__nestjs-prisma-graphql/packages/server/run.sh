docker build -t nestjs-prisma-server .
docker run -d -t -p 3000:3000 nestjs-prisma-server
