VERSION_DIR="Production_Bundles"
BUILD_FOLDER_NAME="PlacementPortalBundle"
MODULES_DIR="node_modules"
OUTRO='\033[0;36m'
echo -e "#################### Placement Portal Build Script ####################\n\n"
if [ -z "$1" ]
  then
    echo "> No FileName was provided filename would be taken as build"
else
    BUILD_FOLDER_NAME=$1

fi

echo -e "> Client: Build folder creating"
cd "./Client"

if [ -d "$MODULES_DIR" ]; then
    echo "> Client: ${MODULES_DIR} already installed"
else
    echo "> Client: Installing ${MODULES_DIR} please wait"
    npm i
fi
npm run build

echo "> Client: Frontend build created"
cd "../Server"
cp -R "../Client/build" "."

if [ -d "$MODULES_DIR" ]; then
    echo "> Server: Removing node modules"
    rm -r "node_modules"
fi

echo "> Server: Removing previous build files <Linux Version>"
rm *.zip

echo "> Server: Removing previous build files <Windows Version>"
rm *.tar

echo "> Server: Zipping folder please wait"
tar -cvf "$BUILD_FOLDER_NAME.tar" "."

echo "> Server: Installing node modules back"
npm i

echo "> Root: Moving Zipped File"
cd ".."

if [ -d "$VERSION_DIR" ]; then
    echo "> Root: ${VERSION_DIR} exits"
else
    echo "> Root: Making folder $VERSION_DIR"
    mkdir "./${VERSION_DIR}"
fi
mv "./Server/${BUILD_FOLDER_NAME}.tar" "./${VERSION_DIR}"

echo "> Root: All process completed successfully"
echo "> Root: Checkout the file named: ${BUILD_FOLDER_NAME}.tar in ${VERSION_DIR}"
echo -e "${OUTRO}Written and developed by : Jenil Gandhi | Rikin Chauhan | Keval Gandevia"

# read input
exit 0
