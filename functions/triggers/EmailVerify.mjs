const EmailVerify = async (event, context,callback) => {
    try {

        event.response.autoConfirmUser = true;

        if (event.request.userAttributes.hasOwnProperty("email")) {
            event.response.autoVerifyEmail = true;
        }

        if (event.request.userAttributes.hasOwnProperty("phone_number")) {
            event.response.autoVerifyPhone = true;
        }

        

        callback(null, event)
        
    } catch (error) {
        console.log(error);

        // If there's an error, throw it so AWS Lambda handles it
        throw new Error("Internal Server Error");
    }
};

export { EmailVerify };
