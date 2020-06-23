echo "Switching to branch master"
git checkout master

echo "Building app"
npm run build

echo "Deploying files to server"
cwrsync -avP build/ root@netoflies.com:/var/www/html/netoflies.com/
echo "Deployment complete"