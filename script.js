var currage,turnage;

function checkEligibility() {
    var userinput = document.getElementById("DOB").value;
    var dob = new Date(userinput);
    if (userinput == null || userinput == '') 
    {
        document.getElementById("message").innerHTML = "Choose a date please!";
    }
    else {

        //calculate month difference from current date in time
        var month_diff = Date.now() - dob.getTime();

        //convert the calculated difference in date format
        var age_dt = new Date(month_diff);

        //extract year from date    
        var year = age_dt.getUTCFullYear();

        //now calculate the age of the user
        currage = (year - 1970);
        turnage = Math.abs(dob.getUTCFullYear() + 17)

        //display the calculated age
        if (currage < 0) 
        {
            document.getElementById("message").innerHTML = "**Enter valid Birthdate!";
            document.getElementById("result").innerHTML = "";
        }
        else if (currage >= 15) 
        {
            document.getElementById("message").innerHTML = "Not Eligible";
            document.getElementById("result").innerHTML = "Sorry! , but Age 15 or more are not Eligible!";
        }
        else 
        {
            document.getElementById("part2").style.display = "block";
            document.getElementById("message").innerHTML = "Eligible";
            document.getElementById("result").innerHTML = "Your Current Age is " + currage + " years and " + "You will Turn 17 in the year " + turnage + ". ";
        }
    }
}


function createTable(objectArray) {

    // let fields=['year','age','contributions','grants','interest','market']
    // let fieldTitles = [' Year ',' Age ',' Contributions($) ',' Grants($) ',' Interest generated($) ',' Market value at December 31st($) ']

    let fields = ['year', 'age', 'contributions', 'grants','interest','bonus']
    let fieldTitles = [' Year ', ' Age ', ' Contributions($) ', 'Government Grants($) ', ' Interest generated($) ',' Bonus Payment by carrier($)']

    let body = document.getElementById('visualisedata');
    let tbl = document.createElement('table');
    tbl.border = '2';
    let thead = document.createElement('thead');
    let thr = document.createElement('tr');
    fieldTitles.forEach((fieldTitle) => {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(fieldTitle));
        thr.appendChild(th);
    });
    thead.appendChild(thr);
    tbl.appendChild(thead);

    let tbdy = document.createElement('tbody');
    let tr = document.createElement('tr');
    objectArray.forEach((object) => {
        let tr = document.createElement('tr');
        fields.forEach((field) => {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(object[field]));
            tr.appendChild(td);
        });
        tbdy.appendChild(tr);
    });
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
    return tbl;
}



function visualise() {

    document.getElementById('visualisedata').innerHTML=""
    var savings = parseInt(document.getElementById("savings").value);

    let bonusrate=0;

    if(currage>=0 && currage<=4)
    {bonusrate=0.15;
    }
    else if(currage===5)
    {
        bonusrate = 0.135;
    }
    else if(currage===6)
    {
        bonusrate = 0.12;
    }
    else if(currage===7)
    {
        bonusrate = 0.105;
    }
    else if(currage===8)
    {
        bonusrate = 0.90;
    }
    else if(currage===9)
    {
        bonusrate = 0.75;
    }
    else if(currage===10)
    {
        bonusrate = 0.60;
    }
    else if(currage===11)
    {
        bonusrate = 0.45;
    }
    else if(currage===12)
    {
        bonusrate = 0.30;
    }
    else if(currage===13)
    {
        bonusrate = 0.015;
    }
    else if(currage===14)
    {
        bonusrate = 0.01;
    }


    var data=[];
    let i=0;
    let j = new Date().getFullYear();
    let k = currage;
    let temp=0;

    let totalcontribution=0;
    let totalgrants=0;
    let totalinterest=0;

    while(j<=turnage)
    {
        data[i]={};
        data[i].year=j;
        data[i].age = k;

        if(i===0){
            data[i].contributions = savings * (12 - new Date().getMonth());
            totalcontribution = totalcontribution + data[i].contributions;
        }
        else
        {
            data[i].contributions = savings*12;
            totalcontribution = totalcontribution + data[i].contributions;
        }

        if(k===16 || k===17)
        {
            data[i].grants=0;
            totalgrants = totalgrants + data[i].grants;
        }
        else
        {
            data[i].grants = 0.2 * data[i].contributions;
            totalgrants = totalgrants + data[i].grants;
        }

        temp = temp + data[i].contributions + data[i].grants;
        data[i].interest = Math.round(0.05 * (temp));
        totalinterest = totalinterest + data[i].interest;
        temp = temp + data[i].interest

        if(k===17)
        {
            data[i].bonus = Math.round((totalcontribution + totalgrants + totalinterest)*bonusrate);
        }
        else
        {
            data[i].bonus = 0;
        }
        
        i++;
        j++;
        k++;

    }

    data[i]={};
    data[i].year="Totals";
    data[i].age=data[i-1].age;
    data[i].contributions=totalcontribution;
    data[i].grants=totalgrants;
    data[i].interest=totalinterest;
    data[i].bonus=data[i-1].bonus;

    let finalsaved = data[i].contributions + data[i].grants + data[i].interest + data[i].bonus;

    createTable(data);

    document.getElementById("summary").innerHTML = `<h3>Congratulations, in ${turnage}, you will have saved ${"$"+finalsaved} for your beneficiary.</h3>`

}