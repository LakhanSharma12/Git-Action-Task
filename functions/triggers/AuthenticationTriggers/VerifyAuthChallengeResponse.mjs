'use strict';





const VerifyAuthChallengeResponse = async (event) => {

    try {
    console.log('Verifying Auth Challenge Response', JSON.stringify(event, null, 2));
        console.log(event.request.challengeAnswer)
    const userProvidedAnswer = event.request.challengeAnswer; // User's response
    const correctAnswer = event.request.privateChallengeParameters.answer; // Correct answer

    if (userProvidedAnswer === correctAnswer) {
        // User provided the right answer; succeed auth
        event.response.answerCorrect = true;
    }
    else {
        // User provided the wrong answer; fail auth
        event.response.answerCorrect = false;
    }

        // You can handle the response here based on your custom logic

        return event;
    } catch (error) {
        console.error('Error responding to Auth Challenge:', error);
        throw error;
    }
};

export { VerifyAuthChallengeResponse };
