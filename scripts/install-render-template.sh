#!/bin/sh

# allow this to run through without failing
# set -e

# args
version="${1:-"1.0.6"}"
# @TODO: swtich back to amd64?
arch="${2:-"arm64"}"

# computed
url="https://github.com/bitnami/render-template/releases/download/v${version}/render-template-linux-${arch}.tar.gz"
tmpdir="/tmp/render-template-${version}"

# mktemp
rm -rf "$tmpdir" && mkdir -p "$tmpdir"

# extract to tmp
curl -fsSL "$url" | tar -xz -C "$tmpdir"

# move to path
mkdir -p /usr/local/bin
mv "${tmpdir}/render-template-linux-${arch}" /usr/local/bin/render-template
chmod +x /usr/local/bin/render-template

# allows return fine
# this isnt great but is probably good enough to last us until the lando 4 config generator
exit 0
