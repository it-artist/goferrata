set -e

ember build --e production

rsync -avz --delete dist/ goferrata@r01.avatech.cz:/home/goferrata/web/current/public
