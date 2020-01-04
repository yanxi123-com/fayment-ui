set -e  # 出错后退出 shell
set -x  # 打开调试 shell 命令

# build
# deploy
cd build

cp index.html 404.html

printf "queding.com\n" > CNAME

git remote add queding git@github.com:yanxi-me/eos-asset.git
git push -f queding master
