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
	console.log(arr);
	var highestquesolvl = 0;

	if(arr[arr.length - 1] != 0){
		console.log(arr.length - 1);
		highestquesolvl = arr.length - 1;
	}
	else{
		for(var i = arr.length - 1; i >=0; i--){
			if(arr[i] == 0 && i != 0 && arr[i - 1] != 0){
				console.log(i - 1);
				highestquesolvl = i - 1;
				break;
			}
		}
	}

	console.log ("Highest Queso hunter have is "+quesotypes[highestquesolvl]);

	//calc bland queso rate only
	if(highestquesolvl === 0){
		nachoreoutput += blandinput * rateofnachores[0];
	}

	//calc mild queso
	else if (highestquesolvl === 1){
		if(blandtomildinput === 0){
			nachoreoutput += blandinput * rateofnachores[0];
			nachoreoutput += totalmildquesoinput * rateofnachores[1];
		}
		else{
			//recalculate
			mildleavesinput += blandinput * rateofleaves[0];
			if (mildsbinput === 0)
				mildquesoinput += mildleavesinput / 10 * 3;
				//requiredbland +=
			else
				mildquesoinput += mildleavesinput / 10 * 6;

			nachoreoutput += mildquesoinput * rateofnachores[1];
		}
	}
	// //figure out the efficient queso type for pump
	// var bestqueso = efficientquesoforpump[pumplvl-1];
	// outputtext += "-> Your most efficient queso at Pump "+pumplvl+" is "+ bestqueso +" queso\r\n";

	// var inputarray = [blandinput,mildinput,mediuminput,hotinput,flamininput];

	// if(bestqueso ==="mild"){
	// 	nachoreoutput += mildinput * rateofnachores[1];
	// }
	// else if(bestqueso === "medium"){
	// 	if(mildinput != 0){
	// 		//convert remaining mild into medium leaves
	// 		//var mediumleavesoutput += mildinput * rateofleavesobj.medium;

	// 	}
	// }




	console.log(nachoreoutput);
	outputtext += "-> You will get an estimation of "+ nachoreoutput+" nachores.";

	return outputtext;
}