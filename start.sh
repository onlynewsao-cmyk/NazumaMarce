while :
do
printf "\033[1;95m🌫️ Iniciando o System Dark ...\n🌸 Aguarde um momento, tudo será preparado com calma ✨\033[0m\n"
if [ "$1" = "sim" ]; then
node ./ARQUIVES/connect.js sim
elif [ "$1" = "não" ]; then
node ./ARQUIVES/connect.js não
else
node ./ARQUIVES/connect.js
fi
sleep 1
done