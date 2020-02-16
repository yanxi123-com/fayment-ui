set -e  # 出错后退出 shell
set -x  # 打开调试 shell 命令

# build
REACT_APP_STAGE=beta npm run build

# deploy
cd build

cp index.html 404.html

mkdir eos-accounts
cp index.html eos-accounts

printf "fayment.com\n" > CNAME

git init

git config user.name "fayment"
git config user.email "fayment@github"

git add -A
git commit -m 'build'

git remote add origin git@github.com:yanxi-me/fayment-ui.git
git push -f origin master
