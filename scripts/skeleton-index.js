//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeletonIndex(){
    console.log($('#navbar').load('../text/nav-index.html'));
    console.log($('#footer').load('../text/footer.html'));
}
loadSkeletonIndex();  //invoke the function