#!/bin/bash

GIT_USERNAME="helior"
GIT_EMAIL="me@helior.info"

env
if [ "$TRAVIS_BRANCH" = "dev" ] && [ ${GH_OAUTH_TOKEN:?"Github OAuth token must be set."} ]; then
  if command -v git >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
    git config --local user.name ${GIT_USERNAME}
    git config --local user.email ${GIT_EMAIL}
    git config --local push.default matching
    npm version patch -m $'v%s\n\n[skip ci]' &&
    git push https://${GH_OAUTH_TOKEN}@github.com/vulpnea/foxtail HEAD:dev --tag
  else
    echo "Failed. Git and NPM are required for version bumping..";
  fi
fi
