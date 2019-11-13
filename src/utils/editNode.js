
function recursiveGetNode(match, startingTree, newText) {
    const children = startingTree.children;
    if (!children || startingTree.name === match) return;
    for (var i = 0; i < children.length; i++) {
        recursiveHelper(match, children[i], newText);
    }
    return startingTree;
}

function recursiveHelper(match, startingTree, newText){
    if (startingTree['name'] === match) { //we are on node we want to delete
        startingTree['name'] = newText;
    } else {
        if (!startingTree.children) return;
        for (var i = 0; i < startingTree.children.length; i++){
            recursiveHelper(match, startingTree.children[i], newText);
        }
    }
}

export default function editNode(match, startingTree, newText) {
    console.log('newText: ' + newText);
    const treeCopy = JSON.parse(JSON.stringify(startingTree));
    if (startingTree.name === match){
        treeCopy.name = newText;
        return treeCopy;
    }
    var newT = recursiveGetNode(match, treeCopy, newText);
    return newT;
}