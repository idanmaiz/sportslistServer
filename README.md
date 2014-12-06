//install packages
sudo apt-get install nodejs
sudo apt-get install git
sudo apt-get install npm

//create symlink from node to nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node

//if you want ssl
sudo apt-get install pwgen
pwgen 50 1 -s > passphrase
cat passphrase (have it copyable)
openssl genrsa -des3 -out ca.key 1024
openssl req -new -key ca.key -out ca.csr
openssl x509 -req -days 365 -in ca.csr -out ca.crt -signkey ca.key
openssl genrsa -des3 -out server.key 1024
openssl req -new -key server.key -out server.csr
cp server.key server.key.passphrase
openssl rsa -in server.key.passphrase -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

//Dont forget in the config file to change useSSL to true and provide the ssl Folder.

npm install -g mocha
npm install chai
