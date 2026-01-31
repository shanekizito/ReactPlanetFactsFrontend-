@echo off
echo Copying planet images...

REM Create planets directory if it doesn't exist
if not exist "public\planets" mkdir "public\planets"

REM Copy generated planet images
copy "C:\Users\admin\.gemini\antigravity\brain\77277e0b-8c05-4612-bdac-815f3194af6e\mercury_planet_1769870419847.png" "public\planets\mercury.png"
copy "C:\Users\admin\.gemini\antigravity\brain\77277e0b-8c05-4612-bdac-815f3194af6e\venus_planet_1769870440425.png" "public\planets\venus.png"
copy "C:\Users\admin\.gemini\antigravity\brain\77277e0b-8c05-4612-bdac-815f3194af6e\earth_planet_1769870501505.png" "public\planets\earth.png"
copy "C:\Users\admin\.gemini\antigravity\brain\77277e0b-8c05-4612-bdac-815f3194af6e\mars_planet_1769870561951.png" "public\planets\mars.png"
copy "C:\Users\admin\.gemini\antigravity\brain\77277e0b-8c05-4612-bdac-815f3194af6e\jupiter_planet_1769870603803.png" "public\planets\jupiter.png"
copy "C:\Users\admin\.gemini\antigravity\brain\77277e0b-8c05-4612-bdac-815f3194af6e\saturn_planet_1769870680145.png" "public\planets\saturn.png"

REM Download Uranus and Neptune from NASA public domain sources
curl -o "public\planets\uranus.png" "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg"
curl -o "public\planets\neptune.png" "https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg"

echo Done! All planet images copied.
pause
