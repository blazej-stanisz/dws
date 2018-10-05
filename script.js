$(function() {
	
	$( "#datepicker" ).datepicker({
		onSelect: function(date) {
			setDaysWeeksCount(date);
        },
	});
	
	// set base date
	var beginDateString = '07/27/2017'; // = getCurrentDateForDatepicker();
	$("#datepicker").attr('placeholder', beginDateString).attr('value', beginDateString);
	
	setDaysWeeksCount(beginDateString);
});

function setDaysWeeksCount(beginDateString) {
	var daysCount = getDaysCount(beginDateString);
	var weeksCount = getWeeksCount(daysCount);
	
	if(daysCount != null) {
		$("#daysCounter").text(daysCount);
		$("#weeksCounter").text(weeksCount.weeks);
		$("#weekDaysCounter").text(weeksCount.days);
		
		var $weeksDaysPanel = $("#weeksDaysPanel");
		if(weeksCount.days == 0) {
			$weeksDaysPanel.hide();
		} else {
			$weeksDaysPanel.show();
		}
		
		cufonRefresh();
	}
}

function getDaysCount(beginDateString) {
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var firstDate = new Date();
	var secondDate = $.datepicker.parseDate('mm/dd/yy', beginDateString);
	
	if(secondDate > firstDate) {
		alert('The date cannot be in future');
		return null;
	}
	
	return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

function cufonRefresh (){
	Cufon.set('fontSize', '16px').replace('#selectDatePanel, #footer'); 
	Cufon.set('fontSize', '30px').replace('#weekDaysCounterPanel');
	Cufon.set('fontSize', '50px').replace('#header');
	Cufon.set('fontSize', '200px').replace('#daysCounter');
	Cufon.set('fontSize', '50px').replace('#daysName');
}

function getCurrentDateForDatepicker() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0' + dd
	} 

	if(mm<10) {
		mm = '0' + mm
	} 

	today = mm + '/' + dd + '/' + yyyy;
	
	return today;
}

function getWeeksCount(days)
{
    return {
        weeks: Math.floor(days/7),
        days: days % 7
    };
}

