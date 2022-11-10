#!/bin/bash

npm run migration:up:dev
exec "$@"