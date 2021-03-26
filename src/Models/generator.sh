printf "Enter your DB Password (Hidden): "
read -s password

eval typeorm-model-generator -h us-cdbr-east-03.cleardb.com -d heroku_1a6e6e8496717d8 -p 3306 -u bc90e3cd002aee -x 885bd6d1 -e mysql