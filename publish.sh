set -e

ember build --e production
cd dist
git init
git checkout -b gh-pages
git remote add origin git@github.com:papricek/goferrata.git
git add -A
git commit -m "Deploy"
git push -f origin gh-pages
