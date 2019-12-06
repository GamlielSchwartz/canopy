
function recursiveGetNode(match, startingTree, newText) {
    const children = startingTree.children;
    if (!children || startingTree.name === match) return;
    for (var i = 0; i < children.length; i++) {
        recursiveHelper(match, children[i], newText);
    }
    return startingTree;
}

function recursiveHelper(match, startingTree, newClassName){
    if (startingTree['name'] === match) { //we are on node we want to delete
        startingTree.gProps.className = newClassName;
    } else {
        if (!startingTree.children) return;
        for (var i = 0; i < startingTree.children.length; i++){
            recursiveHelper(match, startingTree.children[i], newClassName);
        }
    }
}

export default function highlightNode(match, startingTree, newClassName) {
    console.log('newText: ' + newClassName);
    const treeCopy = JSON.parse(JSON.stringify(startingTree));
    if (startingTree.name === match){
        treeCopy.gProps.className = newClassName;
        return treeCopy;
    }
    var newT = recursiveGetNode(match, treeCopy, newClassName);
    return newT;
}