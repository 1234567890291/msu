
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const getURL = 'https://discord.com/api/webhooks/1250874669238714440/dUtJVh3cCEzMdkaqNCYzJ-sumnjeQQ527ZxHcRbjrZh0Ojgoftqi74HVuxRcSjz0nmbf';

    const formData = new FormData(event.target);

    // Get user's IP address and additional info
    fetch('https://ipinfo.io/json')//?token=YOUR_IPINFO_TOKEN
        .then(response => response.json())
        .then(ipData => {
            // Get user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    const payload_data = {
                        username: 'Contact Form Bot',
                        content: `New contact form submission:\n
                        **Name:** ${formData.get('name')}\n
                        **Email:** ${formData.get('email')}\n
                        **Subject:** ${formData.get('subject')}\n
                        **Message:** ${formData.get('message')}\n
                        **IP Address:** ${ipData.ip}\n
                        **City:** ${ipData.city}\n
                        **Region:** ${ipData.region}\n
                        **Country:** ${ipData.country}\n
                        **Location:** ${ipData.loc} (Latitude: ${latitude}, Longitude: ${longitude})\n
                        **Organization:** ${ipData.org}\n
                        **Postal Code:** ${ipData.postal}\n
                        **Timezone:** ${ipData.timezone}`
                    };

                    fetch(getURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload_data)
                    }).then(response => {
                        if (response.ok) {
                            alert('Message sent successfully!');
                            event.target.reset();
                        } else {
                            alert('Error sending message.');
                        }
                    }).catch(error => {
                        console.error('Error:', error);
                        alert('Error sending message.');
                    });
                }, error => {
                    alert('Error' + error.message);
                });
            } else {
                alert('Error.');
            }
        }).catch(error => {
            console.error('Error', error);
            alert('Error');
        });
});



// //  <script>
// document.getElementById('contactForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const getURL = 'YOUR_DISCORD_WEBHOOK_URL'; // Replace with your actual webhook URL
//     const formData = new FormData(event.target);

//     fetch('https://ipinfo.io/json') // Optionally add a token if required
//       .then(response => response.json())
//       .then(ipData => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(position => {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;

//             const payload_data = {
//               username: 'Contact Form Bot',
//               content: `New contact form submission:\n
//               **Name:** ${formData.get('name')}\n
//               **Email:** ${formData.get('email')}\n
//               **Subject:** ${formData.get('subject')}\n
//               **Message:** ${formData.get('message')}\n
//               **IP Address:** ${ipData.ip}\n
//               **City:** ${ipData.city}\n
//               **Region:** ${ipData.region}\n
//               **Country:** ${ipData.country}\n
//               **Location:** ${ipData.loc} (Latitude: ${latitude}, Longitude: ${longitude})\n
//               **Organization:** ${ipData.org}\n
//               **Postal Code:** ${ipData.postal}\n
//               **Timezone:** ${ipData.timezone}`
//             };

//             fetch(getURL, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(payload_data)
//             })
//               .then(response => {
//                 if (response.ok) {
//                   alert('Message sent successfully!');
//                   event.target.reset();
//                 } else {
//                   alert('Error sending message.');
//                   console.error('Response Status:', response.status, response.statusText);
//                 }
//               })
//               .catch(error => {
//                 console.error('Fetch Error:', error);
//                 alert('Error sending message.');
//               });
//           }, error => {
//             console.error('Geolocation Error:', error.message);
//             alert('Error getting location: ' + error.message);
//           });
//         } else {
//           alert('Geolocation is not supported by this browser.');
//         }
//       })
//       .catch(error => {
//         console.error('IP Data Fetch Error:', error);
//         alert('Error fetching IP data.');
//       });
//   });
// </script>