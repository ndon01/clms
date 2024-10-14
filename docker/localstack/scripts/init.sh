#!/bin/bash
echo "Running init-aws.sh script"
which aws
echo "Creating S3 bucket..."
aws --endpoint-url=http://localhost:4566 --region=us-east-1 s3 mb s3://clms