compiler() {
java -jar compiler.jar \
	--warning_level=QUIET \
	--js=lib/jquery/jquery.min.js \
	--js=plugins/crypto-js.js \
	--js=api.js \
	--js=lib/phaserjs/phaser.min.js \
	--js=lib/strings/text.js \
	--js=game/scenes/preload.js \
	--js=game/scenes/play.js \
	--js=game/index.js \
	--js_output_file=game.min.js \
	--language_in=STABLE
}

NOCOLOR='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
LIGHTGRAY='\033[0;37m'
DARKGRAY='\033[1;30m'
LIGHTRED='\033[1;31m'
LIGHTGREEN='\033[1;32m'
YELLOW='\033[1;33m'
LIGHTBLUE='\033[1;34m'
LIGHTPURPLE='\033[1;35m'
LIGHTCYAN='\033[1;36m'
WHITE='\033[1;37m'

echo "Compiling..."
compiler
#uglifyjs plugins/crypto-js.js lib/strings/text.js lib/phaserjs/phaser.min.js game/scenes/preload.js game/scenes/play.js game/index.js api.js -c -o game.min.js
#npx swc ./game.min.js -o game.min.js
#uglifyjs game.min.js -c -o game.min.js
echo "Done!"
echo ""
sleep 1
echo "Securing..."
javascript-obfuscator 'game.min.js' -o 'game.js' --config 'lib/compression/regular-obfuscation.json'
echo "Done!"
sleep 1
echo ""
echo -e "Testing ${YELLOW}game.js${NOCOLOR}"
node game.js > game.js.bak 2>&1
sleep 3
echo "Done!"
echo ""
echo "Packing for github pages..."
echo ""
WWWZIP=www.zip
echo -e "Check ${YELLOW}${WWWZIP}${NOCOLOR}"
if [ ! -f www.zip ]; 
		then
			echo "	File not found!"
			echo ""
			echo "Packing..."
			sleep 1
		else
			echo "	File exist! Removing..."
			rm www.zip
			echo ""
			echo "Repack..."
			sleep 1
	fi
	./zip -r ./www.zip ./index.html ./game.js ./media/* -x zip.exe
echo "Done!"
sleep 1
echo ""
echo "Removing trash files..."
rm -rf game.min.js
#rm game.min.js.map
rm -rf game.js.bak
echo ""
echo "All done!"