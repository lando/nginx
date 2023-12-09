#!/bin/sh

# allow this to run through without failing
# set -e

# args
version="${1:-"1.0.6"}"
# @TODO: swtich back to amd64?
arch="${2:-"arm64"}"

# if we have render-template then just exit
if [ "$(command -v render-template)" ]; then exit 0; fi

# computed
url="https://github.com/bitnami/render-template/releases/download/v${version}/render-template-linux-${arch}.tar.gz"
tmpdir="/tmp/render-template-${version}"

# prep
rm -rf "$tmpdir" && mkdir -p "$tmpdir"
mkdir -p /usr/local/bin

# there are different considerations around 1.0.0
if [ "$version" == "1.0.0" ] && [ "$arch" == "arm64" ]; then
  curl -fsSL \
    -o "${tmpdir}/render-template-linux-${arch}" \
    "https://github.com/bitnami/render-template/releases/download/v1.0/render-template-arm64"

# amd situation
elif [ "$version" == "1.0.0" ] && [ "$arch" == "amd64" ]; then
  curl -fsSL \
    -o "${tmpdir}/render-template-linux-${arch}.zip" \
    "https://github.com/bitnami/render-template/releases/download/v1.0/render-template.zip"
  unzip "${tmpdir}/render-template-linux-${arch}.zip" -d "${tmpdir}"
  mv "${tmpdir}/render-template" "${tmpdir}/render-template-linux-${arch}"

# everything else can go here though
else
  curl -fsSL "$url" | tar -xz -C "$tmpdir"
fi

# mv & execute
mv "${tmpdir}/render-template-linux-${arch}" /usr/local/bin/render-template
chmod +x /usr/local/bin/render-template

# allows return fine
# this isnt great but is probably good enough to last us until the lando 4 config generator
exit 0
