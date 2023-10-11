'use strict';

const CreateAuthChallenge = async (event) => {
    console.log('Creating Auth Challenge', JSON.stringify(event, null, 2));

    // Initialize challenge parameters
    event.response.publicChallengeParameters = {};
    event.response.privateChallengeParameters = {};

    // Set custom challenge parameters as needed
    event.response.publicChallengeParameters.captchaUrl = "your_captcha_url";
    event.response.privateChallengeParameters.answer = "correct_answer";

    console.log('Created Auth Challenge', JSON.stringify(event, null, 2));

    return event;
};

export { CreateAuthChallenge };
