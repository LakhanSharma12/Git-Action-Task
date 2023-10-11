import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({ region: 'ap-south-1' });


const Login = async (event, callback) => {
  try {
    const req = JSON.parse(event.body);
    console.log(req);
    const email = req.email;
    const answer = req.answer;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Email is required',
        }),
      };
    }
    const password = req.password;
    if (!password) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Password is required',
        }),
      };
    }
 

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.HypeCardUserPoolClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        
      },
    };
 
    try{

    const data = await client.send(new InitiateAuthCommand(params));
    console.log(data, 'data')
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login Success',
        data,
      }),
    };
    }
    catch(err){
      console.log(err)
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid Credentials',
        }),
      };
    }

    // console.log(data, 'data');

    
    
    


  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    };
  }
}


export { Login };
