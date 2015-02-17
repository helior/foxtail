#!/bin/bash

if [ "$TRAVIS_BRANCH" = "dev" ]; then
  echo "success, we have dev branch."
  if command -v git && command -v npm; then
    git config --global user.name "parkwww"
    git config --global user.email "park.www@lookitsuni.com"
    git config --global push.default matching
    npm version patch -m $'v%s\n\n[skip ci]'
    git push https://${GH_OAUTH_TOKEN}@github.com/helior/foxtail HEAD:dev --tag
  else
    echo "Failed. Git and NPM are required for version bumping..";
  fi
else
  echo "Skipping version bump.";
fi
