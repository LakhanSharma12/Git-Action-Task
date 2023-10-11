import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,PutCommand,GetCommand } from "@aws-sdk/lib-dynamodb";

const dbclient = new DynamoDBClient({region:'ap-south-1'});

const docClient = DynamoDBDocumentClient.from(dbclient);

const SaveUserDb = async (event, context,callback) => {
    try{
     
        console.log('Received event:', JSON.stringify(event, null, 2));
        const UserAttributes = event.request.userAttributes;
        console.log(UserAttributes)
        
        const email = UserAttributes.email;
        
        const phone_number = UserAttributes.phone_number;
       
        const name = UserAttributes.name;
        
        const sub = UserAttributes.sub;
            //find user in db
        const finduser = await docClient.send(
            new GetCommand({
                TableName:process.env.USER_TABLE_NAME,
                Key: {
                    id: sub,
                },

                ProjectionExpression: 'id',
            

            })
        );
        if(finduser){
            console.log('user already exist')
            return event;
        }
        
        const params = {
            TableName: process.env.USER_TABLE_NAME,
            Item: {
                id: sub,
                email: email,
                phone_number: phone_number,
                name: name,
            },
        };
        
        try{
           const result= await docClient.send(new PutCommand(params));
                console.log(result)
        }
        
        catch(err){
            console.log('error in saving user')
            console.log(err)
            return{
                statusCode: 500,
                body: JSON.stringify({
                    message: "Internal Server Error"
                })
            }
            
        }
        
        
        callback(null, event)

    }
    catch(err){
        console.log(err)
        return{
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal Server Error"
            })
        }
    }

}
export {SaveUserDb}
