import {CognitoIdentityProviderClient, RespondToAuthChallengeCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "ap-south-1" });

const RespondtoAuthChellenge = async (event) => {
    try{
        const req = JSON.parse(event.body);
        console.log(req);
        const email = req.email;
        const answer = req.answer;
        //pass Session from headers 
        const session = req.session;
        if (!email) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Email is required",
                }),
            };
        }
        if (!answer) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Answer is required",
                }),
            };
        }

        const params = {
            ChallengeName: "CUSTOM_CHALLENGE",
            ClientId: process.env.HypeCardUserPoolClientId,
            //HypeCardUserPoolClientId
            ChallengeResponses: {
                USERNAME: 'lakhansharmaasd@gmail.com',
                ANSWER: 'correct_answer',
            },
            Session: 'AYABeI74h6hKgUe3PeXIplhQwHcAHQABAAdTZXJ2aWNlABBDb2duaXRvVXNlclBvb2xzAAEAB2F3cy1rbXMATGFybjphd3M6a21zOmFwLXNvdXRoLTE6NjU0NDM0NDQ0NzkwOmtleS8yNjg1NWU1NC05NTMzLTRhNDctYjYxNy1hYjgwYjMyNDkxZWQAuAECAQB4FLowweD4veqEHIq9lUHt0O4UnIvvVK5Yh8hnJql-J9oBJy8X2BOHLrgl9RAOlGf_QAAAAH4wfAYJKoZIhvcNAQcGoG8wbQIBADBoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDAoP2JPh6guVqh18-wIBEIA7oQmoDIoElWSj7flk_T0ZSCAouMJMixjS_4FKepUeibwxH5Qj8vx4Hg9X1KJKvOHkGNybhif_b5o7us0CAAAAAAwAABAAAAAAAAAAAAAAAAAAr-v0feOakpiihdqwkr5dYf____8AAAABAAAAAAAAAAAAAAABAAABCPwP5O4eZENqOP2YaHcc2XE72Q12z71haCMeNUpw-xeSlBDwWtaazFG4dRfNlpdC-waf-OYE-A_eBLybHoRHIJSirRPevqMbq41GQsJ1UswPF9yjXa-lCsoJ6F4SjniTe4sNhh687DIyiqtvY8uZT0tZscP1qXTrNKk1qO_8d6hhQUQ-TRali8ZvXOdrTHTl-rH9p1WFF-f9fjQHdKN7cKHLk6lIPOpBo5LGRuNg0ShtnJn6deePWUsj7I3txWzjRWONChpJLAUhpescZdgkOPWgfPUmOhU9sUwNMA7reioXh4StdpmY3eGOysIafNFdPR43FIpNHV-EhYv_UrAowAfFT0sHQqoPeoXYgiOW7EuJXHTy6-OaKDo',
        };

        try {
            const data = await client.send(
                new RespondToAuthChallengeCommand(params)
            );
            console.log(data, "data");

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Login Success",
                    data,
                }),
            };
        } catch (err) {
            console.log(err);
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Ultra side Invalid Creden",
                }),
            };
        }
        

    }
    catch(err){
        console.log(err)
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Internal Server Error",
            }),
        };
    }
}

export { RespondtoAuthChellenge };
//RespondtoAuthChellenge