//install packages<br>
sudo apt-get install nodejs<br>
sudo apt-get install git<br>
sudo apt-get install npm<br>

//create symlink from node to nodejs<br>
sudo ln -s /usr/bin/nodejs /usr/bin/node<br>

//if you want ssl<br>
sudo apt-get install pwgen<br>
pwgen 50 1 -s > passphrase<br>
cat passphrase (have it copyable)<br>
openssl genrsa -des3 -out ca.key 1024<br>
openssl req -new -key ca.key -out ca.csr<br>
openssl x509 -req -days 365 -in ca.csr -out ca.crt -signkey ca.key<br>
openssl genrsa -des3 -out server.key 1024<br>
openssl req -new -key server.key -out server.csr<br>
cp server.key server.key.passphrase<br>
openssl rsa -in server.key.passphrase -out server.key<br>
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt<br>

//Dont forget in the config file to change useSSL to true and provide the ssl Folder.<br>

npm install -g mocha<br>
npm install chai<br>
