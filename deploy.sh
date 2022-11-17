while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deploy -k <pem key> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n//------------\n//Deploying $service to $hostname with $key\n//------------\n\n"

# Build the distribution package
rm -rf dist
mkdir dist
cp -r application dist
cp index.js dist
cp package* dist

# Clear out the previous distribution on the target.
ssh -i $key ubuntu@$hostname << ENDSSH
rm -rf services/${service}
mkdir -p services/${service}
ENDSSH

# Copy the distribution package to the target.
scp -r -i $key dist/* ubuntu@$hostname:services/$service

# Install the package on the target.
# Install node modules here so they are correct for the target.
ssh -i $key ubuntu@$hostname << ENDSSH
cd services/${service}
npm install
pm2 restart ${service}
ENDSSH

# Delete the local copy of the package.
rm -rf dist