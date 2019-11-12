function recursiveGetNode(match, startingTree) {
    // if (startingTree['name'] === match) {
    //     startingTree = null;
    //     return;
    // }
    // const children = startingTree.children;
    // if (!children) return;
    // for (var i = 0; i < children.length; i++) {
    //     const child = children[i];
    //     recursiveGetNode(match, child, startingTree);
    //     return startingTree;
    // }
    const children = startingTree.children;
    if (!children || startingTree.name === match) return;
    for (var i = 0; i < children.length; i++) {
        recursiveHelper(match, children[i], startingTree)
    }
    return startingTree;
}

function recursiveHelper(match, startingTree, parent){
    // console.log("starting tree: ");
    // console.log(startingTree);
    // console.log("parent")
    // console.log(parent);
    // console.log("name: " + startingTree['name'] + ', match: ' + match)
    if (startingTree['name'] === match) { //we are on node we want to delete
        parent.children = parent.children.filter(item => item.name !== startingTree.name);
        // console.log(parent.children);
    } else {
        // console.log("in else, startingTree.children: ");
        // console.log(startingTree.children);
        if (!startingTree.children) return;
        for (var i = 0; i < startingTree.children.length; i++){
            // console.log("child: " + startingTree.children[i])
            recursiveHelper(match, startingTree.children[i], startingTree);
        }
    }
}

export default function removeNode(match, startingTree) {
    const treeCopy = JSON.parse(JSON.stringify(startingTree));
    // console.log("received tree: ")
    // console.log(treeCopy);
    // console.log("treeCopy.children")
    // console.log(treeCopy.children)
    // console.log("treeCopy.children.children)")
    // console.log(treeCopy.children[0].children)
    var newT = recursiveGetNode(match, treeCopy);
    return newT;
}