#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_NAME="$(node -p "require('$ROOT_DIR/package.json').name")"
VERSION="$(node -p "require('$ROOT_DIR/package.json').version")"
BUNDLE_PATH="$ROOT_DIR/$SKILL_NAME.skill"

# Items copied into the packaged skill
PACKAGE_ITEMS=(SKILL.md references assets scripts examples LICENSE README.md)

for item in "${PACKAGE_ITEMS[@]}"; do
  if [[ ! -e "$ROOT_DIR/$item" ]]; then
    echo "Missing required item: $item" >&2
    exit 1
  fi
done

STAGING="$(mktemp -d)"
trap 'rm -rf "$STAGING"' EXIT

mkdir -p "$STAGING/$SKILL_NAME"
for item in "${PACKAGE_ITEMS[@]}"; do
  cp -r "$ROOT_DIR/$item" "$STAGING/$SKILL_NAME/"
done

# Test fixtures and the examples README stay in the repository only
rm -rf "$STAGING/$SKILL_NAME/examples/invalid" "$STAGING/$SKILL_NAME/examples/README.md"

# Refresh the version in the staged skill metadata from package.json
perl -i -pe "s/^  version: .*\$/  version: $VERSION/" "$STAGING/$SKILL_NAME/SKILL.md"

rm -f "$BUNDLE_PATH"
(
  cd "$STAGING"
  zip -rq "$BUNDLE_PATH" "$SKILL_NAME" -x '*/.DS_Store' '*/Thumbs.db'
)

echo "Built $BUNDLE_PATH (v$VERSION)"
