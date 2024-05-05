//        const key = 'YOUR_MAPTILER_API_KEY_HERE';
        const map = new maplibregl.Map({
            container: 'map',
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=mYUHicVKQ6OkT3ldd3Mz`,
            center: [-89.4012, 43.0731],
            zoom: 11
        })

        //add school markers
        var marker1 = new maplibregl.Marker()
            .setLngLat([-89.4012, 43.0731]) 
            .addTo(map);
    
        var popup1 = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false
        });
    
        marker1.getElement().addEventListener('mouseenter', function() {
            popup1.setLngLat(marker1.getLngLat())
                .setHTML('<h3>School 1</h3>') 
                .addTo(map);
        });
    
        marker1.getElement().addEventListener('mouseleave', function() {
            popup1.remove();
        }); 

        marker1.getElement().addEventListener('click', function() {
            // Open another webpage in the same folder
            window.location.href = 'school1/School1.html'; 
            });

        var marker2 = new maplibregl.Marker()
        .setLngLat([-89.31810542269284, 43.09598171954781]) 
        .addTo(map);

        var popup2 = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        marker2.getElement().addEventListener('mouseenter', function() {
            popup2.setLngLat(marker2.getLngLat())
                .setHTML('<h3>School 2</h3>') // Replace with your hover text
                .addTo(map);
        });

        marker2.getElement().addEventListener('mouseleave', function() {
            popup2.remove();
        });

        marker2.getElement().addEventListener('click', function() {
        // Open another webpage in the same folder
        window.location.href = 'school2/School2.html'; 
         });

        var marker3 = new maplibregl.Marker()
        .setLngLat([-89.3122, 	43.1202]) 
        .addTo(map);

    var popup3 = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    marker3.getElement().addEventListener('mouseenter', function() {
        popup3.setLngLat(marker3.getLngLat())
            .setHTML('<h3>School 3</h3>') // Replace with your hover text
            .addTo(map);
    });

    marker3.getElement().addEventListener('mouseleave', function() {
        popup3.remove();
    });

    marker3.getElement().addEventListener('click', function() {
        // Open another webpage in the same folder
        window.location.href = 'school3/School3.html'; 
        });   

 
        map.on('error', function(err) {
  
            throw new Error("To load the map, you must replace YOUR_MAPTILER_API_KEY_HERE first, see README");
        });
