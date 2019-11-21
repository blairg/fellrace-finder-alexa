const Alexa = require('ask-sdk');
const axios = require('axios');

const getRaces = async () => {
    return axios.get('https://www.fellracefinder.xyz/alexaEvents').then((response)=>{
        console.log('got races')
        return response.data;
    });
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const speechText = await getRaces().then((data) => {
            return buildRaces(data);
        });

    return handlerInput.responseBuilder
        .speak(races)
        .reprompt(speechText)
        //.withSimpleCard('Hello World', speechText)
        .getResponse();
  
    //   return handlerInput.responseBuilder
    //     .speak(speechText)
    //     .reprompt(speechText)
    //     //.withSimpleCard('Hello World', speechText)
    //     .getResponse();
    },
  }; // End LaunchRequestHandler

const FellracesIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'FellracesIntent';
    },
    async handle(handlerInput) {
        const speechText = await getRaces().then((data) => {
            return data;
        });
  
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Fell Races', speechText)
            .getResponse();
    }
  };

  const FallbackHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
      console.log('IN FallbackHandler');
      return handlerInput.responseBuilder
        .speak('Sorry, I didn\'t understand what you meant. Please try again.')
        .reprompt('Sorry, I didn\'t understand what you meant. Please try again.')
        .getResponse();
    },
  };

  const HelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = 'You can say hello to me!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Hello World', speechText)
        .getResponse();
    }
  };

  const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
          || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      const speechText = 'Goodbye!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Hello World', speechText)
        .withShouldEndSession(true)
        .getResponse();
    }
  };

  const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      //any cleanup logic goes here
      return handlerInput.responseBuilder.getResponse();
    }
  };

  const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak('Sorry, I can\'t understand the command. Please say again.')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
        .getResponse();
    },
  };

  const ResponseLog = {
    process(handlerInput) {
      console.log(`RESPONSE BUILDER = ${JSON.stringify(handlerInput)}`);
      console.log(`RESPONSE = ${JSON.stringify(handlerInput.responseBuilder.getResponse())}`);
    },
  };

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    FellracesIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    FallbackHandler,
  )
  .addResponseInterceptors(ResponseLog)
  .addErrorHandlers(ErrorHandler)
  .lambda();