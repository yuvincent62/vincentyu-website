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
        zoom: 16, // initial zoom level
        style: "esri-navigation",
        hash: true,
        transformRequest,
      });

      // Add navigation controls
      map.addControl(new maplibregl.NavigationControl(), "bottom-right");



      // Configure a new popup
      const popup = new maplibregl.Popup({ offset: 35 }).setHTML(
        `<h3>ThermaStor</h3>
        <p>4201 Lien Road, Madison, WI 53704</p>
        <img src="img/Thermastor.jpg" width="200" />
        `
      );
      // Add a new marker and popup
      const marker = new maplibregl.Marker()
        .setLngLat([-89.31111, 	43.11958])
        .setPopup(popup)
        .addTo(map);

      // Configure a new popup
      const popup1 = new maplibregl.Popup({ offset: 35 }).setHTML(
        `<h3>Kennedy Elementary School</h3>
        <p>221 Meadowlark Dr, Madison, WI 53714</p>
        <img src="img/Kennedy.jpg" width="200" />
        `
      );
      // Add a new marker and popup
      const marker1 = new maplibregl.Marker()
        .setLngLat([-89.29810542269284, 	43.09598171954781])
        .setPopup(popup1)
        .addTo(map);

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
