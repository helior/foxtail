#!/bin/bash

if [ "$TRAVIS_BRANCH" = "dev" ]; then
  if command -v git 2>/dev/null && command -v npm 2>/dev/null; then
    git config --local user.name "parkwww"
    git config --local user.email "park.www@lookitsuni.com"
    git config --local push.default matching
    npm version patch -m $'v%s\n\n[skip ci]'
    git push https://${GH_OAUTH_TOKEN}@github.com/helior/foxtail HEAD:dev --tag
  else
    echo "Failed. Git and NPM are required for version bumping..";
  fi
