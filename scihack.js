function reader() {
    var propSet = [];
    $(".container div").each(function() {
        classes = $(this).attr("class");
        propSet.push(classes)
    });
    return propSet;
}

alert(reader());


