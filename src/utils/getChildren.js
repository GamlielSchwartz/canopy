

function recursiveGetNode(match, startingTree, self) {
    // console.log(startingTree);
    if (startingTree['name'] === match) {
        return startingTree;
    }
    const children = startingTree.children;
    if (!children) return;
    for (var i = 0; i < children.length; i++) {
        const child = children[i];
        const nextNode = recursiveGetNode(match, child);
        if (nextNode) return nextNode;
    }
}

export default function getNode(match,startingTree, self) {
    const treeCopy = JSON.parse(JSON.stringify(startingTree));
    return recursiveGetNode(match, treeCopy, self);
}