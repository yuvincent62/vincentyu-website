    // use Signer from @aws-amplify/core
    const { Signer } = window.aws_amplify_core;

    // Cognito Identity Pool ID
    const identityPoolId = "us-east-1:2a10b235-b15c-47d0-ae63-fd55736bd088";

    // extract the Region from the Identity Pool ID; this will be used for both Amazon Cognito and Amazon Location
    AWS.config.region = identityPoolId.split(":")[0];

    // Instantiate an Amazon Cognito-backed credential provider
    const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
    });

    // Schedule the next credential refresh when they're about to expire
    async function refreshCredentials() {
      await credentials.refreshPromise();
      setTimeout(refreshCredentials, credentials.expireTime - new Date());
    }

    // Sign requests made by MapLibre GL JS using AWS SigV4.
    function transformRequest(url, resourceType) {
      if (resourceType === "Style" && !url.includes("://")) {
        // Resolve to an AWS URL
        url = `https://maps.geo.${AWS.config.region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
      }

      // Only sign AWS requests (with the signature as part of the query string)
      if (url.includes("amazonaws.com")) {
        return {
          url: Signer.signUrl(url, {
            access_key: credentials.accessKeyId,
            secret_key: credentials.secretAccessKey,
            session_token: credentials.sessionToken,
          }),
        };
      }

      return { url };
    }

    // Initialize the app
    async function initializeApp() {
      await refreshCredentials();

      // Initialize the map
      const map = new maplibregl.Map({
        container: "map",
        center: [-89.4012, 43.0731], // initial center point
        zoom: 11.5, // initial zoom level
        style: "esri-navigation",
        hash: true,
        transformRequest,
      });

      // Add navigation controls
      map.addControl(new maplibregl.NavigationControl(), "bottom-right");


      // Add a new marker
      const marker1 = new maplibregl.Marker()
        .setLngLat([-89.29810542269284, 	43.09598171954781])
        .addTo(map);

        // Add event listener to the marker for mouseover
        marker1.getElement().addEventListener('mouseover', function() {
          // Create a popup with the text you want to display
          var popup = new maplibregl.Popup({ offset: 25 })
            .setLngLat(marker1.getLngLat())
            .setHTML('<h3>School One</h3>')
            .addTo(map);
          });
  
          // Add event listener to remove the popup when mouse leaves the marker
          marker1.getElement().addEventListener('mouseout', function() {
          // Remove the popup
          popup.remove();
          });
  
          // Add event listener to the marker for click
          marker1.getElement().addEventListener('click', function() {
          // Open another webpage in the same folder
          window.location.href = 'School1.html'; 
          });      
       
        const marker2 = new maplibregl.Marker()
        .setLngLat([-89.31810542269284, 	43.09598171954781]) 
        .addTo(map);

        // Add event listener to the marker for mouseover
        marker2.getElement().addEventListener('mouseover', function() {
        // Create a popup with the text you want to display
        var popup = new maplibregl.Popup({ offset: 25 })
          .setLngLat(marker2.getLngLat())
          .setHTML('<h3>School Two</h3>')
          .addTo(map);
        });

        // Add event listener to remove the popup when mouse leaves the marker
        marker2.getElement().addEventListener('mouseout', function() {
        // Remove the popup
        popup.remove();
        });

        // Add event listener to the marker for click
        marker2.getElement().addEventListener('click', function() {
        // Open another webpage in the same folder
        window.location.href = 'School2.html'; 
        });

      // Add a new marker 
      const marker3 = new maplibregl.Marker()
        .setLngLat([-89.3122, 	43.1202])
        .addTo(map);

        // Add event listener to the marker for mouseover
        marker3.getElement().addEventListener('mouseover', function() {
          // Create a popup with the text you want to display
          var popup = new maplibregl.Popup({ offset: 25 })
            .setLngLat(marker3.getLngLat())
            .setHTML('<h3>School Three</h3>')
            .addTo(map);
          });
  
          // Add event listener to remove the popup when mouse leaves the marker
          marker3.getElement().addEventListener('mouseout', function() {
          // Remove the popup
          popup.remove();
          });
  
          // Add event listener to the marker for click
          marker3.getElement().addEventListener('click', function() {
          // Open another webpage in the same folder
          window.location.href = 'School3.html'; 
          });




      // Add a click event to each card for switching map styles
      document.querySelector(".map-style.esri-navigation")
        .addEventListener("click", function (event) {
          map.setStyle("esri-navigation")
        });

      document.querySelector(".map-style.esri-imagery")
        .addEventListener("click", function (event) {
          map.setStyle("esri-imagery")
        });
    }

    initializeApp();
