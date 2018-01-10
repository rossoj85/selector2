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
        // console.log(child)
        // console.log(matchFunc(child))
        if(matchFunc(child)) resultSet.push(child)
        // console.log(resultSet)
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
  if(selector[0]==='#') return'id'
    else if(selector[0]==='.') return'class'
    else if(selector.split('.').length==2) return'tag.class'
    else if(selector.split(' > ').length===2) return 'pTag>cTag'
    else if(selector.split(' ').length===2) return 'tag desTag'

    else return 'tag'
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

    }else if(selectorType=== 'pTag>cTag'){
        matchFunction=function(el){
          console.log(`SELECTOR ${selector}`)
          console.log(`parentTag ${el.parentNode.tagName} descTag ${el.tagName}`)
          console.log(`${el.parentNode.tagName.toLowerCase()} > ${el.tagName.toLowerCase()}`)
          
          return el.parentNode.tagName&& el.tagName &&
          (`${el.parentNode.tagName.toLowerCase()} > ${el.tagName.toLowerCase()}`===selector.toLowerCase())
        }
      }else if(selectorType==='tag desTag'){
         matchFunction=function(el){
           let parentNode= el.parentNode
           let selectorArr= selector.split(' ')
          
           var elMatch = el.tagName && el.tagName.toLowerCase()===selectorArr[1]
           
           while(parentNode&&elMatch){
            var parentMatch =parentNode.tagName && parentNode.tagName.toLowerCase()===selectorArr[0]

            console.log(parentNode.tagName, el.tagName)
            
             if(parentMatch&&parentNode.contains(el)){
               return true
               
             }else parentNode=parentNode.parentNode
             
           }

          // var bool =  el.parentNode.tagName&&el.tagName 
          // // && (`${el.parentNode.tagName.toLowerCase()} ${el.tagName.toLowerCase()}`===selector.toLowerCase())
          // &&parentNode.contains(el)

          // console.log(bool)
          // return bool
         }

       

        // return el.tagName&&(el.tagName.to)
      }else if (selectorType === "tag") {
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



  
