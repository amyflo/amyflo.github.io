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


var text = 
["studies Product Design and Psychology at Stanford.",
"loves telling stories through user experience.",
"wrote an essay about Peppa Pig before.", 
"likes ketchup and salsa on her eggs.", 
"taught herself how to code this website.",
"loves planning surprise birthday parties.",
"writes bad poetry in the Notes app too much.",
"researches social psychology from across the world.",
"believes in the power of open data.",
"prefers tea over coffee.",
"once got lost on her way biking to the d.School.",
"puts Sriracha on everything (sometimes too much).",
"learned how to bake pies from Youtube.",
"can fold over 100 dumplings in an hour.",
"loves going online shopping for deals.",
"is a huge fan of rap and R&B.",
"takes notes on literally everything.",
"maximizes her use of Post-it notes.",
"ran a social media campaign.",
"raised ~$37k in donations through Instagram.", 
"has never seen snow fall."];
var counter = 0;
var elem = document.getElementById("changeText");
var inst = setInterval(change, 3000);

function change() {
  elem.innerHTML = text[counter];
  counter++;
  if (counter >= text.length) {
    counter = 0;
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
  }
}