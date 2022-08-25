FROM httpd:2.4
COPY ./dist/e-commerce /usr/local/apache2/htdocs/
COPY ./httpd/.htaccess /usr/local/apache2/htdocs/
COPY ./httpd/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./httpd/httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf
COPY ./httpd/httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf
COPY ./httpd/pems/fullchain.pem /usr/local/apache2/conf/fullchain.pem
COPY ./httpd/pems/privkey.pem /usr/local/apache2/conf/privkey.pem
