set -e  # 出错后退出 shell
set -x  # 打开调试 shell 命令

REACT_APP_STAGE=beta npm run build

rsync -r -e "ssh -i config/deploy_beta_rsa" build/ deploy@112.125.25.82:/home/deploy/beta_admin_ui
