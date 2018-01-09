//test commit
// BE CAREFUL HERE WITH THE RESULT SET!!!!!!!!!
var traverseDomAndCollectElements = function(matchFunc, startEl=document.body,resultSet=[]) {
  
  var childrenZ = startEl.children;
 
 
  if(matchFunc(startEl)) resultSet.push(startEl)
 
  if(childrenZ.length){
    for(var child of childrenZ){
      if(child.children.length){
        traverseDomAndCollectElements(matchFunc,child,resultSet)
      }else{
        console.log(child)
        console.log(matchFunc(child))
        if(matchFunc(child)) resultSet.push(child)
        console.log(resultSet)
      }
    }
    
  } 



  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements
  
  // YOUR CODE HERE

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {
  // your code here
  let type;

  if(selector[0]==='#') type= 'id'
  else if(selector[0]==='.') type= 'class'
  else if(selector.split('.').length==2) type= 'tag.class'
  else type='tag'
  // console.log(selector,'-',type)
  return type
}

// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.
function classNameIterator(selector,classNames,tagName=null){
  for(className of classNames){
    className= '.'+className.toLowerCase()
    if(tagName) className= tagName.toLowerCase()+className //period is already added
    
    // if(selector==='.photo') console.log(selector, className, selector===className)
    if(selector.toLowerCase()===className){
      return true
    }
  }
  return false 
}

var matchFunctionMaker = function(selector) {
    var selectorType = selectorTypeMatcher(selector);
    var matchFunction;
    if (selectorType === "id") {
      matchFunction = function (el) {
        return el.id && ('#'+el.id.toLowerCase() === selector.toLowerCase())
      }

    } else if (selectorType === "class") {
      matchFunction = function (el) {
        let classNames=el.className.split(' ')
        // console.log(classNames)
        return el.className && (classNameIterator(selector,classNames))
      }


    } else if (selectorType === "tag.class") {
      matchFunction = function (el) {
        let classNames=el.className.split(' ')
        // console.log(el.tagName, el.className, selector)
        return el.tagName && el.className&&(classNameIterator(selector,classNames,el.tagName))
      }

    } else if (selectorType === "tag") {
      matchFunction = function (el) {
        return el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase())
      }

    }
    return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
