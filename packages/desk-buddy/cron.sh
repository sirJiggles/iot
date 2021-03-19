sleep 10
cd /home/pi/Desktop/development/iot && git pull && npx lerna run build
sudo /usr/local/bin/forever start /home/pi/Desktop/development/iot/packages/desk-buddy/dist/index.js