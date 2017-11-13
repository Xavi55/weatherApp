
$(document).ready(function()
{
  var lat="";
  var long="";
  if (navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(function(position) 
    {
      lat+=position.coords.latitude;
      long+=position.coords.longitude;
      //$(".details").html("latitude: " + lat + "<br>longitude: " +long);//test-coordinates
      
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long,function(json)
        {
          //$(".details").html(JSON.stringify(json));
          $(".temp").html(Math.round((json.main.temp*(9/5)+32) *10) / 10+"°F");//default to fahrenheit
          $(".status").html(json.weather[0].main+" today.");///hardest part.......realizes 'weather' IS AN ARRAY, so 'weather[]'.main
          $(".origin").html(json.name+", "+json.sys.country)

        //gif api
        $.getJSON('https://api.giphy.com/v1/gifs/search?q='+json.weather[0].main+'&api_key=1936869e122e403a81f81326f1de0cfa&limit=1',function(data)
        {
          //console.log("success");
          $('html').css('background-image', 'url('+data.data[0].images.original.url+')');
          //image-changer
          
          //$('body').css('background-image', 'url(https://media.giphy.com/media/26BGD4XaoPO3zTz9K/giphy.gif');
        });
        //gif-api
        
       
        
        /*  
         document.getElementById("temp").onmouseover = function() {mouseOver()};
         document.getElementById("temp").onmouseout = function() {mouseOut()};

        function mouseOver() 
        {
          var buff;
          function convert(x)
          {
            return Math.round((buff=x*(9/5)+32) *10) / 10;
          }

          document.getElementById("temp").innerHTML=convert(json.main.temp)+"°F";
        }
        function mouseOut() 
        {
          //Math.round( num * 10) / 10

          document.getElementById("temp").innerHTML=json.main.temp+"°C";
        }
      *///animations mouseover  
        
      //click events:  
           var num=1;   
           $(".temp").on("click", function()
           {
              var buff;
              function convert(x)
              {
                return Math.round((buff=x*(9/5)+32) *10) / 10;  
              }

             if(num==0)
             {
               $(this).html(convert(json.main.temp)+"°F");
               num++;
             }
             else
               {
                  $(this).html(json.main.temp+"°C");
                 num--;
               }
             });

       });//endof getJSON
    });//endof-Geolocal
  }
  else $(".details").html("UNKNOWN ERROR");
////
///
//
  
});//endof DOCU-RDY