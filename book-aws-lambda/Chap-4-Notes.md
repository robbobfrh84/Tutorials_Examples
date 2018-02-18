# Chapter 4: Managing Security
This is the start of Part 2 in the book, "Building Event Driven applications"

### Users, Groups and roles...
The main difference between **Groups** and **Roles** is that user can be assigned to groups of which have a set of shared roles, while roles can be assigned to users specifically.
- Think: A 10th grade student with a hall pass.
  - 10th grade is the group,
  - Hall Pass is the role.

So an AWS Lambda function can assume a role to get permission (read/write) to a storage service, such as S3 or DynamoDB.

#### Policies
To make Users, groups and roles useful, policies are attached, describing what those users, groups, or roles are (or are not) allowed to do within the account.

**NOTE:** Nothing is allowed by default. At least one policy is needed.

#### Credentials
See figure 4.6 on page 68 for a good chart about the connections between...
- Account (Root Crdentials)
- Users (Permanent credentials)
- Groups
- Roles (Temporary credentails)

#### Understanding policies
Good Policy breakdowns and explanations on pages 72-74.

so.... my "resource" in Austin, TX would be

`arn:aws:dynamodb:us-east-1:<my account id>:table/myTable`

#### **NOTE** No real coding in this chapter, lots to reference back later
