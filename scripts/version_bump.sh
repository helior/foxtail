#!/bin/bash

GIT_USERNAME="parkwww"
GIT_EMAIL="park.www@lookitsuni.com"

if [ "$TRAVIS_BRANCH" = "dev" ]; then
  if command -v git >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
    git config --local user.name ${GIT_USERNAME}
    git config --local user.email ${GIT_EMAIL}
    git config --local push.default matching
    npm version patch -m $'v%s\n\n[skip ci]' &&
    git push https://${GH_OAUTH_TOKEN}@github.com/helior/foxtail HEAD:dev --tag
    echo "good."
  else
    echo "Failed. Git and NPM are required for version bumping..";
  fi
fi
