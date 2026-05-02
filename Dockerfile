# Use the official Nginx image as a base
FROM nginx:alpine

# Copy the static website files to the default Nginx html directory
COPY . /usr/share/nginx/html/

# Copy custom Nginx configuration to listen on the correct port (Cloud Run uses PORT environment variable)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
