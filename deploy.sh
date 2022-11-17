# The location of your server access key
key=~/keys/leesjensen/production.pem
hostname=demo.cs260.click

# Build the distribution package
rm -rf dist
mkdir dist
cp -r application dist
cp index.js dist
cp package* dist

# Clear out the previous distribution
ssh -i $key ubuntu@$hostname <<'ENDSSH'
rm -rf services/simon-server
mkdir -p services/simon-server
ENDSSH

# Copy the distribution package to the server
scp -r -i $key dist/* ubuntu@$hostname:services/simon-server

# Install the package. Install node modules here so they are correct for the server.
ssh -i $key ubuntu@$hostname <<'ENDSSH'
cd services/simon-server
npm install
pm2 restart simon-server
ENDSSH

# Delete the local copy of the package
rm -rf dist