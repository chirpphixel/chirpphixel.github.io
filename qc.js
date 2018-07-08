/**
 * @author Lim Yi Qin <@LegendDemonSlayer#8006> --> Discord Username
 * API for Queso Canyon Calculator. Open-source friendly.
 * Ping me if any issues occur!
 * https://github.com/legenddemonslayer/legenddemonslayer.github.io
 */

//start of declaration of nachores required for next pump level
const pumpreq = [10,25,100,150,300,1000,2000,3000,5000];
//---------------------------------------------------------------

//start of declaration of rate of leaves per hunt
//format ==========[bland to mild ,mild to medium ,medium to hot ,hot to flamin]
const rateofleaves = [2.645,1.869,1.334,0.827];

//rate as of 4th July 2:12am UTC+8. Rate can be found at https://mhhunthelper.agiletravels.com.
//---------------------------------------------------------------

//start of declaration of rate of nachores per hunt
//format ============[bland,mild,medium,hot,flamin']
const rateofnachores = [0.625,2.154,7.414,34.348,84.559];
const quesotypes = ["Bland","Mild","Medium","Hot","Flamin'","Wildfire"];

//rate as of 4th July 2:12am UTC+8. Rate can be found at https://mhhunthelper.agiletravels.com/loot.php?item=680&timefilter=all.
//---------------------------------------------------------------

//start of calculating output api
function globalCalculateOutput(blandinput, blandtomildinput,
	mildleavesinput,mildsbinput,mildquesoinput,totalmildquesoinput, mildtomediuminput,
	mediumleavesinput,mediumsbinput,mediumquesoinput,totalmediumquesoinput, mediumtohotinput,
	hotleavesinput,hotsbinput,hotquesoinput,totalhotquesoinput, hottoflamininput,
	flaminleavesinput,flaminsbinput,flaminquesoinput,totalflaminquesoinput){

	var outputtext ="";
	var nachoreoutput = 0;
	//var requiredbland = 0;

	//figure out the highest type of queso hunter have
	var arr = [blandinput,totalmildquesoinput,totalmediumquesoinput,totalhotquesoinput,totalflaminquesoinput];
	var highestquesolvl = 0;

	if(arr[arr.length - 1] != 0){
		highestquesolvl = arr.length - 1;
	}
	else{
		for(var i = arr.length - 1; i >=0; i--){
			if(arr[i] == 0 && i != 0 && arr[i - 1] != 0){
				highestquesolvl = i - 1;
				break;
			}
		}
	}

	//calc bland queso rate only
	if(highestquesolvl === 0){
		nachoreoutput += blandinput * rateofnachores[0];
	}

	//calc mild queso
	else if(highestquesolvl === 1){
		if(blandtomildinput === 0){
			nachoreoutput += blandinput * rateofnachores[0];
			nachoreoutput += totalmildquesoinput * rateofnachores[1];
		}
		else{
			var outputmildqueso = convertCheeseToHigherTierLeaves(mildleavesinput,blandinput,mildsbinput,0);

			console.log("output is "+outputmildqueso);
			mildquesoinput += outputmildqueso;
			nachoreoutput += mildquesoinput * rateofnachores[1];
		}
	}
	//calc medium queso
	else if(highestquesolvl === 2){
		if(blandtomildinput === 0 && mildtomediuminput === 0){			
			nachoreoutput += blandinput * rateofnachores[0];
			nachoreoutput += totalmildquesoinput * rateofnachores[1];
			nachoreoutput += totalmediumquesoinput * rateofnachores[2];			
		}
		else if(blandtomildinput === 1 && mildtomediuminput === 1){
			var outputmildqueso = convertCheeseToHigherTierLeaves(mildleavesinput,blandinput,mildsbinput,0);
			mildquesoinput += outputmildqueso;

			var outputmediumqueso = convertCheeseToHigherTierLeaves(mediumleavesinput,mildquesoinput,mediumsbinput,1);

			console.log("output is "+outputmediumqueso);
			mediumquesoinput += outputmediumqueso;
			nachoreoutput += mediumquesoinput * rateofnachores[2];
		}		
		else if(blandtomildinput === 0 && mildtomediuminput === 1){	
			nachoreoutput += blandinput * rateofnachores[0];

			var outputmediumqueso = convertCheeseToHigherTierLeaves(mediumleavesinput,mildquesoinput,mediumsbinput,1);

			console.log("output is "+outputmediumqueso);
			mediumquesoinput += outputmediumqueso;
			nachoreoutput += mediumquesoinput * rateofnachores[2];
		}
		else if(blandtomildinput === 1 && mildtomediuminput === 0){	
			//why lol
			var outputmildqueso = convertCheeseToHigherTierLeaves(mildleavesinput,blandinput,mildsbinput,0);
			mildquesoinput += outputmildqueso;

			nachoreoutput += mildquesoinput * rateofnachores[1];

			nachoreoutput += totalmediumquesoinput * rateofnachores[2];	
		}
	}
	else if(highestquesolvl === 3){

		//switch test

		switch (true) {
			case blandtomildinput === 0 && mildtomediuminput === 0 && mediumtohotinput === 0:
			nachoreoutput += blandinput * rateofnachores[0];
			nachoreoutput += totalmildquesoinput * rateofnachores[1];
			nachoreoutput += totalmediumquesoinput * rateofnachores[2];	
			nachoreoutput += totalhotquesoinput * rateofnachores[3];	
			break;

			case blandtomildinput === 1 && mildtomediuminput === 1 && mediumtohotinput === 1:
			var outputmildqueso = convertCheeseToHigherTierLeaves(mildleavesinput,blandinput,mildsbinput,0);
			mildquesoinput += outputmildqueso;

			var outputmediumqueso = convertCheeseToHigherTierLeaves(mediumleavesinput,mildquesoinput,mediumsbinput,1);
			mediumquesoinput += outputmediumqueso;

			var outputhotqueso = convertCheeseToHigherTierLeaves(hotleavesinput,mediumquesoinput,hotsbinput,2);
			hotquesoinput += outputhotqueso;

			nachoreoutput += hotquesoinput * rateofnachores[3];	
			break;

			case blandtomildinput === 0 && mildtomediuminput === 0 && mediumtohotinput === 1:
			nachoreoutput += blandinput * rateofnachores[0];
			nachoreoutput += totalmildquesoinput * rateofnachores[1];

			var outputhotqueso = convertCheeseToHigherTierLeaves(hotleavesinput,mediumquesoinput,hotsbinput,2);
			hotquesoinput += outputhotqueso;	

			nachoreoutput += hotquesoinput * rateofnachores[3];	
			break;

			case blandtomildinput === 0 && mildtomediuminput === 1 && mediumtohotinput === 0:
			nachoreoutput += blandinput * rateofnachores[0];
			
			var outputmediumqueso = convertCheeseToHigherTierLeaves(mediumleavesinput,mildquesoinput,mediumsbinput,1);
			mediumquesoinput += outputmediumqueso;

			nachoreoutput += mediumquesoinput * rateofnachores[2];	

			nachoreoutput += hotquesoinput * rateofnachores[3];	
			break;

			case blandtomildinput === 0 && mildtomediuminput === 1 && mediumtohotinput === 1:
			nachoreoutput += blandinput * rateofnachores[0];
			
			var outputmediumqueso = convertCheeseToHigherTierLeaves(mediumleavesinput,mildquesoinput,mediumsbinput,1);
			mediumquesoinput += outputmediumqueso;

			var outputhotqueso = convertCheeseToHigherTierLeaves(hotleavesinput,mediumquesoinput,hotsbinput,2);
			hotquesoinput += outputhotqueso;

			nachoreoutput += hotquesoinput * rateofnachores[3];	
			break;

			case blandtomildinput === 1 && mildtomediuminput === 0  && mediumtohotinput === 0:
			var outputmildqueso = convertCheeseToHigherTierLeaves(mildleavesinput,blandinput,mildsbinput,0);
			mildquesoinput += outputmildqueso;

			nachoreoutput += mildquesoinput * rateofnachores[1];
			nachoreoutput += totalmediumquesoinput * rateofnachores[2];
			nachoreoutput += totalhotquesoinput * rateofnachores[3];	
			break;

			case blandtomildinput === 1 && mildtomediuminput === 0 && mediumtohotinput === 1:
			var outputmildqueso = convertCheeseToHigherTierLeaves(mildleavesinput,blandinput,mildsbinput,0);
			mildquesoinput += outputmildqueso;

			nachoreoutput += mildquesoinput * rateofnachores[1];

			var outputhotqueso = convertCheeseToHigherTierLeaves(hotleavesinput,mediumquesoinput,hotsbinput,2);
			hotquesoinput += outputhotqueso;

			nachoreoutput += hotquesoinput * rateofnachores[3];	
			break;

			case blandtomildinput === 1 && mildtomediuminput === 1 && mediumtohotinput === 0:
			var outputmildqueso = convertCheeseToHigherTierLeaves(mildleavesinput,blandinput,mildsbinput,0);
			mildquesoinput += outputmildqueso;

			var outputmediumqueso = convertCheeseToHigherTierLeaves(mediumleavesinput,mildquesoinput,mediumsbinput,1);
			mediumquesoinput += outputmediumqueso;

			nachoreoutput += mediumquesoinput * rateofnachores[2];

			nachoreoutput += hotquesoinput * rateofnachores[3];	
			break;

			default:
			outputtext+="Error at line 201";
		}

	}

	console.log(nachoreoutput);
	outputtext += "-> You will get an estimation of "+ nachoreoutput+" nachores.";

	return outputtext;
}

function convertCheeseToHigherTierLeaves(oldleavescount, cheeseused, isSBrecipe, arrlookup){
	var outputquesocount = 0;
	console.log("I ran here");
	console.log(oldleavescount,cheeseused,isSBrecipe,arrlookup);
	oldleavescount += cheeseused * rateofleaves[arrlookup];
	if (isSBrecipe === 0)
		outputquesocount += oldleavescount / 10 * 3;
	else
		outputquesocount += oldleavescount / 10 * 6;
	return outputquesocount;
}