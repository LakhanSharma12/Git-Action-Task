import { 
    CognitoIdentityProviderClient, SignUpCommand ,ListUsersCommand 
} from '@aws-sdk/client-cognito-identity-provider'



const client = new CognitoIdentityProviderClient({ region: 'ap-south-1' })



const Register = async (event , callback) => {
    try{
     const req = JSON.parse(event.body)
  

     const UserPoolId = process.env.HypeCardUserPoolId
        const Username = req.email
        if(!Username){
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Username is required"
                })
            }
        }

        const Password = req.password
        if(!Password){
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Password is required"
                })
            }
        }
        //chack the the password is according to the aws cognito policy
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
        if(!passwordRegex.test(Password)){
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Password must contain 1 lowercase, 1 uppercase, 1 numeric, 1 special character"
                })
            }
        }
        const Email = req.email
        if(!Email){
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Email is required"
                })
            }
        }
        const Name = req.name
        if(!Name){
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Name is required"
                })
            }
        }
        const Phone_number = req.phone_number
        if(!Phone_number){
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Phone_number is required"
                })
            }
        }
        
        //give error if the user already exists from email
    
        const filter = `email = "${Email}"`
        const listUsersCommand = new ListUsersCommand({UserPoolId, Filter: filter})
        const listUsersResponse = await client.send(listUsersCommand)
        const user = listUsersResponse.Users[0]
        if(user){
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: `User with email ${Email} already exists  `
                })
            }
        }
        //create a new user
        const clientid = process.env.HypeCardUserPoolClientId

        const input ={
            ClientId: clientid,
            Username,
            Email,
            Password: Password,
            UserAttributes: [
                {
                    Name: 'name',
                    Value: Name
                },
                
                {
                    Name: 'phone_number',
                    Value: Phone_number
                },
                {
                    Name: 'email',
                    Value: Email
                }
            ],
           
        }
        console.log(Phone_number)
        const command = new SignUpCommand(input)
        const response = await client.send(command)
        // console.log(response)  
        if(!response){
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Error creating user"
                })
            }
        }
        console.log(response)
        
        const otp = Math.floor(1000 + Math.random() * 9000)
        
       
        return {
            statusCode: 200,
            body: JSON.stringify({

                message: "User Created Successfully",
                data:{ 
                    otp: otp,
                    email: Email,
                    name: Name,
                    phone_number: Phone_number,
                    sub: response.UserSub
                }
            })
        }
       

    }
    catch(err){
        console.log(err)
        return{
            statusCode: 500,
            body: JSON.stringify({
                message: err.message || "Internal Server Error"
            })
        }

    }
}

export { Register}