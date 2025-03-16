FROM nginx:alpine

COPY dist /usr/share/nginx/html

COPY app.conf /etc/nginx/conf.d/app.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]