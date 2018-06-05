# https://github.com/coreui/coreui-free-bootstrap-admin-template

echo ""
echo "What would you like the project's folder to be called?"
read projectName
echo ""
echo "Ok, '/$projectName' it is!"
echo ""
echo "...Laying the bones down for a new project..."
echo ""

# npm build
mkdir $projectName
cd $projectName
git clone https://github.com/coreui/coreui-free-bootstrap-admin-template.git
cd coreui-free-bootstrap-admin-template
npm install

# Open Dev Enviroment
npm run serve
npm run build
