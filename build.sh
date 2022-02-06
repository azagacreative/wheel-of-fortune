echo "Building..."
uglifyjs lib/strings/text.js lib/phaserjs/phaser.min.js lib/jquery/jquery-3.2.1.min.js game/scenes/preload.js game/scenes/play.js game/index.js -c -m -o game.js
echo ""
echo "Done!"
echo ""
sleep 1
echo "Packing for github pages..."
if [ ! -f www.zip ]; 
		then
			echo "File not found!"
		else
			echo "File exist! Removing..."
			rm www.zip
	fi
	./zip -r ./www.zip ./index.html ./game.js ./media/* -x zip.exe
echo ""
echo "Done!"
sleep 1
echo "All done!"