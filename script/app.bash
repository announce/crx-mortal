#!/usr/bin/env bash

app () {
  set -u

  bundle-dist () {
    [[ $(command -v zip) ]] || return
    zip -r ./var/dist-$(date +%s).zip ./dist/*
  }

  update-manifest-version () {
    [[ $(command -v jq) ]] || return
    PACKAGE_VERSION="$(jq '.version' package.json)"
    MANIFEST="$(jq ".version = ${PACKAGE_VERSION}" public/manifest.json)"
    echo -e "${MANIFEST}" > public/manifest.json
  }

  usage () {
    SELF="$(basename "$0")"
    echo -e "${SELF}
    \\nUsage: ${SELF} [arguments]
    \\nArguments:"
    declare -F | awk '{print "\t" $3}' | grep -v "${SELF}"
  }

  if [ $# = 0 ]; then
    usage
  elif [ "$(type -t "$1")" = "function" ]; then
    $1 "$(shift && echo "$@")"
  else
    die "No such command: $*"
  fi
}

app "$@"
