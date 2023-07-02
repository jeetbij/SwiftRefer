#!/bin/bash

echo -e "\n== Installing rails dependencies ==\n"

gem install bundler --conservative
bundle config set --local path "vendor"

bundle check || bundle install

echo -e "\n== Installing yarn ==\n"
npm install --global yarn

echo -e "\n== Installing react dependencies ==\n"
yarn install

echo -e "\n== Setting up DB =="

# Load the environment variables from .env
set -o allexport
source ./.env
set +o allexport

echo -e "\n== Dropping the existing DB ==\n"
bin/rails db:drop


echo -e "\n== Preparing database ==\n"
bin/rails db:prepare

echo -e "\n== Removing old logs and tempfiles ==\n"
bin/rails log:clear tmp:clear
