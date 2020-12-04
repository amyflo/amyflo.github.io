var selectedCategory;
  
window.onload = function () {
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer'
        },
        getSortData: {
            selectedCategory: function( itemElem ) {
            return $( itemElem ).hasClass( selectedCategory ) ? 0 : 1;
            }
        }
    });
    var $items = $('.grid').find('.grid-item');

    $('.sort-button-group').on( 'click', '.button', function() {
    // set selectedCategory
    selectedCategory = $( this ).attr('data-category');
    if ( selectedCategory == 'all' ) {
        $grid.isotope({
        sortBy: 'original-order'
        });
        // restore all items to full opacity
        $items.css({
        opacity: 1
        });
        return;
    }
    // change opacity for selected/unselected items
    var selectedClass = '.' + selectedCategory;
    $items.filter( selectedClass ).css({
        opacity: 1
    });
    $items.not( selectedClass ).css({
        opacity: 0.25
    });

    // update sort data now that selectedCategory has changed
    $grid.isotope('updateSortData');
    $grid.isotope({ sortBy: 'selectedCategory' });
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
    });
    });
}

// List of sentences
var _CONTENT = [
"studies Product Design & Psychology.",
"attends Stanford University (virtually).",
"tells stories through user experience.",
"wrote an essay about Peppa Pig before.", 
"likes ketchup and salsa on her eggs.", 
"taught herself how to code this website.",
"loves planning surprise birthday parties.",
"secretly writes bad poetry late at night.",
"researches social psychology phenomena.",
"believes in the power of open data.",
"prefers tea over coffee greatly.",
"got lost biking to the d.School.",
"puts Sriracha on everything.",
"learned how to bake pies from Youtube.",
"can fold over 100 dumplings in an hour.",
"loves going online shopping for deals.",
"is a huge fan of rap and R&B.",
"takes notes on literally everything.",
"maximizes her use of Post-it notes.",
"ran a social media campaign.",
"raised ~$37k in donations via Instagram.", 
"has never seen snow fall."];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed 
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#changeText");

// Cursor element 
var _CURSOR = document.querySelector("#cursor");


    // Implements typing effect
function Type() { 
	// Get substring with 1 characater added
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX++;

	// If full sentence has been displayed then start to delete the sentence after some time
	if(text === _CONTENT[_PART]) {
		// Hide the cursor
		_CURSOR.style.display = 'none';

		clearInterval(_INTERVAL_VAL);
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Delete, 50);
		}, 1000);
	}
}

// Implements deleting effect
function Delete() {
	// Get substring with 1 characater deleted
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX--;

	// If sentence has been deleted then start to display the next sentence
	if(text === '') {
		clearInterval(_INTERVAL_VAL);

		// If current sentence was last then display the first one, else move to the next
		if(_PART == (_CONTENT.length - 1))
			_PART = 0;
		else
			_PART++;
		
		_PART_INDEX = 0;

		// Start to display the next sentence after some time
		setTimeout(function() {
			_CURSOR.style.display = 'inline-block';
			_INTERVAL_VAL = setInterval(Type, 100);
		}, 200);
	}
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);
    

