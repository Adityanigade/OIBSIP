function convertTemperature(){

    const temp = document.getElementById("temperature").value.trim();

    const unit = document.getElementById("unit").value;

    const error = document.getElementById("error");

    error.innerHTML="";

    if(temp===""){

        error.innerHTML="Please enter a temperature.";

        return;

    }

    if(isNaN(temp)){

        error.innerHTML="Only numeric values are allowed.";

        return;

    }

    let value = parseFloat(temp);

    let c,f,k;

    if(unit==="C"){

        if(value < -273.15){

            error.innerHTML="Temperature cannot be below Absolute Zero (-273.15°C).";

            return;

        }

        c=value;
        f=(value*9/5)+32;
        k=value+273.15;

    }

    else if(unit==="F"){

        if(value < -459.67){

            error.innerHTML="Temperature cannot be below Absolute Zero (-459.67°F).";

            return;

        }

        c=(value-32)*5/9;
        f=value;
        k=c+273.15;

    }

    else{

        if(value < 0){

            error.innerHTML="Temperature cannot be below Absolute Zero (0 K).";

            return;

        }

        c=value-273.15;
        f=(c*9/5)+32;
        k=value;

    }

    document.getElementById("celsius").innerHTML=
    c.toFixed(2)+" °C";

    document.getElementById("fahrenheit").innerHTML=
    f.toFixed(2)+" °F";

    document.getElementById("kelvin").innerHTML=
    k.toFixed(2)+" K";

}