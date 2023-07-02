#!/bin/bash

# Load the environment variables from .env
set -o allexport
source ./.env
set +o allexport

echo -e "\n== Starting webpacker compile ==\n"
export NODE_OPTIONS=--openssl-legacy-provider
bin/rails webpacker:compile


echo -e "\n== Starting application server on port 3000 ==\n"
# Run your Rails app
bin/rails server -p 3000
