AWS_ACCOUNT_ID=$(jq -r '.AWS_ACCOUNT_ID' config.json)
REGION=$(jq -r '.REGION' config.json)
BUCKET=$(jq -r '.BUCKET' config.json)
DDB_TABLE=$(jq -r '.DDB_TABLE' config.json)
IDENTITY_POOL_NAME=$(jq -r '.IDENTITY_POOL_NAME' config.json)


# Create IAM Roles for Lambda Function
# cd iam
# for f in $(ls -1 sampleAuth*); do
#   role="${f%.*}"
#   echo "Creating role $role from $f begin..."
#   sed -e "s/<AWS_ACCOUNT_ID>/$AWS_ACCOUNT_ID/g" \
#       -e "s/<DYNAMODB_TABLE>/$DDB_TABLE/g" \
#       -e "s/<DYNAMODB_EMAIL_INDEX>/$DDB_EMAIL_INDEX/g" \
#       -e "s/<IDENTITY_POOL_ID>/$IDENTITY_POOL_ID/g" \
#       -e "s/<REGION>/$REGION/g" \
#       $f > edit/$f
# 	trust="Policy_Trust_Lambda.json"
#   aws iam create-role --role-name $role --assume-role-policy-document file://edit/$trust
#   aws iam update-assume-role-policy --role-name $role --policy-document file://edit/$trust
#   aws iam put-role-policy --role-name $role --policy-name $role --policy-document file://edit/$f
#   echo "Creating role $role end"
# done
#
# cd ..

# Create Lambda Functions
cd fn
for FN in $(ls -1 .); do
  echo "Deploying function $FN ..."
  cd $FN
  zip -r ../$FN.zip .
  cd ..
  aws lambda create-function --function-name $FN \
      --runtime nodejs4.3 \
      # --role arn:aws:iam::"$AWS_ACCOUNT_ID":role/$FN \
      # --role arn:aws:iam::"$AWS_ACCOUNT_ID":role/basic-DDB-S3-Role \
      --handler index.handler \
      --zip-file fileb://$FN.zip \
	  	--region $REGION
  sleep 1 # To avoid errors
  rm $FN.zip
  echo "Done!"
done


# ./deploy.sh
