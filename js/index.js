var w=document.getElementsByClassName("greeting");
var x=document.getElementsByClassName("temp");
var y=document.getElementsByClassName("origin");
var z=document.getElementsByClassName("status");

var cel;
var d=new Date();
if(d.getHours()>=12)
	w[0].innerHTML="Good afternoon, it is now:";
else
	w[0].innerHTML="Good morning, it is now:";

getLocation();

var getJSON = function(url, callback)
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
		  var status = xhr.status;
		  if (status === 200) {
		    callback(null, xhr.response);
		  } else {
		    callback(status, xhr.response);
		  }
		};
		xhr.send();
	};

function getLocation()
{
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(a)
		{
			var lat=a.coords.latitude
			var long=a.coords.longitude;

			getJSON('https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&lon='+long, 					function(err, data)
			{
				  if (err !== null)
				  	alert('Something went wrong: ' + err);

				  else
				  {
				  	cel=data.main.temp;
				  	x[0].innerHTML=(Math.round((cel*(9/5)+32)*10)/10+" &deg;F");
				  	y[0].innerHTML=data.name+', '+data.sys.country;
					z[0].innerHTML=data.weather[0].main;
					//x[0]??? temp class is unique?

					getJSON('https://api.giphy.com/v1/gifs/search?q='+data.weather[0].main+'&api_key=1936869e122e403a81f81326f1de0cfa&limit=1',function(err,json)
					{
					document.getElementById("html").style.backgroundImage="url('"+json.data[0].images.original.url+"')"
						//change the background
					});

				  }

			});
		});

	}
	else
		x[0].innerHTML="ERROR";
}
var num=0;
function convert()
{
	if(num==0)
	{
		x[0].innerHTML=cel+" &deg;C";
		num=1
	}
	else
	{
		x[0].innerHTML=(Math.round((cel*(9/5)+32)*10)/10+" &deg;F");
		num=0;
	}

}
