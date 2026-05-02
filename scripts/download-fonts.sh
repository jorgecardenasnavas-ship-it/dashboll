#!/bin/bash
set -e

FONTS_DIR="assets/fonts"
mkdir -p "$FONTS_DIR"

BASE="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts"

# Geist Sans
curl -fsSL "$BASE/geist-sans/Geist-Regular.woff2"   -o "$FONTS_DIR/Geist-Regular.woff2"
curl -fsSL "$BASE/geist-sans/Geist-Medium.woff2"    -o "$FONTS_DIR/Geist-Medium.woff2"
curl -fsSL "$BASE/geist-sans/Geist-Bold.woff2"      -o "$FONTS_DIR/Geist-Bold.woff2"
curl -fsSL "$BASE/geist-sans/Geist-Black.woff2"     -o "$FONTS_DIR/Geist-ExtraBold.woff2"

# Geist Mono
curl -fsSL "$BASE/geist-mono/GeistMono-Regular.woff2" -o "$FONTS_DIR/GeistMono-Regular.woff2"
curl -fsSL "$BASE/geist-mono/GeistMono-Medium.woff2"  -o "$FONTS_DIR/GeistMono-Medium.woff2"

echo "Fonts downloaded to $FONTS_DIR"
ls -la "$FONTS_DIR"
