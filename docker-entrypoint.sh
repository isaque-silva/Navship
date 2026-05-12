#!/bin/sh
set -e
cd /app
node scripts/write-worker-env-from-process.mjs
exec "$@"
