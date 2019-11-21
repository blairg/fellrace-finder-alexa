const axios = require('axios');

const getRaces = () => {
    return axios.get('https://www.fellracefinder.xyz/calendarEvents').then((response)=>{
        console.log('got races')
        return response.data;
    })
};

const buildRaces = (races) => {
    let response = '';

    for (let i = 0; i < races.length; i++) {
        if (i === 5) {
            break;
        }

        response += `${races[i].title}, `;
    }

    return response;
}

const respondWithRaces = async () => {
    let speechText = 'dummyva';
    console.log('before');
    speechText = getRaces().then((data) => {
        console.log(buildRaces(data));
    });
    //buildRaces(races.data);
    //console.log(speechText);
};

respondWithRaces();